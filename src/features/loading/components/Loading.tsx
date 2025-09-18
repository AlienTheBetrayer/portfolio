import './Loading.css';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { SphereCanvas } from './SphereCanvas';
import { useBackgroundOverlay } from '../../../shared/hooks/useBackgroundOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { type DispatchType, type StoreType } from '../../../shared/redux/store';
import { loadedSlice } from '../../../shared/redux/slices/loaded';

export const Loading = () => {
    const loaded = useSelector((state: StoreType) => state.loaded.value);
    const loadedDispatch = useDispatch<DispatchType>();

    const backgroundOverlay = useBackgroundOverlay();

    useEffect(() => {
        const timeout = setTimeout(() => loadedDispatch(loadedSlice.actions.set(true)), 3000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        backgroundOverlay.setShown(!loaded);
    }, [loaded]);
    
    return (
        <AnimatePresence>
            {!loaded && (
                <motion.div className='loading'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                    <SphereCanvas/>
                </motion.div>
            )}

            { backgroundOverlay.render() }
        </AnimatePresence>
    )
}