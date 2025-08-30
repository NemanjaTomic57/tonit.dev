"use client";

import { useDisableScroll } from "@/hooks/useDisableScroll";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react";

interface Props {
    children: ReactNode;
}

export interface ResumePopupContextProps {
    showResumePopup: boolean;
    setShowResumePopup: Dispatch<SetStateAction<boolean>>;
}

export const ResumePopupContext = createContext<ResumePopupContextProps>({
    showResumePopup: true,
    setShowResumePopup: () => {},
});

export default function ResumePopupProvider({ children }: Props) {
    const [showResumePopup, setShowResumePopup] = useState(true);

    useDisableScroll(showResumePopup);

    return (
        <ResumePopupContext.Provider
            value={{ showResumePopup, setShowResumePopup }}
        >
            {children}
        </ResumePopupContext.Provider>
    );
}
