import './ScrollTop.css';
import { motion } from 'motion/react';
import { Button } from "../../../shared/components/Button"
import { useScrollProgress } from '../../../shared/hooks/useScrollProgress';

export const ScrollTop = () => {
    const scroll = useScrollProgress();

    return (
        <motion.div className='scroll-top'
            initial={{ opacity: 0, display: 'none' }}
            animate={ scroll.y > 0.2 ? { opacity: 1, display: 'block' } : { opacity: 0, display: 'none' } }
            transition={{ ease: 'linear' }}>
            <Button onClick={() => window.scrollTo({ left: 0, top: 0, behavior: 'smooth'})}>
                ↑
            </Button>
        </motion.div>
    )
}