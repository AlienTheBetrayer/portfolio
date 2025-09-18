import './ToggleButton.css';
import { motion } from "motion/react"
import { useState } from 'react';
import { cssVar } from '../utils/cssVar';

interface Props {
    children?: string;
    value?: boolean;
    className?: string;
    onToggle?: (state: boolean) => void;
}

export const ToggleButton = ({ children, value, className = '', onToggle }: Props) => {
    const [internal, setInternal] = useState<boolean>(false);
    const isToggled = value ?? internal;

    const handleToggle = () => {
        onToggle?.(!isToggled);

        if (value === undefined)
            setInternal(prev => !prev);
    }
    
    return (
        <button onClick={() => handleToggle()} className={`${className} toggle-button`}>
            <div className='toggle-button-circle'
            style={{ justifyContent: isToggled ? 'flex-end' : 'flex-start' }}>
                <motion.div 
                layout animate={{ backgroundColor: isToggled ? cssVar('--background5') : cssVar('--background3')}}
                transition={{
                    type: "spring",
                    visualDuration: 0.3,
                    bounce: 0.2,
                }}/> 
            </div>
            
            { children && (
                <motion.span className='toggle-button-text'
                animate={{ color: isToggled ? cssVar('--background7') : cssVar('--background5') }}>
                    { children }
                </motion.span>
            )}
        </button>
    )
}