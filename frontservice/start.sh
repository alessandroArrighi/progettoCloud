#!/bin/sh

cd /opt/app/frontend
npm i
npm run build
mv /opt/app/frontend/dist /opt/app/
cd /opt/app