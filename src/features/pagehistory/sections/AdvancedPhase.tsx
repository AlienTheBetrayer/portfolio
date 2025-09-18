import { RenderElements } from "../utils/RenderElements";
import type { SectionProps } from "../utils/SectionProps";

export const AdvancedPhase = ({ id, title, ref }: SectionProps) => {
    const elements = [
        {
            title: '🤖 How C++ met me 💥',
            description: 'I was browsing Youtube the other day and I had stumbled upon a video where someone was hacking games, getting infinite points, XP, mana, anything! I was amazed! How?! I was trying to figure out how, but again, to no avail, none of my tools that I had in my belt could help me, I needed to dig deeper',
            subTitle: 'Forget about this getting easy',
            subDescription: 'Jesus Christ, what is happening?',
        },
        {
            title: '🔩 C++ Progress 📈',
            description: 'I really liked the idea of programming at a low level, although it was extremely hard, I was fighting, the fire within me to pursue the impossible was there more than ever, it pushed me to learn all the difficult things about this language, all the low level, all the memory',
            subTitle: 'Starting to see it all clear',
            subDescription: 'What\'s next?'
        },
        {
            title: '🔐 Assembly 🧮',
            description: 'I started getting decent at C++ and really wanted to go even deeper, I wanted to reverse engineer games, apps, all the memory stuff, learned Assembly, interacted with it, wrote my own cheats(not anything illegal), started using disassemblers and other memory tools like IDA and x64dbg',
            subTitle: 'This now feels like a dream! Dopamine!',
            subDescription: 'This really excites me'
        },
        {
            title: '⚔️ C++ Mastery 🏆',
            description: 'At that point, I wanted to know everything, every single new official library feature, every update, everything, I started writing my own libraries, something clicked, something didn\'t, the thing that didn\'t - got rewritten, built my own Console Engine, built multiple advanced libraries',
            subTitle: 'Now I am really building some shit',
            subDescription: ''
        }
    ];

    return (
        <section id={id} ref={ref}>
            <h2 className='text-center'>{ title }</h2>
            <RenderElements elements={elements}/>
        </section>
    )
}