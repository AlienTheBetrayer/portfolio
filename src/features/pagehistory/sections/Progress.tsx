import { RenderElements } from "../utils/RenderElements";
import type { SectionProps } from "../utils/SectionProps";

export const Progress = ({ id, title, ref }: SectionProps) => {
    const elements = [
        {
            title: '🛠️ C# development 🎵',
            description: 'After playing around with Python, Ruby and Lua for a minute, I realized that I can do something more, something harder, something actually useful in a real world, and then I had stumbled upon a C# Youtube course, back then it was a very rare sighting to see one, so I was lucky, I started absorbing it, fell in love with the more complex language',
            subTitle: 'This is getting easy!',
            subDescription: 'Okay, now I\'m actually buidling something... This might be a thing!',
        }, 
        {
            title: '🤯 First JS Encounter 🌐',
            description: 'I started talking a lot with my friends in Discord, built a lot of communities and brought a lot of people together, something was missing again.. I needed to bring development again, and I did it! I started developing and building Discord bots, using Javascript and Discord.JS library',
            subTitle: 'Feeling like a developer now..',
            subDescription: 'Started to use Typescript and Javascript in my work as my main tools'
        },
        {
            title: '🧭 Programming style development 🎨',
            description: 'At this time I started building my own "style" of programming if you can call it like that, no matter the knowledge level I was at, I tried to make everything as maintainable as possible, sometimes even rewriting my whole app 2-3 times, just to make it more clear and professional, though at that time it was very hard...',
            subTitle: 'Programming pedantism at its finest',
            subDescription: 'Do I even like my apps anymore? I genuinely don\'t know...'
        },
        {
            title: '🎯 This is for sure my style ✅',
            description: 'I started rewriting everything and to this day I look at everything from a position "Can I rewrite this?"(even though I know it\'s not optimal), but finding a balance in this area could be the greatest thing in my programming career as it can skyrocket my code quality, and it did.',
            subTitle: 'I need to get better.. Fast!',
            subDescription: 'First glimpse of fire within me that pushes me to pursue excellence'
        }
    ];

    return (
        <section id={id} ref={ref}>
            <h2 className='text-center'>{ title }</h2>
            <RenderElements elements={elements}/>
        </section>
    )
}