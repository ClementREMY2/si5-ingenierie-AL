# SI5 - Ingénierie des Architectures Logicielles

### Solution d'e-santé pour ques les personnes âgées puissent rester à la maison

Membres : 
  - Clément REMY
  - Fabien AIRAUD
  - Arnaud AVOCAT GROS
  - Alexis MALOSSE
  - Samuel BOIS

# Comment utiliser le projet

## Brokers

Pour lancer les brokers se trouvant dans le cloud, aller dans le dossier `cloud/brokers` et lancer la commande `docker-compose up -d`.

## Gateway

Pour lancer la gateway, aller dans le dossier `iot/gateway` et utiliser la commande `docker-compose up --build -d` pour construire les images et lancer le container.

## Capteurs

Pour lancer les capteurs, aller dans le dossier `iot/sensors` et utiliser la commande `docker-compose up --build -d` pour construire les images et lancer les containers.
Ce sont des capteurs simulés, ils envoient des données aléatoires à la gateway sur le protocole HTTP.