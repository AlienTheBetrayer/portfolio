import './PhilosophySection.css'

import { Spotlight } from "../../../shared/components/aceternity/spotlight";
import { RevealingContainer } from "../../../shared/components/RevealingContainer";
import { SpotlightContainer } from "../pages/HomePage";
import { PhilosophyCard } from "../components/PhilosophyCard";

export const PhilosophySection = () => {
    const hardCards = [
    {
        title: 'Maintainability',
        description: 'I write organized, readable code that\'s easy to understand, debug, and extend for future projects.',
        popupDescription: 'Maintainable code is crucial for long-term project success. I structure components logically, use consistent naming conventions, and enforce clear separation of concerns. This makes debugging easier, onboarding faster for new developers, and allows future features to be added without massive refactoring.'
    },
    {
        title: 'Responsiveness',
        description: 'I ensure interfaces adapt seamlessly across all devices and screen sizes for a consistent user experience.',
        popupDescription: 'Responsiveness goes beyond layout adjustments. I implement fluid grids, flexible images, and adaptive typography using modern CSS techniques like Flexbox, Grid, and media queries. I also ensure touch-friendly interactions and cross-browser consistency to deliver a seamless experience on every device.'
    },
    {
        title: 'Scalability',
        description: 'I structure applications so they can grow efficiently, handling more features and users without breaking.',
        popupDescription: 'Scalable applications are designed to grow with the business. I use modular architecture, reusable components, single responsibility principle, all the modern techniques to ensure the workflow is consistent and ready to be built upon into something majestic.'
    },
    {
        title: 'User Experience',
        description: 'I design and implement interfaces that are intuitive, engaging, and easy to navigate.',
        popupDescription: 'UX design is about minimizing friction and maximizing clarity. I focus on information hierarchy, consistent interactions, meaningful feedback, and smooth transitions. '
    },
    {
        title: 'Accessibility',
        description: 'I follow best practices to make my websites usable for everyone, including keyboard and screen reader users.',
        popupDescription: 'Accessibility ensures inclusivity. I implement semantic HTML, keyboard navigation, and proper color contrast. Testing with screen readers and assistive tools guarantees that websites are usable by all users, improving usability, reach, and SEO.'
    },
    {
        title: 'Reusability / Clean Code',
        description: 'I write modular, reusable components and maintain clean, readable code that other developers can easily work with.',
        popupDescription: 'Reusable and clean code reduces technical debt and improves team efficiency. I follow DRY principles, abstract repeated logic, document components, and structure props/state consistently. This enables teams to iterate faster and maintain the codebase at scale.'
    }
    ];

    const softCards = [
    {
        title: 'English Fluency',
        description: 'I communicate clearly and effectively in English, both in writing and verbally, ensuring smooth remote collaboration.',
        popupDescription: 'Effective English communication is vital for remote teams. I can explain technical concepts clearly, provide constructive feedback, write documentation, and collaborate asynchronously across tools like Slack, GitHub, Email, anything.'
    },
    {
        title: 'Project Leadership',
        description: 'I take ownership of projects, from planning to delivery, guiding the workflow and making decisions independently.',
        popupDescription: 'Project leadership involves planning, prioritizing tasks, and managing timelines. I break down complex problems, coordinate workflows, guide junior developers. Every project I\'ve made I built entirely by myself, starting from designing and planning to developing the maintainable architecture and ultimately coding the entire Front-End.'
    },
    {
        title: 'Adaptability',
        description: 'I quickly learn new tools and frameworks and adjust to changing requirements without slowing down development.',
        popupDescription: 'Adaptability is key in fast-moving tech environments. I research new technologies quickly, implement them in projects, and pivot approaches when requirements change, maintaining productivity and project quality even under shifting conditions.'
    }
    ];

    return (
        <section>
            <hr/>
            <RevealingContainer className='philosophy-section'>
                <SpotlightContainer>
                    <Spotlight className="top-25 lg:top-0 -left-5 lg:left-0 w-400 h-full select-none"  fill="hsla(240, 14%, 49%, 0.50)"/>
                    <Spotlight className="-top-90 left-40 lg:left-50 h-300 w-450 lg:top-30 -rotate-80 lg:rotate-90 select-none"  fill="hsla(239, 50%, 47%, 0.53)"/>
                </SpotlightContainer>

                <SpotlightContainer className='top-1100 lg:top-700'>
                    <Spotlight className=" lg:bottom-90 left-30 lg:left-300 h-300 lg:h-250 w-300 select-none"  fill="hsla(239, 25%, 47%, 0.51)"/>
                </SpotlightContainer>


                <h2 className='text-center'>My work philosophy</h2>

                <h3 className='text-center'>Engineering skills</h3>
                <div className='philosophy-cards-grid'>
                    { hardCards.map(card => (
                        <PhilosophyCard key={card.title} title={card.title} description={card.description} popupDescription={card.popupDescription}/>
                    ))}
                </div>

                <h3 className='text-center'>Personal qualities</h3>
                <div className='philosophy-cards-grid'>
                    { softCards.map(card => (
                        <PhilosophyCard key={card.title} title={card.title} description={card.description} popupDescription={card.popupDescription}/>
                    ))}
                </div>
            </RevealingContainer>
        </section>
    )
}