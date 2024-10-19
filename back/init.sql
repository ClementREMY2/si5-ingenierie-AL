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
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    doctor_id INTEGER REFERENCES doctors(user_id),
    medical_record TEXT
);

-- Many-to-Many relationship between nurses and patients
CREATE TABLE nurses_patients (
    nurse_id INTEGER REFERENCES nurses(user_id),
    patient_id INTEGER REFERENCES patients(id),
    PRIMARY KEY (nurse_id, patient_id)
);

-- Creating relatives
CREATE TABLE relatives (
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    contact VARCHAR(100)
);

-- Many-to-Many relationship between relatives and patients
CREATE TABLE relatives_patients (
    relative_id INTEGER REFERENCES relatives(id),
    patient_id INTEGER REFERENCES patients(id),
    PRIMARY KEY (relative_id, patient_id)
);

-- Creating medical reports
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    global_observation TEXT
);

-- Creating devices
CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(100)
);



-- Creating device stock
CREATE TABLE device_stock (
    id SERIAL PRIMARY KEY,
    device_id INTEGER REFERENCES devices(id)
);

-- Many-to-Many relationship between reports and devices
CREATE TABLE reports_devices (
    report_id INTEGER REFERENCES reports(id),
    device_id INTEGER REFERENCES device_stock(id),
    observation TEXT,
    PRIMARY KEY (report_id, device_id)
);
-- Many-to-Many relationship between patients and equipment
CREATE TABLE patients_device (
    patient_id INTEGER REFERENCES patients(id),
    device_id INTEGER UNIQUE REFERENCES device_stock(id),
    PRIMARY KEY (patient_id, device_id),
    start_date DATE,
    end_date DATE
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
    patient_id INTEGER REFERENCES patients(id),
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
INSERT INTO users (email, password, last_name, first_name, role_id, phone) 
VALUES ('john.smith@example.com', 'password1', 'Smith', 'John', 2, '+33653784926'),
       ('jane.doe@example.com', 'password2', 'Doe', 'Jane', 3, '+33653734926'),
       ('paul.brown@example.com', 'password3', 'Brown', 'Paul', 4, '+33753784926');

-- Inserting test data for doctors
INSERT INTO doctors (user_id, specialty) 
VALUES (1, 'Cardiology');

-- Inserting test data for patients
INSERT INTO patients (user_id, doctor_id, medical_record) 
VALUES (3, 1, 'Complete medical record');

-- Inserting test data for nurses
INSERT INTO nurses (user_id, specialty) 
VALUES (2, 'Cardiology (nurse)');

-- Inserting test data for devices
INSERT INTO devices (name, type) VALUES ('ECG', 'Monitor'), ('Thermometer', 'Care');


-- Inserting test data for notifications
INSERT INTO notifications (user_id, message) 
VALUES (1, 'Important new message'), (2, 'Scheduled appointment');

-- Inserting test data for feedbacks
INSERT INTO feedbacks (patient_id, global_observation) 
VALUES (1, 'The patient is feeling better after the treatment');
