import './PhilosophyCard.css';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { cssVar } from '../../../shared/utils/cssVar';
import { Button } from '../../../shared/components/Button';
import { usePopup } from '../../../shared/hooks/usePopup';

interface Props {
    title?: string;
    description?: string;
    popupDescription?: string;
}

interface PopupProps {
    description?: string;
    title?: string;
    onExit?: () => void;
}

const CardPopup = ({ description, title, onExit }: PopupProps) => {
    return (
        <article className='philosophy-card-popup'>
            <div className='philosophy-card-topbar'>
                <h3>{ title }</h3>
                <Button onClick={() => onExit?.()}>✕</Button>
            </div>
            <p>{ description }</p>
        </article>
    )
}

export const PhilosophyCard = ({ title, description, popupDescription }: Props) => {
    const cardRef = useRef<HTMLElement>(null);
    const isCentered: boolean = useInView(cardRef, {
        margin: '-60% 0px -50% 0px'
    });

    const popup = usePopup(<CardPopup description={popupDescription} title={title} onExit={() => popup.setShown(false)}/>, () => popup.setShown(false));

    return (
        <motion.article ref={ cardRef } className='philosophy-card' 
        animate={ isCentered ? { scale: 1.05, borderColor: cssVar('--background6') } : { scale: 1.00, borderColor: cssVar('--background3') } }>    
            <div className='philosophy-card-topbar'>
                <Button onClick={() => popup.setShown(true)}>Additional ⛶</Button>
            </div>
            
            <motion.p animate={ isCentered ? { color: cssVar('--background7') } : { color: cssVar('--background4') } }>{ description }</motion.p>
            <motion.h3 animate={ isCentered ? { color: cssVar('--foreground') } : { color: cssVar('--background5') } }> { title } </motion.h3>
        
            { popup.render() }
        </motion.article>
    )
}