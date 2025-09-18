import './Buttons.css';

import arrow from '../assets/arrow.svg'
import { useSliderContext } from '../contexts/SliderContext';

import { motion } from 'motion/react';

interface Props {
    animations?: boolean;
}

export const Buttons = ({ animations }: Props) => {
    const [, dispatchData] = useSliderContext();

    return ( 
        <>
            <motion.button onClick={() => dispatchData({type: 'previous'})} className='buttons buttons-left'
                initial={ animations && { x: -120, y: '-50%', rotate: 180 }}
                animate={{ x: 0, y: '-50%', rotate: 180 }}
                transition={{duration: animations ? 0.7 : 0, ease: 'circInOut'}}>

                <img src={arrow} alt='left' draggable={false}/>
            </motion.button>

            <motion.button onClick={() => dispatchData({type: 'next'})} className='buttons buttons-right'
                initial={ animations && { x: 120, y: '-50%' }}
                animate={{ x: 0, y: '-50%'}}
                transition={{duration: animations ? 0.7 : 0, ease: 'circInOut'}}>
                
                <img src={arrow} alt='right' draggable={false}/>
            </motion.button>
        </>
    )
}