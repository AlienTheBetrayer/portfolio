import './Pagination.css';

import { motion } from 'motion/react';
import { useSliderContext } from '../contexts/SliderContext';

interface Props {
    animations?: boolean;
}

export const Pagination = ({animations}: Props) => {
    const [data, dispatchData] = useSliderContext();

    return ( 
        <motion.div className='pagination'
            initial={animations && { x: '-50%', y: 100 }}
            animate={{ x: '-50%', y: 0 }}
            transition={{duration: animations ? 0.7 : 0, ease: 'circInOut'}}>
            { Array.from({ length: data.elements.length }).map((_, i) => (
                <button key={i} onClick={() => dispatchData({type: 'jump', to: i})} className={`pagination-element ${i == data.current ? 'pagination-element-current' : ''}`}/>
            ))}            
        </motion.div>
    )
}