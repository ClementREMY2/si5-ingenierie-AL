import {User, UserRole, UserSignUp} from "../interfaces/User.ts";

export const users: (User & UserSignUp)[] = [
    {
        id: "1",
        firstName: "Admin",
        lastName: "AdminName",
        phone: "+33606060606",
        email: "admin@example.com",
        password: "Password123",
        role: UserRole.ADMIN
    },
    {
        id: "2",
        firstName: "Docteur",
        lastName: "DocteurName",
        phone: "+33606060606",
        email: "docteur@example.com",
        password: "Password123",
        role: UserRole.DOCTOR
    },
    {
        id: "3",
        firstName: "Nurse",
        lastName: "NurseName",
        phone: "+33606060606",
        email: "nurse@example.com",
        password: "Password123",
        role: UserRole.NURSE
    },
    {
        id: "4",
        firstName: "Patient",
        lastName: "PatientName",
        phone: "+33606060606",
        email: "patient@example.com",
        password: "Password123",
        role: UserRole.PATIENT
    },
    {
        id: "5",
        firstName: "Proche",
        lastName: "ProcheName",
        phone: "+33606060606",
        email: "proche@example.com",
        password: "Password123",
        role: UserRole.FAMILY
    }
];