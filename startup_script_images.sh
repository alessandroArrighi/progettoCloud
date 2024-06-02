PROJECT_ID=lptsi-progetto-arrighi

# Creazione del bucket per gli script dei db
gcloud storage buckets create gs://progetto_mysql_scripts/ --uniform-bucket-level-access --project=$PROJECT_ID

gcloud storage cp ./startup_script_mysql_auth.sh gs://progetto_mysql_scripts
gcloud storage cp ./startup_script_mysql_data.sh gs://progetto_mysql_scripts

# Creazione dell'artifact registry per le immagini docker
gcloud artifacts repositories create progetto --repository-format=docker --location=us-central1 --description="" --project=$PROJECT_ID

# Creazione delle immagini

REPO_URI=us-central1-docker.pkg.dev/${PROJECT_ID}/progetto/
PROJECT_PATH=$(pwd)

cd ${PROJECT_PATH}/auth
docker build -t $REPO_URI'auth' .
docker push $REPO_URI'auth'

cd ${PROJECT_PATH}/data
docker build -t $REPO_URI'data' .
docker push $REPO_URI'data'

cd ${PROJECT_PATH}/api-gateway
docker build -t $REPO_URI'api-gateway' .
docker push $REPO_URI'api-gateway'

cd ${PROJECT_PATH}/frontservice
docker build -t $REPO_URI'frontend' .
docker push $REPO_URI'frontend'

echo $REPO_URI'auth'
echo $REPO_URI'data'
echo $REPO_URI'api-gateway'
echo $REPO_URI'frontend'