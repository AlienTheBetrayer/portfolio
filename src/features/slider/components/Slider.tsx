import './Slider.css';

import React, { useRef } from 'react';
import { motion } from 'motion/react';

import { SliderContext } from '../contexts/SliderContext';

import { Buttons } from './Buttons';
import { Pagination } from './Pagination';

import { useSliderData } from '../hooks/useSliderData';
import { Scrollbar } from './Scrollbar';

interface Props {
    children: React.ReactNode; // actual content
    tooltip?: string; // tooltip at the bottom right
    className?: string;
    pagination?: boolean; // centered bottom clickable navigation mini-buttons
    buttons?: boolean; // left and right navigation buttons
    scrollbar?: boolean; // scrollbar at the top that follows your progress
    animations?: boolean; // animations that show up at the start
    autoRepeatDelay?: number; // amount of delay in between repeats
};

export const Slider = ({ children, className = '', tooltip, pagination = true, buttons = true, scrollbar = true, animations = true, autoRepeatDelay = 0 }: Props) => {
    const sliderContainer = useRef<HTMLDivElement>(null);
    const [data, mouse, dispatchData, dispatchMouse] = useSliderData(children, sliderContainer, autoRepeatDelay);

    return ( 
        <SliderContext.Provider value={[data, dispatchData]}>
            <div className={`slider ${className}`}
            onMouseDown={(e) => dispatchMouse({ type: 'down', e: e })} onTouchStart={(e) => dispatchMouse({ type: 'down', e: e })}
            onMouseMove={(e) => dispatchMouse({ type: 'move', e: e })} onTouchMove={(e) => dispatchMouse({ type: 'move', e: e })}
            onMouseUp={() => dispatchMouse({ type: 'up' })} onMouseLeave={() => dispatchMouse({ type: 'up' })} onTouchEnd={() => dispatchMouse({ type: 'up' })} 
            ref={sliderContainer}>
                <motion.div className='slider-elements'
                    animate={{ x: `${-1 * mouse.translateX}%` }}
                    transition={{ duration: mouse.isDragging ? 0 : 0.6, ease: 'easeInOut' }}>

                    { data.elements.map((element, i) => (
                        <motion.div key={i} className='slider-element'
                        animate={{ x: `-${data.current * 100}%`}}
                        transition={{ duration: 0.6, ease: 'circInOut' }}>
                            { element }
                        </motion.div>
                    ))}
                </motion.div>

                { pagination && <Pagination animations={animations}/>}
                { buttons && <Buttons animations={animations}/> }
                { scrollbar && <Scrollbar animations={animations}/> }
                { tooltip && <p className='slider-tooltip'>{tooltip}</p> }
            </div>
        </SliderContext.Provider>
    )
}