import './InteractiveSubsection.css'

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { useBackgroundOverlay } from "../../../shared/hooks/useBackgroundOverlay";
import { SelectButton } from "../../../shared/components/SelectButton";
import { HomeCanvas } from "../components/HomeCanvas";
import { Button } from "../../../shared/components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { type DispatchType, type StoreType } from '../../../shared/redux/store';
import { selectedFigureSlice } from '../../../shared/redux/slices/selectedFigure';


export const InteractiveSubsection = ({ loaded }: { loaded: boolean }) => {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const backgroundOverlay = useBackgroundOverlay();
    const selectedFigure = useSelector((state: StoreType) => state.selectedFigure.value);
    const selectedFigureDispatch = useDispatch<DispatchType>();
    
    const figures = [
        {
            visual: '◍',
            name: 'sphere'
        },
        {
            visual : '◎',
            name: 'torus'
        }, 
        {
            visual : '▧',
            name: 'cube'
        },
        {
            visual : '▲',
            name: 'triangle'
        },
        {
            visual: '∅',
            name: 'none'
        }
    ];


    useEffect(() => {
        backgroundOverlay.setShown(isFullscreen);
    }, [isFullscreen]);

    return (
        <motion.section
        className={`interactive-section ${isFullscreen ? 'fullscreen-interactive-section' : ''}`}
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: loaded ? 0 : 4.6, duration: 0.7, ease: 'circOut' }}>
            <>
                <div className={`${isFullscreen ? 'interactive-figure-settings-fullscreen' : 'interactive-figure-settings'}`}>
                    <SelectButton className='interactive-figure-select' items={[...figures.map(figure => figure.visual)]} 
                    value={selectedFigure} onSelect={(idx: number) => selectedFigureDispatch(selectedFigureSlice.actions.set(idx)) }/>
                </div>
                
                { isFullscreen && 
                    <div className='flex-col left-2 bottom-2 absolute'>
                        <p>Right Click to move</p>
                        <p>Scroll / Pinch to zoom</p>
                    </div>
                }

                <Button className='right-0 top-0 absolute interactive-fullscreen-button' onClick={() => { setIsFullscreen(prev => !prev) }}>⛶</Button>
                <p className='right-4 bottom-2 absolute'>Drag to rotate</p>

                <HomeCanvas fullscreen={isFullscreen} figure={figures[selectedFigure].name}/>

                { backgroundOverlay.render() }
            </>
        </motion.section>
    )
}