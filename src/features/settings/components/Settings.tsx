import './Settings.css';
import { useSelector } from 'react-redux';
import { Button } from '../../../shared/components/Button';
import { useSettingsMenu } from '../../layout/hooks/useSettingsMenu';
import { motion } from 'motion/react';
import type { StoreType } from '../../../shared/redux/store';

export const Settings = () => {
    const settingsMenu = useSettingsMenu(true);
    const loaded = useSelector((state: StoreType) => state.loaded.value);

    return (
        <>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: loaded ? 0 : 5, duration: loaded ? 1 : 2, ease: 'linear' }}>
                <Button className='settings' onClick={() => settingsMenu.setShown(true)}>⚙</Button>
            </motion.div>

            { settingsMenu.render() }
        </>
    )
}