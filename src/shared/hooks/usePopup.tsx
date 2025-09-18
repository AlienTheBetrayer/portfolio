import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useBackgroundOverlay } from "./useBackgroundOverlay";

export const usePopup = (component: React.ReactNode, outsideClickCallback?: () => void, zIndex: number = 1000, hideScrollbar: boolean = true) => {
    const [shown, setShown] = useState<boolean>(false);
    const backgroundOverlay = useBackgroundOverlay(outsideClickCallback, zIndex, hideScrollbar);

    useEffect(() => {
        if(hideScrollbar) {
            document.body.style.overflow = shown ? 'hidden' : 'auto';
        }
        backgroundOverlay.setShown(shown);
    }, [shown, hideScrollbar]);

    const render = () => {
        return (
            <>
                { shown && createPortal(component, document.body) }
                { backgroundOverlay.render() }
            </>
        )
    }

    return { shown, setShown, render };
}