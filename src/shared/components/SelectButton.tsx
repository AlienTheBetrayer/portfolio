import './SelectButton.css'
import { useState } from 'react';
import { motion } from 'motion/react';

interface Props {
    items?: string[];
    className?: string; 
    buttonClassName?: string;
    value?: number;
    onSelect?: (idx: number, item: string) => void;
}

export const SelectButton = ({ className = '', buttonClassName = '', value, onSelect, items }: Props) => {
    const [internal, setInternal] = useState<number>(0);
    const selected = value ?? internal;

    const handleSelect = (idx: number, item: string) => {
        onSelect?.(idx, item);

        if (value === undefined)
            setInternal(idx);
    }

    return (
        <div className={`select-button-container ${className}`}>
            { items?.map((item, idx) => (
                <button className={`select-button ${buttonClassName}`} key={`select-button-${idx}`} onClick={() => handleSelect(idx, item)}>
                    { item }

                    { selected == idx && (
                        <motion.div layoutId='underline' transition={{ type: 'spring', stiffness: 150, damping: 20 }} className='select-button-underline'/>
                    )}
                </button>
            ))}
        </div>
    )
}