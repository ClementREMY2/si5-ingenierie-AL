import {Doctor, UserRole} from "../interfaces/User.ts";
import {getUsersWithRole} from "./UserService.ts";

export const getDoctors = (): Doctor[] => getUsersWithRole(UserRole.DOCTOR) as Doctor[];

export const getDoctorById = (id: number): Doctor => {
    const doctors = getDoctors();
    return doctors.find((doctor) => doctor.id === id)!;
};