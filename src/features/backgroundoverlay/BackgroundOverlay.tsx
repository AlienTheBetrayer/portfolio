import './BackgroundOverlay.css';

import { motion } from 'motion/react';

interface Props {
    onOutsideClick?: () => void;
    zIndex?: number;
}

export const BackgroundOverlay = ({ onOutsideClick, zIndex = 1000 }: Props) => {
    return (
        <motion.div style={{ zIndex: zIndex }} onClick={() => onOutsideClick?.()} 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        transition={{ duration: 0.5 }}
        className='background-overlay'/>
    )
}