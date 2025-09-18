import './HistorySubcard.css';

interface Props {
    className?: string;
    title?: string;
    description?: string;
    positioning: 'left' | 'right';
}  

export const HistorySubcard = ({ className = '', title, description, positioning }: Props) => {
    return (
        <div className={`history-page-card ${positioning == 'left' ? 'subcard-positioning-left' : 'subcard-positioning-right'} history-subcard ${className}`}>
            <h3>{ title }</h3>
            <p>{ description }</p>
        </div>
    )
}