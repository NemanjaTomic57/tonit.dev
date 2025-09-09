"use client";

import { apiUrl } from "@/environment";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import axios from "axios";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react";

interface Props {
    children: ReactNode;
}

export interface RootContextProps {
    showResumePopup: boolean;
    setShowResumePopup: Dispatch<SetStateAction<boolean>>;
}

export const RootContext = createContext<RootContextProps>({
    showResumePopup: true,
    setShowResumePopup: () => {},
});

export default function RootContextProvider({ children }: Props) {
    // Context for the resume popup on {routes.home}
    const [showResumePopup, setShowResumePopup] = useState(false);
    useDisableScroll(showResumePopup);

    // User info for admin dashboard
    const fetchUserInfo = async () => {
        const result = await axios.get(apiUrl + "admin/user-info", {
            withCredentials: true,
        });

        if (result.status === 200) {
            localStorage.setItem("user", JSON.stringify(result.data));
        } else {
            localStorage.removeItem("user");
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    return (
        <RootContext.Provider value={{ showResumePopup, setShowResumePopup }}>
            {children}
        </RootContext.Provider>
    );
}
