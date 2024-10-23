import {UserDto, UserLoginDto, UserRegisterDto} from "../interfaces/dto/User.ts";
import {User, UserLogin, UserRegister, UserRole} from "../interfaces/model/User.ts";

export const userLoginToUserLoginDto = (source: UserLogin): UserLoginDto => {
    if (!source) {
        throw new Error("Invalid user login object");
    }

    return {
        email: source.email,
        password: source.password
    };
};

const getRoleIdFromRole = (role: UserRole): number => {
    switch (role) {
        case UserRole.ADMIN:
            return 1;
        case UserRole.DOCTOR:
            return 2;
        case UserRole.NURSE:
            return 3;
        case UserRole.PATIENT:
            return 4;
        case UserRole.FAMILY:
            return 5;
        default:
            throw new Error("Invalid user role");
    }
};

export const userRegisterToUserRegisterDto = (source: UserRegister): UserRegisterDto => {
    if (!source) {
        throw new Error("Invalid user register object");
    }

    return {
        email: source.email,
        password: source.password,
        first_name: source.firstname,
        last_name: source.lastname,
        phone: source.phone,
        role_id: getRoleIdFromRole(source.role)
    };
};

export const userDtoToUser = (source: UserDto): User => {
    if (!source) {
        throw new Error("Invalid user object");
    }

    return {
        id: source.id,
        email: source.email,
        firstname: source.first_name,
        lastname: source.last_name,
        phone: source.phone,
        role: source.role
    };
};