import {UserRole} from "../model/User.ts";

export interface UserLoginDto {
    email: string;
    password: string;
}

export interface UserRegisterDto {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    role_id: number;
}

export interface UserDto {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    role: UserRole;
}