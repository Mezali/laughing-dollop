#!bin/bash

certbot run -n --apache --agree-tos -d certbot.brazilsouth.cloudapp.azure.com -m  danieldelimamazali@hotmail.com  --redirect

while true; do sleep 1000; done