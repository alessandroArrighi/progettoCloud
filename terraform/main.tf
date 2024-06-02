module "vpc" {
  source = "./vpc"

  project = var.project
  region = var.region
  zone = var.zone
}

module "db_auth" {
  source = "./vm"

  project = var.project
  region = var.region
  zone = var.zone

  vm_name = "db-auth"
  vpc_name = module.vpc.vpc_name
  startupscripturl = var.mysql_auth_startup_script
}

module "db_data" {
  source = "./vm"

  project = var.project
  region = var.region
  zone = var.zone

  vm_name = "db-data"
  vpc_name = module.vpc.vpc_name
  startupscripturl = var.mysql_data_startup_script
}

module "auth_service" {
  source = "./service"

  project = var.project
  region = var.region
  zone = var.zone  

  name = "auth-service"

  container_image = var.auth_image

  environment = {
    DB_URL = module.db_auth.private_ip_address
    FRONT_URL = module.frontend.service_uri
  }

  vpc_name = module.vpc.vpc_name
  vpc_access_connector = google_vpc_access_connector.connector.self_link
}

module "data_service" {
  source = "./service"

  project = var.project
  region = var.region
  zone = var.zone  

  name = "data-service"

  container_image = var.data_image

  environment = {
    DB_URL = module.db_data.private_ip_address
    FRONT_URL = module.frontend.service_uri
  }

  vpc_name = module.vpc.vpc_name
  vpc_access_connector = google_vpc_access_connector.connector.self_link
}

module "frontend" {
  source = "./service"

  project = var.project
  region = var.region
  zone = var.zone

  name = "frontend"

  container_image = var.frontend_image

  # environment = {
  #   GWT_URL = module.api_gateway.service_uri
  # }

  vpc_name = module.vpc.vpc_name
  vpc_access_connector = google_vpc_access_connector.connector.self_link
  ingress_traffic = "INGRESS_TRAFFIC_ALL"
}

module "api_gateway" {
  source = "./service"

  project = var.project
  region = var.region
  zone = var.zone

  name = "api-gateway"

  container_image = var.api_gateway_image

  environment = {
    AUTH_API = module.auth_service.service_uri
    DATA_API = module.data_service.service_uri
  }

  vpc_name = module.vpc.vpc_name
  vpc_access_connector = google_vpc_access_connector.connector.self_link
  ingress_traffic = "INGRESS_TRAFFIC_ALL"
}

resource "google_vpc_access_connector" "connector" {
  name          = "vpc-con"
  ip_cidr_range = "10.8.0.0/28"
  network       = module.vpc.vpc_name
}
