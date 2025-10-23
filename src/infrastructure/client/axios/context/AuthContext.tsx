import {createContext} from "react";

export type AuthContextShape = {
    login?: () => void;
    handleCallback?: () => Promise<void>;
    logout?: () => void;
    getAccessToken?: () => string | null;
    refreshTokens?: () => Promise<void> | void;
    tokens?: Record<string, unknown> | null;
} | null;

export const AuthContext = createContext<AuthContextShape>(null);