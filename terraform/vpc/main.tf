resource "google_compute_network" "vpc_network" {
  name = "app-server-vpc-network"
  auto_create_subnetworks = true
}

resource "google_compute_firewall" "rules" {
  name        = "appserver-firewall-rule"
  network     = google_compute_network.vpc_network.name
  description = "Creates firewall rule targeting tagged instances"

  allow {
    protocol = "tcp"
    ports    = ["80", "443","22"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["web","allow-health-check"]
}

resource "google_compute_firewall" "internaltraffic" {
  name = "allow-internal-traffic"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
  }

  allow {
    protocol = "udp"
  }

  allow {
    protocol = "icmp"
  }

  source_ranges = ["10.128.0.0/9"]
}

resource "google_compute_global_address" "private-ip-block" {
  name         = "private-ip-block"
  purpose      = "VPC_PEERING"
  address_type = "INTERNAL"
  ip_version   = "IPV4"
  prefix_length = 20
  network       = google_compute_network.vpc_network.self_link
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.vpc_network.self_link
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private-ip-block.name]
}