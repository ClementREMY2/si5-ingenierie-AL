import {jwtDecode} from "jwt-decode";
import {createContext, ReactNode, useContext, useState} from "react";
import {User, UserLogin, UserRegister} from "../interfaces/model/User.ts";
import {registerUser} from "../services/api/UserApiService.ts";
import {getUserById, getUserByLogin} from "../services/UserService.ts";

interface AuthProviderProps {
    children?: ReactNode;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    handleLoginByToken: (token: string) => {error: string} | undefined;
    handleLogin: (loginData: UserLogin) => {error: UserLogin} | undefined;
    handleRegister: (registerData: UserRegister) => Promise<{error: string} | undefined>;
    logout: () => void;
}

const defaultAuthContext: AuthContextType = {
    token: null,
    user: null,
    handleLoginByToken: () => undefined,
    handleLogin: () => undefined,
    handleRegister: async () => undefined,
    logout: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

const changeTokenInLocalStorage = (token: string) => {
    localStorage.setItem("token", token);
};

const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
};

const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
        return JSON.parse(userString) as User;
    }
    return null;
};

const changeUserInLocalStorage = (user: User) => {
    const userString = JSON.stringify(user);
    localStorage.setItem("user", userString);
};

const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
};

export const AuthProvider = ({children}: Readonly<AuthProviderProps>) => {
    const [token, setToken] = useState(getTokenFromLocalStorage());
    const [user, setUser] = useState(getUserFromLocalStorage());

    const handleLoginByToken = (token: string): {error: string} | undefined => {
        const decoded = jwtDecode(token);
        const result = getUserById(1);

        if (result?.user) {
            setToken(token);
            changeTokenInLocalStorage(token);
            setUser(result.user);
            changeUserInLocalStorage(result.user);
        } else {
            logout();
            return result;
        }
    };

    const handleLogin = (loginData: UserLogin): {error: UserLogin} | undefined => {
        const result = getUserByLogin(loginData);

        if (result?.user) {
            setUser(result.user);
            changeUserInLocalStorage(result.user);
        } else {
            logout();
            return result;
        }
    };

    const handleRegister = async (registerData: UserRegister) => {
        const result: {token?: string, error?: string} = await registerUser(registerData);

        if (result?.token) handleLoginByToken(result.token);
        else return {error: result.error ?? "Cannot register user"};
    };

    const logout = () => {
        setToken(null);
        removeTokenFromLocalStorage();
        setUser(null);
        removeUserFromLocalStorage();
    };

    return (
        <AuthContext.Provider value={{token, user, handleLoginByToken, handleLogin, handleRegister, logout}}>
            {children}
        </AuthContext.Provider>
    );
};