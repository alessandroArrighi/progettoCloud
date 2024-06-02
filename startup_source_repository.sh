# Creazione del source repository

REPO_NAME=source-progetto

gcloud source repos create $REPO_NAME --project=lptsi-progetto-arrighi

git config --global credential.https://source.developers.google.com.helper gcloud.sh
git remote add google https://source.developers.google.com/p/lptsi-progetto-arrighi/r/$REPO_NAME
git push --all google