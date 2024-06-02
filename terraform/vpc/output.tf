output "vpc_name" {
    value = google_compute_network.vpc_network.name
}

output "vpc_id" {
    value = google_compute_network.vpc_network.id
}

output "vpc_link" {
    value = google_compute_network.vpc_network.self_link
}

output "vpc_con" {
    value = google_service_networking_connection.private_vpc_connection
}