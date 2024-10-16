# Backend API Microservices with Gateway

This project consists of several microservices that handle various functionalities (devices, feedbacks, healthchecks, notifications, users). These services are managed using Docker and exposed via an API Gateway.

## Features

- **API Gateway**: Exposes all services through a single entry point on port `8080`, enabling seamless routing between different microservices.
- **Microservices**: Each service is containerized using Docker and handles a specific domain of the application.
- **API Gateway**: The gateway routes requests based on the URL path to the appropriate microservice.

### Services

- **Devices Service**: Manages device-related data.
- **Feedbacks Service**: Handles feedback submissions.
- **Healthchecks Service**: Monitors service health.
- **Notifications Service**: Manages notifications to users.
- **Users Service**: Handles user information and authentication.

## API Gateway

The API Gateway listens on port `8080` and routes requests based on the path. For example:

- `http://localhost:8080/devices` -> Devices service
- `http://localhost:8080/feedbacks` -> Feedbacks service
- `http://localhost:8080/healthchecks` -> Healthchecks service
- `http://localhost:8080/notifications` -> Notifications service
- `http://localhost:8080/users` -> Users service

## Requirements

- **Node.js**
- **Yarn or npm**
- **Docker** and **Docker Compose**

## Configuration

Avant de démarrer le projet, assurez-vous de configurer le fichier `.env`.

1. Copiez le fichier `.env.example` et renommez-le en `.env` :

   ```sh
   cp .env.example .env

   ```

2. Modifiez le fichier .env avec vos propres valeurs.

3. Sauvegardez le fichier .env

## Installation

<pre lang="md">npm install 
yarn install
</pre>

<pre lang="md">npm run start 
yarn start
</pre>
