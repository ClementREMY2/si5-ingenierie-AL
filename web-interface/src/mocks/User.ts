import {Admin, Doctor, Family, Nurse, Patient, UserRegister, UserRole} from "../interfaces/User.ts";

export const users = [
    {
        id: "1",
        firstName: "Admin",
        lastName: "AdminName",
        phone: "+33606060606",
        email: "admin@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    } as Admin & UserRegister,
    {
        id: "2",
        firstName: "Doctor",
        lastName: "DoctorName",
        phone: "+33606060606",
        email: "doctor@example.com",
        password: "Password123",
        role: UserRole.DOCTOR,
        specialty: "Specialty"
    } as Doctor & UserRegister,
    {
        id: "3",
        firstName: "Nurse",
        lastName: "NurseName",
        phone: "+33606060606",
        email: "nurse@example.com",
        password: "Password123",
        role: UserRole.NURSE,
        specialty: "Specialty"
    } as Nurse & UserRegister,
    {
        id: "4",
        firstName: "Patient",
        lastName: "PatientName",
        phone: "+33606060606",
        email: "patient@example.com",
        password: "Password123",
        role: UserRole.PATIENT,
        medicalRecord: "MedicalRecord"
    } as Patient & UserRegister,
    {
        id: "5",
        firstName: "Family",
        lastName: "FamilyName",
        phone: "+33606060606",
        email: "family@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    } as Family & UserRegister,
    {
        id: "6",
        firstName: "Admin2",
        lastName: "AdminName",
        phone: "+33606060606",
        email: "admin2@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    } as Admin & UserRegister,
    {
        id: "7",
        firstName: "Doctor2",
        lastName: "DoctorName",
        phone: "+33606060606",
        email: "doctor2@example.com",
        password: "Password123",
        role: UserRole.DOCTOR,
        specialty: "Specialty"
    } as Doctor & UserRegister,
    {
        id: "8",
        firstName: "Nurse2",
        lastName: "NurseName",
        phone: "+33606060606",
        email: "nurse2@example.com",
        password: "Password123",
        role: UserRole.NURSE,
        specialty: "Specialty"
    } as Nurse & UserRegister,
    {
        id: "9",
        firstName: "Patient2",
        lastName: "PatientName",
        phone: "+33606060606",
        email: "patient2@example.com",
        password: "Password123",
        role: UserRole.PATIENT,
        medicalRecord: "MedicalRecord"
    } as Patient & UserRegister,
    {
        id: "10",
        firstName: "Family2",
        lastName: "FamilyName",
        phone: "+33606060606",
        email: "family2@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    } as Family & UserRegister,
    {
        id: "11",
        firstName: "Admin3",
        lastName: "AdminName",
        phone: "+33606060606",
        email: "admin3@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    } as Admin & UserRegister,
    {
        id: "12",
        firstName: "Doctor3",
        lastName: "DoctorName",
        phone: "+33606060606",
        email: "doctor3@example.com",
        password: "Password123",
        role: UserRole.DOCTOR,
        specialty: "Specialty"
    } as Doctor & UserRegister,
    {
        id: "13",
        firstName: "Nurse3",
        lastName: "NurseName",
        phone: "+33606060606",
        email: "nurse3@example.com",
        password: "Password123",
        role: UserRole.NURSE,
        specialty: "Specialty"
    } as Nurse & UserRegister,
    {
        id: "14",
        firstName: "Patient3",
        lastName: "PatientName",
        phone: "+33606060606",
        email: "patient3@example.com",
        password: "Password123",
        role: UserRole.PATIENT,
        medicalRecord: "MedicalRecord"
    } as Patient & UserRegister,
    {
        id: "15",
        firstName: "Family3",
        lastName: "FamilyName",
        phone: "+33606060606",
        email: "family3@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    } as Family & UserRegister,
    {
        id: "16",
        firstName: "Admin4",
        lastName: "AdminName",
        phone: "+33606060606",
        email: "admin4@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    } as Admin & UserRegister,
    {
        id: "17",
        firstName: "Doctor4",
        lastName: "DoctorName",
        phone: "+33606060606",
        email: "doctor4@example.com",
        password: "Password123",
        role: UserRole.DOCTOR,
        specialty: "Specialty"
    } as Doctor & UserRegister,
    {
        id: "18",
        firstName: "Nurse4",
        lastName: "NurseName",
        phone: "+33606060606",
        email: "nurse4@example.com",
        password: "Password123",
        role: UserRole.NURSE,
        specialty: "Specialty"
    } as Nurse & UserRegister,
    {
        id: "19",
        firstName: "Patient4",
        lastName: "PatientName",
        phone: "+33606060606",
        email: "patient4@example.com",
        password: "Password123",
        role: UserRole.PATIENT,
        medicalRecord: "MedicalRecord"
    } as Patient & UserRegister,
    {
        id: "20",
        firstName: "Family4",
        lastName: "FamilyName",
        phone: "+33606060606",
        email: "family4@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    } as Family & UserRegister,
    {
        id: "21",
        firstName: "Admin5",
        lastName: "AdminName",
        phone: "+33606060606",
        email: "admin5@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    } as Admin & UserRegister,
    {
        id: "22",
        firstName: "Doctor5",
        lastName: "DoctorName",
        phone: "+33606060606",
        email: "doctor5@example.com",
        password: "Password123",
        role: UserRole.DOCTOR,
        specialty: "Specialty"
    } as Doctor & UserRegister,
    {
        id: "23",
        firstName: "Nurse5",
        lastName: "NurseName",
        phone: "+33606060606",
        email: "nurse5@example.com",
        password: "Password123",
        role: UserRole.NURSE,
        specialty: "Specialty"
    } as Nurse & UserRegister,
    {
        id: "24",
        firstName: "Patient5",
        lastName: "PatientName",
        phone: "+33606060606",
        email: "patient5@example.com",
        password: "Password123",
        role: UserRole.PATIENT,
        medicalRecord: "MedicalRecord"
    } as Patient & UserRegister,
    {
        id: "25",
        firstName: "Family5",
        lastName: "FamilyName",
        phone: "+33606060606",
        email: "family5@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    } as Family & UserRegister,
    {
        id: "26",
        firstName: "Admin6",
        lastName: "AdminName",
        phone: "+33606060606",
        email: "admin6@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    } as Admin & UserRegister,
    {
        id: "27",
        firstName: "Doctor6",
        lastName: "DoctorName",
        phone: "+33606060606",
        email: "doctor6@example.com",
        password: "Password123",
        role: UserRole.DOCTOR,
        specialty: "Specialty"
    } as Doctor & UserRegister,
    {
        id: "28",
        firstName: "Nurse6",
        lastName: "NurseName",
        phone: "+33606060606",
        email: "nurse6@example.com",
        password: "Password123",
        role: UserRole.NURSE,
        specialty: "Specialty"
    } as Nurse & UserRegister,
    {
        id: "29",
        firstName: "Patient6",
        lastName: "PatientName",
        phone: "+33606060606",
        email: "patient6@example.com",
        password: "Password123",
        role: UserRole.PATIENT,
        medicalRecord: "MedicalRecord"
    } as Patient & UserRegister,
    {
        id: "30",
        firstName: "Family6",
        lastName: "FamilyName",
        phone: "+33606060606",
        email: "family6@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    } as Family & UserRegister
];