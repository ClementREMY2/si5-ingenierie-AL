# Utiliser une image de base Python
FROM python:3.9-slim

# Définir le répertoire de travail
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY simulator.py .

# Définir le point d'entrée pour exécuter le script
ENTRYPOINT ["python", "simulator.py"]