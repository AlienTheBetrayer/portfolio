import { useMotionValue, useSpring, useTransform, type SpringOptions } from 'motion/react';
import './CursorEffect.css';

import { motion } from 'motion/react';
import { useEffect, useRef } from "react"

export const CursorEffect = () => {
    const cursorEffectRef = useRef<HTMLDivElement | null>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const options: SpringOptions = { stiffness: 100, damping: 20, duration: 0.1 };
    const springX = useSpring(x, options);
    const springY = useSpring(y, options);

    const offsetX = useTransform(springX, prev => prev - 64);
    const offsetY = useTransform(springY, prev => prev - 64);

    useEffect(() => {
        const handleMove = (e: PointerEvent) => {
            x.set(e.x);
            y.set(e.y);
        }

        window.addEventListener('pointermove', handleMove);
        return () => window.removeEventListener('pointermove', handleMove);
    }, []);

    return (
        <motion.div className='cursor-effect' ref={cursorEffectRef} style={{ x: offsetX, y: offsetY }}/>
    )
}