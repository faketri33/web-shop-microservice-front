import React, {useMemo} from "react";
import {useAuth} from "@/ui/hooks/useAuth";
import {createAxiosInstance} from "@/infrastructure/client/axios/AxiosClient";
import {createServices} from "@/infrastructure/client/createService";

export const ServicesContext = React.createContext<ReturnType<typeof createServices> | null>(null);

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useAuth();
    const axiosInstance = useMemo(() =>
        createAxiosInstance(auth), [auth]);

    const services = useMemo(() =>
        createServices(auth), [auth]
    );

    return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
};