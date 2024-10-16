# Dockerfile commun pour les services Node.js/Express
FROM node:16-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json à la racine pour les workspaces
COPY package*.json ./

# Copier tous les fichiers de services pour permettre l'installation des dépendances
COPY ./services ./services

# Installer les dépendances à la racine (y compris celles des workspaces)
RUN npm install

# Définir un argument pour le nom du service
ARG SERVICE_NAME

# Définir le répertoire de travail pour le service spécifique
WORKDIR /usr/src/app/services/${SERVICE_NAME}

# Copier le code spécifique au service après l'installation des dépendances
COPY ./services/${SERVICE_NAME}/ .

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Démarrer le serveur
CMD ["npm", "start"]
