import { Button } from '../../../shared/components/Button';
import './HistoryMenu.css';
import { scrollToRef } from '../../../shared/utils/scrollToRef';

interface Props {
    sections: { id: string, ref: React.RefObject<HTMLElement | null>, title: string }[]
}

export const HistoryMenu = ({ sections }: Props) => {
    return (
        <section>
            <nav className='history-menu'>
                <h3 className='text-center'>Menu (click to scroll)</h3>
                
                { sections.map(section => (
                    <Button key={section.title} onClick={() => scrollToRef(section.ref)}>{ section.title }</Button>
                ))}
            </nav>
        </section>
    )
}