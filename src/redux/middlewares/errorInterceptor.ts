import { useAuthStore } from "@/stores/auth";
import {
    isRejectedWithValue,
    Middleware,
    MiddlewareAPI,
} from "@reduxjs/toolkit";
import { toast } from "sonner";
import { authApis } from "../services/auth";

const processedErrors = new Set();

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => async (action: any) => {
        if (isRejectedWithValue(action)) {
            const errorMessage =
                action?.payload?.message ||
                action?.payload?.error ||
                action?.payload?.data?.message ||
                "Unknown error";

            console.log("action", action.payload);

            if (!processedErrors.has(errorMessage)) {
                console.log("BACKEND ERROR", action?.payload);
                processedErrors.add(errorMessage);

                if (action?.payload?.status === 401) {
                    const authStore = useAuthStore.getState();
                    authApis;
                    try {
                        const response = await api.dispatch(
                            authApis.endpoints.refreshAccessToken.initiate({
                                refresh_token: authStore.refresh || "",
                            }) as any
                        );
                        if (response?.data?.data?.access_token) {
                            useAuthStore.setState({
                                access: response.data.data.access_token,
                            });
                        }

                        toast.error("Token refreshed, Retry the action");
                    } catch (error) {
                        console.error("Error refreshing token", error);
                        toast.error("Error refreshing token");
                    }
                } else {
                    toast.error(errorMessage);
                }

                // Clear the processed errors after some time to allow new messages
                setTimeout(() => processedErrors.delete(errorMessage), 5000);
            }
        }

        return next(action);
    };
