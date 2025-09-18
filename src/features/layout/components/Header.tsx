import './Header.css';

import { motion } from 'motion/react';
import { LinkButton } from '../../../shared/components/LinkButton';
import { Button } from '../../../shared/components/Button';
import { HeaderMenu } from './HeaderMenu';
import { usePopup } from '../../../shared/hooks/usePopup';
import { useSelector } from 'react-redux';
import type { StoreType } from '../../../shared/redux/store';

export const Header = () => {
    const loaded = useSelector((state: StoreType) => state.loaded.value);
    const menuOverlay = usePopup(<HeaderMenu onInteract={() => menuOverlay.setShown(false)}/>);

    return (
        <motion.header className='header'
        initial={{ top: loaded ? '1rem' : '-10rem' }}
        animate={{ top: '1rem' }}
        transition={{ delay: 4.3, duration: 1, ease: 'circOut' }}>
            
            <nav className='header-nav'>
                <div className='notmobile-header'>
                    <LinkButton to='/home'>Home</LinkButton>
                    <LinkButton to='/history'>History</LinkButton>
                    <LinkButton to='/contact'>Contact</LinkButton>
                </div>

                <div className='mobile-header'>
                    <LinkButton to='/home'>Home</LinkButton>
                    <Button onClick={() => menuOverlay.setShown(true)}>Menu</Button>
                </div>

                { menuOverlay.render() }
            </nav>
        </motion.header>
    )
}