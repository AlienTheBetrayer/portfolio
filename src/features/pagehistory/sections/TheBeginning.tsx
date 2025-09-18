import { RenderElements } from "../utils/RenderElements";
import type { SectionProps } from "../utils/SectionProps";

export const TheBeginning = ({ id, title, ref }: SectionProps) => {
    const elements = [
        {
            title: '🧩 Scratch 👾',
            description: 'When I was still a little kid, the first thing I have ever seen was a simple Scratch app, I tried building the most simple "apps" if you can even call them like that, but to no avail, bugs, glitches, lags, and it ultimately led me to burn out on the first week',
            subTitle: 'The start is hard',
            subDescription: 'How do I even start the app?!',
        }, 
        {
            title: '🐍 Python / Ruby Attempts 🔧',
            description: 'I had really struggled to grasp even the basic concepts, understanding how a regular for loop works was already big achievement for me. I was running around the Internet asking everyone how to make the most basic things, although for the most part they were ignoring me',
            subTitle: 'Challenges',
            subDescription: 'Arrays, For loops, ',
        },        
        {
            title: '✨ Ruby is starting to get better 💎',
            description: 'I realized how to work with arrays and basic stuff, I was still a kid, spent a lot of time developing my "games" in a console, created a version of Bomber, but if I am being honest, it was\'nt anything special, but to me, that meant the whole world',
            subTitle: 'First mini successes',
            subDescription: 'It worked!!!',
        },
        {
            title: '🕹️ Gaming phase 🎮',
            description: 'I started playing Roblox, like, a lot, but I felt as if something was missing, I still wanted to develop, I started developing games, using scripting language Lua and internal Roblox API, everything was still too hard for some reason, but I was getting better, and I was having fun!',
            subTitle: 'Creating my own mini games now',
            subDescription: 'Damn, this is getting interesting, where will it lead me to?',
        }
    ];

    return (
        <section id={id} ref={ref}>
            <h2 className='text-center'>{ title }</h2>
            <RenderElements elements={elements}/>
        </section>
    )
}