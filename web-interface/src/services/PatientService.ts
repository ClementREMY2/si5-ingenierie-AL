import {Patient, UserRole} from "../interfaces/User.ts";
import {getUsersWithRole} from "./UserService.ts";

export const getPatients = (): Patient[] => getUsersWithRole(UserRole.PATIENT) as Patient[];

export const getPatientById = (id: number): Patient | undefined => {
    const patients = getPatients();
    return patients.find((patient) => patient.id === id);
};