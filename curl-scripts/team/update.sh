#!/bin/bash

API="http://localhost:4741"
URL_PATH="/teams/:id"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "team": {
      "state": "'"${STATE}"'",
      "city": "'"${CITY}"'",
      "name": "'"${NAME}"'",
      "stadium": "'"${STADIUM}"'",
      "sport": "'"${SPORT}"'"
    }
  }'
echo
