import './ContactSection.css';

import { LinkButton } from "../../../shared/components/LinkButton"
import { RevealingContainer } from "../../../shared/components/RevealingContainer"

export const ContactSection = () => {
    return (
        <section>
            <hr/>
            <RevealingContainer className='contact-section'>
                <h2>Cooperation</h2>
                <p>If you're planning a new project and need a developer who can deliver with quality and reliability, I'd be glad to help. Let's work together to bring your ideas to life.</p>
                <LinkButton to='/contact'>Contact</LinkButton>
            </RevealingContainer>
            <hr/>
        </section>
    )
}