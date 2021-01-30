#!/bin/sh
ssh ubuntu@15.207.18.233 <<EOF
 cd ~/node-app
 git pull
 npm install — production
 pm2 restart all
 exit
EOF