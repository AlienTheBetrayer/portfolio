import './Form.css';
import { RevealingContainer } from "../../../shared/components/RevealingContainer"
import { ContactForm } from "../components/ContactForm"

export const Form = () => {
    return (
        <RevealingContainer>
            <section className='contact-form-section'>
                <h1 className='text-center'>Contact</h1>
                <p className='text-center'>
                    Have an idea, a project, or just want to say hi? I'm always open to new opportunities and exciting collaborations. 
                    Drop me a message and let's build something great together!
                </p>

                <ContactForm/>
                <hr/>
            </section>
        </RevealingContainer>
    )
}