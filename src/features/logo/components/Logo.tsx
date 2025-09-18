import './Logo.css';

import { motion } from 'motion/react';
import { LogoCanvas } from '../../logo/components/LogoCanvas';
import { useSelector } from 'react-redux';
import type { StoreType } from '../../../shared/redux/store';

export const Logo = () => {
    const loaded = useSelector((state: StoreType) => state.loaded.value);

    return (
        <motion.div className='logo'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: loaded ? 0 : 5, duration: loaded ? 1 : 2, ease: 'linear' }}>
            <LogoCanvas/>
        </motion.div>
    )
}