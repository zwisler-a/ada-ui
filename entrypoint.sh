#!/bin/sh
echo "Using $CORE_URL";
echo "Using $AUTH_URL";
echo "{\"CORE_URL\": \"${CORE_URL}\", \"AUTH_URL\": \"${AUTH_URL}\"}" > /usr/share/nginx/html/config.json;

exec "$@"
