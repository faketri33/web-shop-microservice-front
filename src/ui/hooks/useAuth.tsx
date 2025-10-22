import {useContext} from "react";
import { AuthContext } from "@/infrastructure/client/context/AuthContext"

export function useAuth() {
    return useContext(AuthContext);
}