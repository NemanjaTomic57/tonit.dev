'use client';

import { useDisableScroll } from '@/hooks/useDisableScroll';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

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

    return <RootContext.Provider value={{ showResumePopup, setShowResumePopup }}>{children}</RootContext.Provider>;
}
