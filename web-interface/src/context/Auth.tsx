import {createContext, ReactNode, useContext, useState} from "react";
import {User, UserLogin} from "../interfaces/User.ts";
import {getUserByLogin} from "../services/UserService.ts";

interface AuthProviderProps {
    children?: ReactNode;
}

interface AuthContextType {
    user: User | null;
    handleLogin: (loginData: UserLogin) => {error: UserLogin} | undefined;
    handleLogout: () => void;
}

const defaultAuthContext: AuthContextType = {
    user: null,
    handleLogin: () => undefined,
    handleLogout: () => {}
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

    const handleLogout = () => setUser(null);

    return (
        <AuthContext.Provider value={{user, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};