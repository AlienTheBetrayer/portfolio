import './Today.css';
import { Button } from "../../../shared/components/Button";
import { RenderElements } from "../utils/RenderElements";
import type { SectionProps } from "../utils/SectionProps";

export const Today = ({ id, title, ref }: SectionProps) => {
    const elements = [
        {
            title: '⌛ So, what is happening today? 🌀',
            description: 'Now, with all of my versatile, extensive and deep background I am ready to build modern, maintainable, fast, high-grade Web apps that the whole world will see and use on a daily basis. Let\'s do it together! ',
            subTitle: 'Ready to Build and Deploy',
            subDescription: ''
        }
    ];

    return (
        <section id={id} ref={ref}>
            <h2 className='text-center'>{ title }</h2>
            <RenderElements elements={elements}/>

            <h2 className='text-center'>There's more history to be written...</h2>
            <Button className='today-goback' onClick={() => window.scrollTo({behavior: 'smooth', top: 0})}>Go back</Button>
        </section>
    )
}