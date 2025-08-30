import { useEffect } from "react";

/**
 * Custom hook to disable page scroll when condition is true
 *
 * @param disable - condition that determines whether scrolling should be disabled
 */
export function useDisableScroll(disable: boolean) {
    useEffect(() => {
        if (disable) {
            const originalStyle = window.getComputedStyle(
                document.body,
            ).overflow;
            document.body.style.overflow = "hidden"; // disable scrolling

            // cleanup → restore original style
            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [disable]);
}
