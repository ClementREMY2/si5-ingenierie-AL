export enum UserType {
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
    password: string;
    type: UserType;
}

export interface UserSignIn {
    email?: string;
    password?: string;
}