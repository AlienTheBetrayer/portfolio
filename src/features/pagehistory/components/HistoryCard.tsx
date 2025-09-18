import { useRef } from 'react';
import './HistoryCard.css';
import { motion, useInView } from 'motion/react';
import { cssVar } from '../../../shared/utils/cssVar';

interface Props {
    title?: string;
    description?: string;
    className?: string;
}

export const HistoryCard = ({ title, className = '', description }: Props) => {
    const cardRef = useRef<HTMLElement>(null);
    const isCentered: boolean = useInView(cardRef, {
        margin: '-60% 0px -60% 0px'
    });

    return (
        <motion.article ref={cardRef} className={`history-page-card history-card ${className}`}
        animate={ isCentered ? { scale: 1.05, borderColor: cssVar('--background6') } : { scale: 1.00, borderColor: cssVar('--background4'), rotate: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}>    
            <motion.h3 transition={{ duration: 0.5, ease: 'easeInOut' }} animate={ isCentered ? { color: cssVar('--foreground') } : { color: cssVar('--background4') }} className='text-center'>{ title }</motion.h3>
            <motion.p transition={{ duration: 0.5, ease: 'easeInOut' }} animate={ isCentered ? { color: cssVar('--background6') } : { color: cssVar('--background3') }} >{ description }</motion.p>
        </motion.article>
    )
}