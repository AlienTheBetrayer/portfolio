import { useScrollProgress } from '../../../shared/hooks/useScrollProgress';
import './Scrollbar.css';

import { motion, useSpring } from 'motion/react';

export const Scrollbar = () => {
    const scroll = useScrollProgress();
    const scale = useSpring(scroll.motionValue.scrollYProgress, {
        stiffness: 30,
        damping: 20,
    });

    return (
        <motion.div className='history-scrollbar' style={{ scale }}>
        </motion.div>
    )
}