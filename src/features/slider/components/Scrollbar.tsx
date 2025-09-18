import { useSliderContext } from '../contexts/SliderContext';
import './Scrollbar.css';
import { motion } from "motion/react"

type Props = {
    animations?: boolean;
}

export const Scrollbar = ({ animations }: Props) => {
    const [data,] = useSliderContext();

    return (
        <motion.div className='scrollbar'
        initial={{ scaleX: animations ? 1 : 0, left: 0}}
        animate={{ scaleX: data.current / (data.elements.length - 1) }}
        transition={{ duration: 0.6, ease: 'circInOut' }}/>
    )
}