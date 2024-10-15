import {createContext, ReactNode, useContext, useState} from "react";
import {User, UserLogin, UserRegister} from "../interfaces/User.ts";
import {getUserByLogin, registerUser} from "../services/UserService.ts";

interface AuthProviderProps {
    children?: ReactNode;
}

interface AuthContextType {
    user: User | null;
    handleLogin: (loginData: UserLogin) => {error: UserLogin} | undefined;
    handleRegister: (registerData: UserRegister) => {error: UserRegister} | undefined;
    logout: () => void;
}

const defaultAuthContext: AuthContextType = {
    user: null,
    handleLogin: () => undefined,
    handleRegister: () => undefined,
    logout: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

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
    const [user, setUser] = useState(getUserFromLocalStorage());

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

    const handleRegister = (registerData: UserRegister): {error: UserRegister} | undefined => {
        const result = registerUser(registerData);

        if (result?.user) {
            setUser(result.user);
            changeUserInLocalStorage(result.user);
        } else {
            logout();
            return result;
        }
    };

    const logout = () => {
        setUser(null);
        removeUserFromLocalStorage();
    };

    return (
        <AuthContext.Provider value={{user, handleLogin, handleRegister, logout}}>
            {children}
        </AuthContext.Provider>
    );
};