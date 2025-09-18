import './HomePage.css';

import { Page } from "../../layout/components/Page"
import { Spotlight } from '../../../shared/components/aceternity/spotlight';
import { cn } from '../../../shared/components/aceternity/lib';
import { ContactSection } from '../sections/ContactSection';
import { PhilosophySection } from '../sections/PhilosophySection';
import { TextSubsection } from '../sections/TextSubsection';
import { InteractiveSubsection } from '../sections/InteractiveSubsection';
import { SliderSection } from '../sections/SliderSection';
import { useSelector } from 'react-redux';
import type { StoreType } from '../../../shared/redux/store';

interface SpotlightContainerProps {
    children?: React.ReactNode;
    className?: string;
}

export const SpotlightContainer = ({ children, className } : SpotlightContainerProps) => {
    return (
        <div className={cn('w-screen h-screen absolute select-none spotlight-container', className)}>
            { children }
        </div>
    )
}

export const HomePage = () => {
    const loaded = useSelector((state: StoreType) => state.loaded.value);

    return (
        <Page className='home-page relative'>
            {/* texture / loading animation / meteors */}
            {/* spotlight effects */}
            {loaded && (
                <SpotlightContainer>
                    <Spotlight className="-top-25 lg:top-0 -left-5 lg:left-0 h-full select-none"  fill="hsla(240, 14%, 49%, 1.00)"/>
                    <Spotlight className="top-60 lg:top-0 left-5 lg:left-1/2 h-300 lg:h-250 w-400 rotate-5 select-none"  fill="hsla(239, 25%, 47%, 1.00)"/>
                    <Spotlight className="-top-90 left-40 lg:left-50 h-400 w-250 -rotate-80 lg:rotate-90 select-none"  fill="hsla(239, 50%, 47%, 1.00)"/>
                </SpotlightContainer>
            )}

            {/* all sections sorted */}
            <div className='home-sections'>
                <TextSubsection loaded={loaded}/>
                <InteractiveSubsection loaded={loaded}/>
            </div>

            <PhilosophySection/>
            <SliderSection/>
            <ContactSection/>
        </Page>
    )
}