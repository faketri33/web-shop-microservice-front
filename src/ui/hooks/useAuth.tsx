import {useContext} from "react";
import { AuthContext } from "@/infrastructure/client/axios/context/AuthContext"

export function useAuth() {
    return useContext(AuthContext);
}