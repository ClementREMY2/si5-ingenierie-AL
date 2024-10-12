import {User, UserLogin} from "../interfaces/User.ts";
import {users} from "../mocks/User.ts";

export const getUserByLogin = (loginData: UserLogin) => {
    const user = users.find(user => user.email === loginData.email);

    if (!user) {
        return {error: {email: "Cannot find user by email."} as UserLogin};
    }
    if (user.password !== loginData.password) {
        return {error: {password: "Wrong credentials."} as UserLogin};
    }
    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            role: user.role
        } as User
    };
};