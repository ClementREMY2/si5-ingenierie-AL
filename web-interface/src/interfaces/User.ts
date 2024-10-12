export enum UserRole {
    ADMIN = "Admin",
    DOCTOR = "Doctor",
    NURSE = "Nurse",
    PATIENT = "Patient",
    FAMILY = "Family"
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: UserRole;
}

export interface UserLogin {
    email?: string;
    password?: string;
}

export interface UserSignUp {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}