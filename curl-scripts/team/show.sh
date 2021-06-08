#!/bin/sh
# curl --include 'http://localhost:4741/team'
API="http://localhost:4741"
URL_PATH="/teams"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
