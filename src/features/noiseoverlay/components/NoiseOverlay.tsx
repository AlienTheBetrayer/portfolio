import './NoiseOverlay.css';
import { motion } from 'motion/react';

interface Props {
    delay?: number;
    duration?: number;
}

export const NoiseOverlay = ({ delay = 1, duration = 1 }: Props) => {
    return (
        <motion.div className='noise-overlay' 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: delay, duration: duration, ease: 'easeOut' }}/>
    )
}