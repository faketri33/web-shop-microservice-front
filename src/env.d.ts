interface ImportMetaEnv {
    readonly VITE_KEYCLOAK_BASE: string;
    readonly VITE_KEYCLOAK_CLIENT_ID: string;
    readonly VITE_REDIRECT_URI: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}