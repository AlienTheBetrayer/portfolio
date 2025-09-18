import { useScroll } from "motion/react";
import { useEffect, useState } from "react"

interface scrollInterface {
    x: number;
    y: number;
}

export const useScrollProgress = () => {
    const [scroll, setScroll] = useState<scrollInterface>({x: 0, y: 0});
    const motionScroll = useScroll();

    useEffect(() => {
        const unsubscribeX = motionScroll.scrollXProgress.on('change', (latest) => {
            setScroll(prev => ({ x: latest, y: prev.y }));
        });

        const unsubscribeY = motionScroll.scrollYProgress.on('change', (latest) => {
            setScroll(prev => ({ x: prev.x, y: latest }));
        });

        return () => { unsubscribeX(); unsubscribeY(); };
    }, [motionScroll]);

    return { x: scroll.x, y: scroll.y, motionValue: motionScroll };
}