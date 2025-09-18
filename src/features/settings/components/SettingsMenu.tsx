import './SettingsMenu.css'

import { useState } from 'react';
import { Button } from '../../../shared/components/Button'
import { ToggleButton } from '../../../shared/components/ToggleButton';
import { useDispatch, useSelector } from 'react-redux';
import { type DispatchType, type StoreType } from '../../../shared/redux/store';
import { themeSlice } from '../../../shared/redux/slices/theme';

interface Props {
    onInteract: () => void;
}

export const SettingsMenu = ({ onInteract }: Props ) => {
    const theme = useSelector((state: StoreType) => state.theme.value);
    const themeDispatch = useDispatch<DispatchType>();

    const [isButtonLight, setIsButtonLight] = useState<boolean>(() => theme !== 'dark' );

    const onThemeToggle = (state: boolean) => {
        setIsButtonLight(prev => !prev);
        themeDispatch(themeSlice.actions.set(state ? 'light' : 'dark'));
    }

    return (
        <div className='settings-menu'>
            <h3 className='text-center'>Settings</h3>

            <div className='settings-menu-content'>
                <ToggleButton onToggle={(state) => onThemeToggle(state)} value={isButtonLight}>
                    Light Theme
                </ToggleButton>
            </div>

            <Button onClick={() => onInteract()}>Done (save)</Button>
        </div>
    )
}