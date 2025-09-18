import { RenderElements } from "../utils/RenderElements";
import type { SectionProps } from "../utils/SectionProps";

export const WebStart = ({ id, title, ref }: SectionProps) => {
    const elements = [
        {
            title: '🚀 Web Development Start 🌍',
            description: 'I took a break from C++ and all the low level stuff, wanted to build something modern that all people could use, and considering I was already pretty good at Javascript and Typescript, I started learning CSS, HTML, it was very weird at first as it was completely different from the low level programming, but I quickly got good at it',
            subTitle: 'Look! Open localhost in your browser!',
            subDescription: 'What do you mean you don\'t see my browser? Are you joking? What...',
        },
        {
            title: '🎯 React ⚛️',
            description: 'Same thing that had happened before happened twice here, I wanted to dig deeper, to learn more, I learned React, started building tiny websites with it, incorporating libraries, you may ask what was the second thing? The rewrite arc again.. I started rewriting my website structure, really planning architecture ahead of time like a Senior',
            subTitle: 'Building everything at once',
            subDescription: ''
        },
        {
            title: '🔥 Getting good at React too 📈',
            description: 'After a couple of rewrites I\'ve come to something that I think works good, feature-based folder, single responsibility principle, logic in a separate hook, everything structurized, systematic, maintainable, something I hate my pedantic side, sometimes I love it, this is definitely the latter',
            subTitle: 'I\'m starting to like this too!',
            subDescription: 'Website building isn\'t that bad, not gonna lie..'
        },
        {
            title: '🌍 I want to build something big 🏗️',
            description: 'As with everything, I always wanted to build something bigger, something that no one has ever done, even though I had pretty much no experience compared to other people, I wanted to be the best, my portfolio is the project I wanted to showcase at my current level',
            subTitle: 'How do I progress again?',
            subdescription: '...',
        },
        {
            title: '💡 Something unique 🦄',
            description: 'Now I incorporate various animations and 3D libraries, such as Three.JS, Framer Motion, GSAP, ..., Regular CSS and HTML seemed very dull, so I wanted to take this a step further, and I am sure that great things are ahead of me and I will always try to one-up myself and improve day by day, year by year',
            subTitle: 'Damn this sphere looks good!!!',
            subDescription: 'First ever success and shock that you can do these things inside your little browser'
        }
    ];

    return (
        <section id={id} ref={ref}>
            <h2 className='text-center'>{ title }</h2>
            <RenderElements elements={elements}/>
        </section>
    )
}