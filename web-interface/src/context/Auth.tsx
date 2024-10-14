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

export const AuthProvider = ({children}: Readonly<AuthProviderProps>) => {
    const [user, setUser] = useState(defaultAuthContext.user);

    const handleLogin = (loginData: UserLogin): {error: UserLogin} | undefined => {
        const result = getUserByLogin(loginData);

        if (result?.user) setUser(result.user);
        else {
            setUser(null);
            return result;
        }
    };

    const handleRegister = (registerData: UserRegister): {error: UserRegister} | undefined => {
        const result = registerUser(registerData);

        if (result?.user) setUser(result.user);
        else {
            setUser(null);
            return result;
        }
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{user, handleLogin, handleRegister, logout: logout}}>
            {children}
        </AuthContext.Provider>
    );
};