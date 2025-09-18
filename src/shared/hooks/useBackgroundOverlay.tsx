import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BackgroundOverlay } from "../../features/backgroundoverlay/BackgroundOverlay";
import { AnimatePresence } from 'motion/react';

export const useBackgroundOverlay = (outsideClickCallback?: () => void, zIndex: number = 1000, hideScrollbar: boolean = true) => {
    const [shown, setShown] = useState<boolean>(false);

    useEffect(() => {
        if(hideScrollbar) {
            document.body.style.overflow = shown ? 'hidden' : 'auto';
        }
    }, [shown, hideScrollbar]);

    const render = () => {
        return (
            createPortal(
                <AnimatePresence>
                    { shown && <BackgroundOverlay onOutsideClick={outsideClickCallback} zIndex={zIndex}/> }
                </AnimatePresence>
            ,document.body)
        )
    }

    return { shown, setShown, render };
}