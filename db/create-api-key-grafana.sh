#!/bin/bash

ADMIN_API_KEY="admin"
GRAFANA_URL="http://localhost:3000"

# Clé api pour le dashbaord
curl -X POST "${GRAFANA_URL}/api/auth/keys" \
     -H "Authorization: Bearer ${ADMIN_API_KEY}" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "my_service_account_key",
       "role": "Editor"  # Peut être Editor ou Viewer
     }'
