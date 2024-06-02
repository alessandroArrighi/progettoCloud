project = "lptsi-progetto-arrighi"

mysql_auth_startup_script = "gs://progetto_mysql_scripts/startup_script_mysql_auth.sh"
mysql_data_startup_script = "gs://progetto_mysql_scripts/startup_script_mysql_data.sh"

auth_image = "us-central1-docker.pkg.dev/lptsi-progetto-arrighi/progetto/auth"
data_image = "us-central1-docker.pkg.dev/lptsi-progetto-arrighi/progetto/data"
api_gateway_image = "us-central1-docker.pkg.dev/lptsi-progetto-arrighi/progetto/api-gateway"
frontend_image = "us-central1-docker.pkg.dev/lptsi-progetto-arrighi/progetto/frontend"