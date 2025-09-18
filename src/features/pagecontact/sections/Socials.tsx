import { RevealingContainer } from "../../../shared/components/RevealingContainer";
import { UniversalLink } from "../../../shared/components/UniversalLink";
import { socialLinks } from "../../../shared/data/socialLinks";

import github from '../assets/github.svg'
import gmail from '../assets/gmail.svg';
import linkedin from '../assets/linkedin.svg';
import telegram from '../assets/telegram.svg';

export const Socials = () => {
    const socials = [
        {
            image: linkedin,
            link: socialLinks.linkedin,
            alt: 'linkedin'
        },
        { 
            image: github,
            link: socialLinks.github,
            alt: 'github'
        },
        {
            image: gmail,
            link: socialLinks.gmail,
            alt: 'gmail'
        },
        {
            image: telegram,
            link: socialLinks.telegram,
            alt: 'telegram'
        }
    ];

    return (
        <RevealingContainer>
            <section>
                <h1 className='text-center'>Socials</h1>

                <div className='socials-grid'>
                    { socials.map(social => (
                        <UniversalLink key={social.alt} to={social.link} className='socials-grid-social'>
                            <img src={social.image} alt={social.alt}/>
                        </UniversalLink>
                    ))}
                </div>
            </section>
        </RevealingContainer>
    )
}