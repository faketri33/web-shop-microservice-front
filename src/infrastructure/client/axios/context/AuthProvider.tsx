import React, { useMemo, useRef, useState } from "react";
import { generatePkcePair } from "../pkce/pkce";
import { AuthContext } from "@/infrastructure/client/axios/context/AuthContext";

const KEYCLOAK_BASE = import.meta.env.VITE_KEYCLOAK_BASE as string;
const CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID as string;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;
const AUTH_URL = `${KEYCLOAK_BASE}/protocol/openid-connect/auth`;
const TOKEN_URL = `${KEYCLOAK_BASE}/protocol/openid-connect/token`;

interface Tokens {
    access_token: string;
    refresh_token?: string;
    id_token?: string;
    expires_at: number;
}
interface TokenResponse {
    access_token: string;
    refresh_token?: string;
    id_token?: string;
    expires_in?: number | string;
    [key: string]: any;
}

export type AuthProvider = {};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tokens, setTokens] = useState<Tokens | null>(null);

    const refreshPromiseRef = useRef<Promise<TokenResponse>>(null);

    const login = async (): Promise<void> => {
        const { code_verifier, code_challenge } = await generatePkcePair();
        sessionStorage.setItem('pkce_verifier', code_verifier);

        const url = new URL(AUTH_URL);
        url.searchParams.set('response_type', 'code');
        url.searchParams.set('client_id', CLIENT_ID);
        url.searchParams.set('redirect_uri', REDIRECT_URI);
        url.searchParams.set('scope', 'openid profile email');
        url.searchParams.set('code_challenge', code_challenge);
        url.searchParams.set('code_challenge_method', 'S256');

        window.location.href = url.toString();
    };

    const handleCallback = async (): Promise<TokenResponse> => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        if (!code) throw new Error('No code in callback');

        const code_verifier = sessionStorage.getItem('pkce_verifier');
        sessionStorage.removeItem('pkce_verifier');

        if (!code_verifier) throw new Error('PKCE verifier not found in sessionStorage');

        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            code_verifier
        });

        const resp = await fetch(TOKEN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString()
        });

        if (!resp.ok) {
            const text = await resp.text();
            throw new Error('Token exchange failed: ' + text);
        }

        const data = (await resp.json()) as TokenResponse;
        setTokenStateFromResponse(data);
        return data;
    };

    function setTokenStateFromResponse(data: TokenResponse) {
        const now = Math.floor(Date.now() / 1000);
        const expiresInNum = Number(data.expires_in ?? 300);
        const expires_at = now + (Number.isFinite(expiresInNum) ? expiresInNum : 300);

        setTokens({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            id_token: data.id_token,
            expires_at
        });
    }

    const refreshTokens = async (): Promise<TokenResponse> => {
        if (!tokens?.refresh_token) throw new Error('No refresh token available');

        if (refreshPromiseRef.current) return refreshPromiseRef.current;

        const p = (async (): Promise<TokenResponse> => {
            try {
                const body = new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: tokens.refresh_token!,
                    client_id: CLIENT_ID
                });

                const resp = await fetch(TOKEN_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: body.toString()
                });

                if (!resp.ok) {
                    const text = await resp.text();
                    throw new Error('Refresh failed: ' + text);
                }

                const data = (await resp.json()) as TokenResponse;
                setTokenStateFromResponse(data);
                return data;
            } finally {
                refreshPromiseRef.current = null;
            }
        })();

        refreshPromiseRef.current = p;
        return p;
    };

    const logout = async (): Promise<void> => {
        setTokens(null);
    };

    const getAccessToken = (): string | null => tokens?.access_token ?? null;

    type AuthContextType = React.ContextType<typeof AuthContext> | Record<string, unknown>;

    const auth = useMemo<AuthContextType>(() => ({
        login,
        handleCallback,
        logout,
        getAccessToken,
        refreshTokens,
        tokens
    }), [tokens]);

    return <AuthContext.Provider value={auth as any}>{children}</AuthContext.Provider>;
};