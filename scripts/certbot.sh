#!/bin/bash

certbot run -n --apache --agree-tos -d www.sgpo.online -m danieldelimamazali@hotmail.com --redirect

while true; do sleep 1000; done

