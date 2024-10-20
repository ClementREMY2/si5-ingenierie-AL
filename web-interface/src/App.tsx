import "./App.css";
import {RouterProvider} from "react-router-dom";
import {AuthProvider} from "./context/Auth.tsx";
import {router} from "./routers/Router.tsx";

export default function App() {
    return <AuthProvider><RouterProvider router={router}/></AuthProvider>;
}
