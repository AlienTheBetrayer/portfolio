import { useScrollProgress } from '../../../shared/hooks/useScrollProgress'
import './ScrollProgress.css'
import { motion, useSpring } from 'motion/react'

export const ScrollProgress = () => {
    const scroll = useScrollProgress();
    const scaleX = useSpring(scroll.motionValue.scrollYProgress, {
        stiffness: 100,
        damping: 40,
    });

    return (
        <motion.div className='scroll-progress'
        style={{ scaleX }}>

        </motion.div>
    )
}