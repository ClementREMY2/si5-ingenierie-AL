# Utiliser l'image de Node.js
FROM node:16-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers de l'API Gateway dans le conteneur
COPY . .

# Exposer le port utilisé par l'API Gateway (8080 par défaut)
EXPOSE 8080

# Démarrer l'API Gateway
CMD ["node", "server.js"]
