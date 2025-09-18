import { Card } from '../../card/components/Card';
import './HistorySubcard.css';

interface Props {
    title?: string;
    description?: string;
    positioning: 'left' | 'right';
}  

export const HistorySubcard = ({ title, description, positioning }: Props) => {
    return (
        <Card title={title} description={description} styleActivated={false} centerFocus={false} className={`history-page-card ${positioning == 'left' ? 'subcard-positioning-left' : 'subcard-positioning-right'} history-subcard`}/>
    )
}