import {Admin, Doctor, Family, Nurse, Patient, UserLogin, UserRegister, UserRole} from "../interfaces/model/User.ts";

export const emptyUserLogin: UserLogin = {
    email: "",
    password: ""
};

export const emptyUserRegister: UserRegister = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: UserRole.ADMIN
};

export const emptyDoctor: Doctor = {
    id: 0,
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    role: UserRole.DOCTOR,
    specialty: ""
};

export const emptyPatient: Patient = {
    id: 0,
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    role: UserRole.PATIENT,
    nurses: [],
    medicalRecord: ""
};

export const users = [
    {
        id: 1,
        firstname: "Admin",
        lastname: "AdminName",
        phone: "+33606060606",
        email: "admin@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    } as Admin & UserLogin,
    {
        id: 2,
        firstname: "Doctor",
        lastname: "DoctorName",
        phone: "+33606060606",
        email: "doctor@example.com",
        password: "Password123",
        role: UserRole.DOCTOR,
        specialty: "Specialty"
    } as Doctor & UserLogin,
    {
        id: 3,
        firstname: "Nurse",
        lastname: "NurseName",
        phone: "+33606060606",
        email: "nurse@example.com",
        password: "Password123",
        role: UserRole.NURSE,
        specialty: "Specialty"
    } as Nurse & UserLogin,
    {
        id: 4,
        firstname: "Patient",
        lastname: "PatientName",
        phone: "+33606060606",
        email: "patient@example.com",
        password: "Password123",
        role: UserRole.PATIENT,
        nurses: [],
        medicalRecord: "MedicalRecord"
    } as Patient & UserLogin,
    {
        id: 5,
        firstname: "Family",
        lastname: "FamilyName",
        phone: "+33606060606",
        email: "family@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    } as Family & UserLogin,
    {
        id: 6,
        firstname: "Admin2",
        lastname: "AdminName",
        phone: "+33606060606",
        email: "admin2@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    } as Admin & UserLogin,
    {
        id: 7,
        firstname: "Doctor2",
        lastname: "DoctorName",
        phone: "+33606060606",
        email: "doctor2@example.com",
        password: "Password123",
        role: UserRole.DOCTOR,
        specialty: "Specialty"
    } as Doctor & UserLogin,
    {
        id: 8,
        firstname: "Nurse2",
        lastname: "NurseName",
        phone: "+33606060606",
        email: "nurse2@example.com",
        password: "Password123",
        role: UserRole.NURSE,
        specialty: "Specialty"
    } as Nurse & UserLogin,
    {
        id: 9,
        firstname: "Patient2",
        lastname: "PatientName",
        phone: "+33606060606",
        email: "patient2@example.com",
        password: "Password123",
        role: UserRole.PATIENT,
        nurses: [],
        medicalRecord: "MedicalRecord"
    } as Patient & UserLogin,
    {
        id: 10,
        firstname: "Family2",
        lastname: "FamilyName",
        phone: "+33606060606",
        email: "family2@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    } as Family & UserLogin,
    {
        id: 11,
        firstname: "Admin3",
        lastname: "AdminName",
        phone: "+33606060606",
        email: "admin3@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    } as Admin & UserLogin,
    {
        id: 12,
        firstname: "Doctor3",
        lastname: "DoctorName",
        phone: "+33606060606",
        email: "doctor3@example.com",
        password: "Password123",
        role: UserRole.DOCTOR,
        specialty: "Specialty"
    } as Doctor & UserLogin,
    {
        id: 13,
        firstname: "Nurse3",
        lastname: "NurseName",
        phone: "+33606060606",
        email: "nurse3@example.com",
        password: "Password123",
        role: UserRole.NURSE,
        specialty: "Specialty"
    } as Nurse & UserLogin,
    {
        id: 14,
        firstname: "Patient3",
        lastname: "PatientName",
        phone: "+33606060606",
        email: "patient3@example.com",
        password: "Password123",
        role: UserRole.PATIENT,
        nurses: [],
        medicalRecord: "MedicalRecord"
    } as Patient & UserLogin,
    {
        id: 15,
        firstname: "Family3",
        lastname: "FamilyName",
        phone: "+33606060606",
        email: "family3@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    } as Family & UserLogin,
    {
        id: 16,
        firstname: "Admin4",
        lastname: "AdminName",
        phone: "+33606060606",
        email: "admin4@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    } as Admin & UserLogin,
    {
        id: 17,
        firstname: "Doctor4",
        lastname: "DoctorName",
        phone: "+33606060606",
        email: "doctor4@example.com",
        password: "Password123",
        role: UserRole.DOCTOR,
        specialty: "Specialty"
    } as Doctor & UserLogin,
    {
        id: 18,
        firstname: "Nurse4",
        lastname: "NurseName",
        phone: "+33606060606",
        email: "nurse4@example.com",
        password: "Password123",
        role: UserRole.NURSE,
        specialty: "Specialty"
    } as Nurse & UserLogin,
    {
        id: 19,
        firstname: "Patient4",
        lastname: "PatientName",
        phone: "+33606060606",
        email: "patient4@example.com",
        password: "Password123",
        role: UserRole.PATIENT,
        nurses: [],
        medicalRecord: "MedicalRecord"
    } as Patient & UserLogin,
    {
        id: 20,
        firstname: "Family4",
        lastname: "FamilyName",
        phone: "+33606060606",
        email: "family4@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    } as Family & UserLogin,
    {
        id: 21,
        firstname: "Admin5",
        lastname: "AdminName",
        phone: "+33606060606",
        email: "admin5@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    } as Admin & UserLogin,
    {
        id: 22,
        firstname: "Doctor5",
        lastname: "DoctorName",
        phone: "+33606060606",
        email: "doctor5@example.com",
        password: "Password123",
        role: UserRole.DOCTOR,
        specialty: "Specialty"
    } as Doctor & UserLogin,
    {
        id: 23,
        firstname: "Nurse5",
        lastname: "NurseName",
        phone: "+33606060606",
        email: "nurse5@example.com",
        password: "Password123",
        role: UserRole.NURSE,
        specialty: "Specialty"
    } as Nurse & UserLogin,
    {
        id: 24,
        firstname: "Patient5",
        lastname: "PatientName",
        phone: "+33606060606",
        email: "patient5@example.com",
        password: "Password123",
        role: UserRole.PATIENT,
        nurses: [],
        medicalRecord: "MedicalRecord"
    } as Patient & UserLogin,
    {
        id: 25,
        firstname: "Family5",
        lastname: "FamilyName",
        phone: "+33606060606",
        email: "family5@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    } as Family & UserLogin,
    {
        id: 26,
        firstname: "Admin6",
        lastname: "AdminName",
        phone: "+33606060606",
        email: "admin6@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    } as Admin & UserLogin,
    {
        id: 27,
        firstname: "Doctor6",
        lastname: "DoctorName",
        phone: "+33606060606",
        email: "doctor6@example.com",
        password: "Password123",
        role: UserRole.DOCTOR,
        specialty: "Specialty"
    } as Doctor & UserLogin,
    {
        id: 28,
        firstname: "Nurse6",
        lastname: "NurseName",
        phone: "+33606060606",
        email: "nurse6@example.com",
        password: "Password123",
        role: UserRole.NURSE,
        specialty: "Specialty"
    } as Nurse & UserLogin,
    {
        id: 29,
        firstname: "Patient6",
        lastname: "PatientName",
        phone: "+33606060606",
        email: "patient6@example.com",
        password: "Password123",
        role: UserRole.PATIENT,
        nurses: [],
        medicalRecord: "MedicalRecord"
    } as Patient & UserLogin,
    {
        id: 30,
        firstname: "Family6",
        lastname: "FamilyName",
        phone: "+33606060606",
        email: "family6@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    } as Family & UserLogin
];