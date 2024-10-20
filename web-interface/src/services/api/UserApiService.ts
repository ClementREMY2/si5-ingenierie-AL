import {UserRegisterDto} from "../../interfaces/dto/User.ts";
import {UserRegister} from "../../interfaces/model/User.ts";
import {userRegisterToUserRegisterDto} from "../../mappers/UserMapper.ts";
import {apiUrls} from "../../utils/Constants.ts";
import {api} from "./FetcherService.ts";

export const registerUser = async (user: UserRegister) => {
    const userDto = userRegisterToUserRegisterDto(user);
    return api.post<UserRegisterDto, {token: string}>(apiUrls.auth.register, userDto);
};