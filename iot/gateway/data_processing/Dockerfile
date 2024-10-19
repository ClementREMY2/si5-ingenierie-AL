# Use a base Python image
FROM python:3.9-slim

# Install build tools
RUN apt-get update && apt-get install -y gcc

# Set the working directory
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY main.py .
COPY processors/ processors/
COPY receivers/ receivers/

# Set the entry point to run the script
ENTRYPOINT ["python", "main.py"]