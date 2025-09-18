import { RevealingContainer } from '../../../shared/components/RevealingContainer';
import { UniversalLink } from '../../../shared/components/UniversalLink';
import { Slider } from '../../slider/components/Slider';
import { sliderImages } from '../assets/slider/import';
import './SliderSection.css';

export const SliderSection = () => {
    const elements = [
        {
            image: sliderImages.sliders1,
            alt: 'slider 1',
            link: 'https://github.com/AlienTheBetrayer/slider-showcase'
        },
        {
            image: sliderImages.cardAdder,
            alt: 'card adder',
            link: 'https://github.com/AlienTheBetrayer/card-adder'
        },
        {
            image: sliderImages.sliders2,
            alt: 'slider 2',
            link: 'https://github.com/AlienTheBetrayer/slider-showcase'
        },
        {
            image: sliderImages.gemini,
            alt: 'gemini recreation',
            link: 'https://github.com/AlienTheBetrayer/gemini-frontend-recreation'
        },
        {
            image: sliderImages.twitch,
            alt: 'twitch recreation',
            link: 'https://github.com/AlienTheBetrayer/twitch-frontend-recreation'
        },
        {
            image: sliderImages.sliders3,
            alt: 'slider 3',
            link: 'https://github.com/AlienTheBetrayer/slider-showcase'
        }
    ];

    return (
        <section>
            <hr/>
            <RevealingContainer className='slider-section'>
                <h1 className='text-center'>Previous projects</h1>
                <p className='text-center'>
                    My web-development journey shows clear progress: from a project barely holding together to an enterprise-ready app built with scalability, performance, and user experience at its core, while mastering advanced React patterns and TypeScript features that ensure robustness and maintainability.
                </p>

                <Slider className='home-slider' tooltip='This slider is fully custom-built from scratch.' autoRepeatDelay={5000}>
                    { elements.map(elem => (
                        <div key={elem.image} className='home-slider-element'>
                            <img className='slider-image' src={elem.image} alt={elem.alt} draggable={false}/>

                            <div className='slider-link'>
                                <UniversalLink to={elem.link}>
                                    Github
                                </UniversalLink>
                            </div>
                        </div>
                    ))}
                </Slider>
            </RevealingContainer>
        </section>
    )
}