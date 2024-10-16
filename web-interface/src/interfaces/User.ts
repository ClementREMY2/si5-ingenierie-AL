export interface UserLogin {
    email?: string;
    password?: string;
}

export interface UserRegister {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export enum UserRole {
    ADMIN = "Admin",
    DOCTOR = "Doctor",
    NURSE = "Nurse",
    PATIENT = "Patient",
    FAMILY = "Family"
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: UserRole;
}

export interface Admin extends User {
    role: UserRole.ADMIN;
}

export interface Doctor extends User {
    role: UserRole.DOCTOR;
    specialty: string;
}

export interface Nurse extends User {
    role: UserRole.NURSE;
    specialty: string;
}

export interface Patient extends User {
    role: UserRole.PATIENT;
    doctor?: Doctor;
    nurses?: Nurse[];
    family?: Family[];
    medicalRecord: string;
}

export interface Family extends User {
    role: UserRole.FAMILY;
    patient?: Patient;
}