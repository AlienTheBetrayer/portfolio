import { useRef } from 'react';
import './Card.css';
import { useInView } from 'motion/react';
import { useCardGradient } from '../hooks/useCardGradient';
import { cssVar } from '../../../shared/utils/cssVar';

import { motion } from 'motion/react';
import { Button } from '../../../shared/components/Button';

interface Props {
    className?: string;
    description?: string;
    title?: string;
    topbarButtonText?: string;

    centerFocus?: boolean;
    styleActivated?: boolean;

    inverted?: boolean;
    topbarButtonCallback?: () => void;
}

export const Card = ({ className = '', inverted = false, styleActivated = true, description, centerFocus = true, title, topbarButtonText, topbarButtonCallback }: Props) => {
    const cardRef = useRef<HTMLElement>(null);
    const isCentered: boolean = useInView(cardRef, {
        margin: '-60% 0px -50% 0px'
    });

    const gradient = useCardGradient('--contactinput', '--background');

    const Topbar = () => {
        return (
            <div className='card-topbar'>
                { topbarButtonText && (
                    <Button onClick={() => topbarButtonCallback?.()}>{topbarButtonText}</Button>
                )}
            </div>
        )
    }
    return (
        !centerFocus ? (
             <article className={`${styleActivated ? 'card card-activated' : 'card'} ${className}`} style={{background: gradient, flexDirection: inverted ? 'column-reverse' : 'column'}} ref={ cardRef }>
                <Topbar/>
                <p className='card-p'>{description}</p>
                <h3 className='card-h3'>{title}</h3>
             </article>
        ) : (
            <motion.article style={{background: gradient, flexDirection: inverted ? 'column-reverse' : 'column'}} ref={ cardRef } className={`card ${className}`} 
            animate={ (isCentered) ? { scale: 1.05, borderColor: cssVar('--background6') } : { scale: 1.00, borderColor: cssVar('--background3') } }>    
                <Topbar/>
                <motion.p animate={ isCentered ? { color: cssVar('--background7') } : { color: cssVar('--background3') } }>{ description }</motion.p>
                <motion.h3 animate={ isCentered ? { color: cssVar('--foreground') } : { color: cssVar('--background4') } }> { title } </motion.h3>
            </motion.article>
        )
    )
}