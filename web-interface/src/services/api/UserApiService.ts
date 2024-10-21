import {UserLoginDto, UserRegisterDto} from "../../interfaces/dto/User.ts";
import {UserLogin, UserRegister} from "../../interfaces/model/User.ts";
import {userLoginToUserLoginDto, userRegisterToUserRegisterDto} from "../../mappers/UserMapper.ts";
import {apiUrls} from "../../utils/Constants.ts";
import {api} from "./FetcherService.ts";

export const loginUser = async (user: UserLogin) => {
    const userDto = userLoginToUserLoginDto(user);
    return api.post<UserLoginDto, {token: string}>(apiUrls.auth.login, userDto);
};

export const registerUser = async (user: UserRegister) => {
    const userDto = userRegisterToUserRegisterDto(user);
    return api.post<UserRegisterDto, {token: string}>(apiUrls.auth.register, userDto);
};