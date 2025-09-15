import { routes } from "@/routes";
import { apiUrl } from "@/environment";
import { useEffect } from "react";
import axios from "axios";

export const useAdminGuard = () => {
    const getAuthStatus = async () => {
        const token = localStorage.getItem("jwt");
        const { data } = await axios.get(apiUrl + "admin/auth-status", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!data.isAuthenticated) {
            localStorage.removeItem("jwt");
            window.location.pathname = routes.adminLogin;
        }
    };

    useEffect(() => {
        getAuthStatus();
    });
};
