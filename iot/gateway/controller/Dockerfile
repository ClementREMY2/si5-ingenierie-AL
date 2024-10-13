# Use a base Python image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY main.py .
COPY controller/ controller/
COPY data/ data/
COPY receivers/ receivers/

# Set the entry point to run the script
ENTRYPOINT ["python", "main.py"]