La gateway contient (dans l'ordre de la pipeline) :
- Un broker MQTT en entrée
- Un event processor qui prend les données sur "raw-data" et les filtre "filtered-data"
- Un event processor qui prend les données sur "filtered-data" et fais le système d'alerte
- Un event processor qui prend les données sur "filtered-data" et les mets dans Prometheurs
??? - Un event processor pour le temps réel