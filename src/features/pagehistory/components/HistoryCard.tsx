import './HistoryCard.css';
import { Card } from '../../card/components/Card';

interface Props {
    title?: string;
    description?: string;
}

export const HistoryCard = ({ title, description }: Props) => {
    return (
        <Card title={title} className='history-card' inverted={true} description={description}/>
    )
}