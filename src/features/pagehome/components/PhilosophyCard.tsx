import './PhilosophyCard.css';
import { usePopup } from '../../../shared/hooks/usePopup';
import { Card } from '../../card/components/Card';
import { PhilosophyPopup } from './PhilosophyPopup';

interface Props {
    title?: string;
    description?: string;
    popupDescription?: string;
}

export const PhilosophyCard = ({ title, description, popupDescription }: Props) => {
    const popup = usePopup(<PhilosophyPopup description={popupDescription} title={title} onExit={() => popup.setShown(false)}/>, () => popup.setShown(false));
    
    return (
        <>
            { popup.render() }
            <Card title={title} description={description} topbarButtonText='Additional ⛶' topbarButtonCallback={() => popup.setShown(true)}/>
        </>
    )
}