#!/bin/bash

API="http://localhost:4741"
URL_PATH="/teams"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
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
