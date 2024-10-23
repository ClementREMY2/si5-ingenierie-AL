import {UserDto, UserLoginDto, UserRegisterDto} from "../../interfaces/dto/User.ts";
import {UserLogin, UserRegister} from "../../interfaces/model/User.ts";
import {userDtoToUser, userLoginToUserLoginDto, userRegisterToUserRegisterDto} from "../../mappers/UserMapper.ts";
import {apiUrls} from "../../utils/Api.ts";
import {api} from "./FetcherService.ts";

export const loginUser = async (user: UserLogin) => {
    const userDto = userLoginToUserLoginDto(user);
    return api.post<UserLoginDto, {token: string}>(apiUrls.auth.login, userDto);
};

export const registerUser = async (user: UserRegister) => {
    const userDto = userRegisterToUserRegisterDto(user);
    return api.post<UserRegisterDto, {token: string}>(apiUrls.auth.register, userDto);
};

export const getUserById = async (id: number) => {
    return api.get<UserDto>(apiUrls.users.getUserById(id)).then(response => {
        if ((response as {error: string})?.error) return response as {error: string};
        return {user: userDtoToUser(response as UserDto)};
    });
};