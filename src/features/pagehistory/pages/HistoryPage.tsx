import './HistoryPage.css'
import { Page } from "../../layout/components/Page"
import { SpotlightContainer } from '../../pagehome/pages/HomePage'
import { Spotlight } from '../../../shared/components/aceternity/spotlight'

import { useEffect, useRef } from 'react'
import { useSectionObserver } from '../../../shared/hooks/useSectionObserver'
import { HistoryMenu } from '../components/HistoryMenu'
import { scrollToRef } from '../../../shared/utils/scrollToRef'
import { Scrollbar } from '../components/Scrollbar'
import { TheBeginning } from '../sections/TheBeginning'
import { Progress } from '../sections/Progress'
import { AdvancedPhase } from '../sections/AdvancedPhase'
import { WebStart } from '../sections/WebStart'
import { Today } from '../sections/Today'
import { Intro } from '../sections/Intro'
import { useSelector } from 'react-redux'
import type { StoreType } from '../../../shared/redux/store'

export const HistoryPage = () => {
    const sections = [
        {
            id: 'beginning',
            element: TheBeginning,
            ref: useRef<HTMLElement>(null),
            title: 'The Beginning 🌱' 
        },
        {
            id: 'progress',
            element: Progress,
            ref: useRef<HTMLElement>(null),
            title: 'Seeing some progress! 🚀'
        },
        {
            id: 'advanced',
            element: AdvancedPhase,
            ref: useRef<HTMLElement>(null),
            title: 'Getting advanced ⚙️'
        },
        {
            id: 'webstart',
            element: WebStart,
            ref: useRef<HTMLElement>(null),
            title: 'Web Development start 🌐'
        },
        {
            id: 'today',
            element: Today,
            ref: useRef<HTMLElement>(null),
            title: 'What about today? ⏳'
        }
    ];
    
    const loaded = useSelector((state: StoreType) => state.loaded.value);

    // automatically changing url to #section (handling both edges of a section with a hook)
    useSectionObserver(sections.map(s => s.ref));

    // scroll to a section if we opened a website with a pre-entered #hash
    useEffect(() => {
        const urlHash = window.location.hash;
        if(urlHash) {
            const sectionRef = sections.find(s => s.id == urlHash.substring(1));
            if(sectionRef) {
                const timeout = setTimeout(() => scrollToRef(sectionRef.ref), loaded ? 250 : 3250);
                return () => clearTimeout(timeout);
            }
        }
    }, []);

    return (
        <Page className='history-page' properties={{ scrollProgress: false, meteors: false }}>
            {/* spotlight effects / processing */}
            {loaded && (
                <SpotlightContainer>
                    <Spotlight className="-top-25 lg:top-0 -left-5 lg:left-0 h-full select-none"  fill="hsla(234, 31%, 37%, 1.00)"/>
                    <Spotlight className="-top-0 left-40 lg:left-0 h-400 w-250 -rotate-80 lg:rotate-90 select-none"  fill="hsla(247, 13%, 50%, 1.00)"/>
                    <Spotlight className="top-60 lg:top-500 left-0 h-300 lg:h-250 w-400 rotate-0 select-none"  fill="hsla(217, 28%, 39%, 1.00)"/>
                    <Spotlight className="top-500 lg:top-400  h-300 lg:h-250 w-400 -left-200 lg:left-0 rotate-90 select-none"  fill="hsla(229, 25%, 41%, 1.00)"/>
                    <Spotlight className="top-1000 lg:top-200 left-0 h-300 lg:h-250 w-400 rotate-0 select-none"  fill="hsla(217, 32%, 34%, 1.00)"/>
                    <Spotlight className="top-1500 lg:top-750 left-0 h-300 lg:h-250 w-400 rotate-0 select-none"  fill="hsla(208, 18%, 22%, 1.00)"/>
                    <Spotlight className="top-2500 lg:top-1000 h-300 lg:h-250 w-400 -left-200 lg:left-0 rotate-90 select-none"  fill="hsla(232, 28%, 39%, 1.00)"/>
                    <Spotlight className="top-3000 lg:top-1500 left-0 h-300 lg:h-250 w-400 rotate-0 select-none"  fill="hsla(209, 28%, 39%, 1.00)"/>
                    <Spotlight className="top-3300 lg:top-1700 h-300 lg:h-250 w-400 -left-200 lg:left-90 rotate-90 select-none"  fill="hsla(221, 30%, 43%, 1.00)"/>
                    <Spotlight className="top-3700 lg:top-2250 left-0 h-300 lg:h-250 w-400 rotate-0 select-none"  fill="hsla(221, 28%, 66%, 1.00)"/>
                </SpotlightContainer>
            )}
            <Scrollbar/>

            {/* sections */}
            <Intro/>
            <HistoryMenu sections={sections}/>

            <hr/>
            { sections.map(section => (
                <section.element key={section.id} id={section.id} ref={section.ref} title={section.title}/>
            ))}
        </Page>
    )
}