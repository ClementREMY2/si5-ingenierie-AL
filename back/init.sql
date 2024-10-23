-- Creating roles
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Creating users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    role_id INTEGER REFERENCES role(id),
    phone VARCHAR(15) NOT NULL
);

-- Creating doctors (specific)
CREATE TABLE doctors (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    specialty VARCHAR(100)
);

-- Creating nurses (specific)
CREATE TABLE nurses (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    specialty VARCHAR(100)
);

-- Creating patients
CREATE TABLE patients (
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
    doctor_id INTEGER REFERENCES doctors(user_id),
    medical_record TEXT
);

-- Many-to-Many relationship between nurses and patients
CREATE TABLE nurses_patients (
    nurse_id INTEGER REFERENCES nurses(user_id),
    patient_id INTEGER REFERENCES patients(user_id),
    PRIMARY KEY (nurse_id, patient_id)
);

-- Creating relatives
CREATE TABLE relatives (
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    contact VARCHAR(100)
);

-- Many-to-Many relationship between relatives and patients
CREATE TABLE relatives_patients (
    relative_id INTEGER REFERENCES relatives(user_id),
    patient_id INTEGER REFERENCES patients(user_id),
    PRIMARY KEY (relative_id, patient_id)
);

-- Creating medical reports
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(user_id),
    global_observation TEXT
);

-- Creating device_models (gateway V1, heart rate sensor, etc.)
CREATE TABLE device_models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    brand VARCHAR(100),
    type VARCHAR(100)
);

-- Creating devices unit (one row per device, X gateways + Y sensors = X+Y rows)
CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    model_id INTEGER REFERENCES device_models(id)
);

-- Creating gateways devices
CREATE TABLE gateway_devices (
    device_id INTEGER REFERENCES devices(id) PRIMARY KEY,
    realtime_enabled BOOLEAN DEFAULT FALSE
);

-- Many-to-Many relationship between reports and devices
CREATE TABLE reports_devices (
    report_id INTEGER REFERENCES reports(id),
    device_id INTEGER REFERENCES devices(id),
    observation TEXT,
    PRIMARY KEY (report_id, device_id)
);
-- Many-to-Many relationship between patients and equipment
CREATE TABLE patients_device (
    patient_id INTEGER REFERENCES patients(user_id),
    device_id INTEGER UNIQUE REFERENCES devices(id),
    PRIMARY KEY (patient_id, device_id),
    start_date DATE,
    end_date DATE DEFAULT NULL
);

-- Creating notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating notification preferences
CREATE TABLE notification_preferences (
    user_id INTEGER REFERENCES users(id),
    notifications_enabled BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (user_id)
);

-- Creating feedbacks
CREATE TABLE feedbacks (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(user_id),
    feedback_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    global_observation TEXT
);

-- Many-to-Many relationship between feedbacks and devices
CREATE TABLE feedbacks_devices (
    feedback_id INTEGER REFERENCES feedbacks(id),
    device_id INTEGER REFERENCES devices(id),
    observation TEXT,
    PRIMARY KEY (feedback_id, device_id)
);

-- Inserting initial data for roles
INSERT INTO role (name) VALUES ('Admin'), ('Doctor'), ('Nurse'), ('Patient');

-- Inserting test data for users
-- PASSWORDS :
-- john : password1
-- jane : password2
-- paul : password3
INSERT INTO users (email, password, last_name, first_name, role_id, phone) 
VALUES ('john.smith@example.com', '$2b$10$mkrzekg7GWayR6EBZYw0.uAIaD72LkH484cMkAZ43QjO4doXCpWbi', 'Smith', 'John', 2, '+33653784926'),
       ('jane.doe@example.com', '$2b$10$z6qOQz7Qyw.A./pzyOfpfuvawECtQ0nTt1THvFZoO5mGOU3Pqb4pC', 'Doe', 'Jane', 3, '+33653734926'),
       ('paul.brown@example.com', '$2b$10$z6rh9W23toLnCIIp4uPrzewJVvW4ZDL9TTd6GJsY4ptCb7VmPnkSi', 'Brown', 'Paul', 4, '+33753784926');

-- Inserting test data for doctors
INSERT INTO doctors (user_id, specialty) 
VALUES (1, 'Cardiology');

-- Inserting test data for patients
INSERT INTO patients (user_id, doctor_id, medical_record) 
VALUES (3, 1, 'Complete medical record');

-- Inserting test data for nurses
INSERT INTO nurses (user_id, specialty) 
VALUES (2, 'Cardiology (nurse)');

-- Devices models
INSERT INTO device_models (name, brand, type) VALUES ('Gateway V1', 'ALM', 'Gateway');

-- Inserting test data for devices
INSERT INTO devices (name, model_id) VALUES ('Gateway 1', 1);

-- Inserting test data for gateways devices
INSERT INTO gateway_devices (device_id, realtime_enabled) VALUES (1, FALSE);

-- Assigning devices to patients
-- INSERT INTO patients_device (patient_id, device_id, start_date) VALUES (1, 1, '2021-01-01');


-- Inserting test data for notifications
INSERT INTO notifications (user_id, message) 
VALUES (1, 'Important new message'), (2, 'Scheduled appointment');

-- Inserting test data for feedbacks
INSERT INTO feedbacks (patient_id, global_observation) 
VALUES (1, 'The patient is feeling better after the treatment');
