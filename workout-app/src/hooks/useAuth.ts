import {useSession} from "next-auth/react";
import {useRefreshToken} from "@/hooks/useRefreshToken";
import {useEffect} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {axiosAuth} from "@/data/http-client";

const useAuth = () => {
    const {data: session} = useSession();
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use(
            (config: any) => {
                if (!config.headers["Authorization"]) {
                    // @ts-ignore
                    config.headers["Authorization"] = `Bearer ${session?.user?.access_token}`;
                }
                return config;
            },
            (error: any) => Promise.reject(error)
        );

        const responseIntercept = axiosAuth.interceptors.response.use(
            (response: any) => response,
            async (error: any) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 401 || error?.response?.status === 403) && !prevRequest?.sent) {
                    prevRequest.sent = true;

                    // @ts-ignore
                    const refreshTokenResponse = await refreshToken();

                    // @ts-ignore
                    prevRequest.headers["Authorization"] = `Bearer ${refreshTokenResponse.access_token}`;
                    return axiosAuth(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
            axiosAuth.interceptors.response.eject(responseIntercept);
        };
    }, [session, refreshToken]);

    return axiosAuth;
};

export default useAuth;