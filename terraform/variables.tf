variable "project" { }

variable "region" {
  default = "us-central1"
}

variable "zone" {
    default = "us-central1-a"
}

variable "APP_PORT" { default="80" }

variable "mysql_auth_startup_script" { }

variable "mysql_data_startup_script" { }

variable "auth_image" { }
variable "data_image" { }
variable "api_gateway_image" { }
variable "frontend_image" { }