import './ContactPage.css'

import { Page } from "../../layout/components/Page"
import { SpotlightContainer } from '../../pagehome/pages/HomePage'
import { Spotlight } from '../../../shared/components/aceternity/spotlight'
import { Form } from '../sections/Form'
import { Socials } from '../sections/Socials'
import { useSelector } from 'react-redux'
import type { StoreType } from '../../../shared/redux/store'

export const ContactPage = () => {
    const loaded = useSelector((state: StoreType) => state.loaded.value);
    
    return (
        <Page className='contact-page'>
            {/* spotlight effects */}
            {loaded && (
                <SpotlightContainer>
                    <Spotlight className="top-30 -left-5 w-200 h-screen select-none -rotate-5"  fill="hsla(228, 21%, 49%, 1.00)"/>
                    <Spotlight className="-top-60 left-40 lg:left-50 h-400 w-250 -rotate-80 lg:rotate-90 select-none"  fill="hsla(239, 18%, 46%, 1.00)"/>
                </SpotlightContainer>
            )}

            <Form/>
            <Socials/>
        </Page>
    )
}