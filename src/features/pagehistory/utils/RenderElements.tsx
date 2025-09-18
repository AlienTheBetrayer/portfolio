import { RevealingContainer } from "../../../shared/components/RevealingContainer"
import { HistoryCard } from "../components/HistoryCard"
import { HistorySubcard } from "../components/HistorySubcard"

export const RenderElements = ({ elements }: { elements: any[] }) => {
    return (
        <div className='history-cards'>
            { elements.map((elem, idx) => (
                <RevealingContainer className='history-card-revealing-container' key={elem.title}>
                    <div className='history-card-container'>
                        <HistoryCard title={elem.title} description={elem.description}/>
                        <HistorySubcard title={elem.subTitle} description={elem.subDescription} positioning={(idx % 2 == 0 ? 'left' : 'right') as 'left' | 'right'}/>
                    </div>
                    { idx != elements.length - 1 && ( <div className='history-card-decoration'>↓</div>)}
                </RevealingContainer>
            ))}
            <hr/>
        </div>
    )
}