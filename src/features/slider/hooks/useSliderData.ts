import React, { useEffect, useRef } from "react";
import { useLayoutEffect, useReducer } from "react";
import { elementsReducer } from "../utils/elementsReducer";
import { mouseReducer } from "../utils/mouseReducer";

export const useSliderData = (children: React.ReactNode, container: React.RefObject<HTMLDivElement | null>, autoRepeatDelay: number = 0) => {
    const [data, dispatchData] = useReducer(elementsReducer, { elements: React.Children.toArray(children), current: 0 });
    const [mouse, dispatchMouse] = useReducer(mouseReducer, { initialX: 0, differenceX: 0, translateX: 0, width: 0, isDragging: false });

    const manuallyFlipped = useRef(false);
    const isDraggingRef = useRef(mouse.isDragging);

    useEffect(() => {
        isDraggingRef.current = mouse.isDragging;
    }, [mouse.isDragging]);

    useEffect(() => {
        let loop: number;

        if (autoRepeatDelay > 0) {
            loop = setInterval(() => {
                if (isDraggingRef.current)
                    return;

                if (manuallyFlipped.current) {
                    manuallyFlipped.current = false;
                    return;
                }
                dispatchData({ type: 'next' });
            }, autoRepeatDelay);

        }

        return () => clearInterval(loop);
    }, [autoRepeatDelay]);

    useLayoutEffect(() => {
        dispatchMouse({ type: 'setWidth', width: container.current?.offsetWidth ?? 0 });
    }, []);

    useEffect(() => {
        if (mouse.translateX > 10 || mouse.translateX < -10)
            manuallyFlipped.current = true;

        if (mouse.translateX > 10) {
            dispatchData({ type: 'next' });
            dispatchMouse({ type: 'up' });
        } else if (mouse.translateX < -10) {
            dispatchData({ type: 'previous' });
            dispatchMouse({ type: 'up' });
        }
    }, [mouse.translateX]);

    return [data, mouse, dispatchData, dispatchMouse] as const;
}