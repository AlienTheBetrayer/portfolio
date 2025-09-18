import './PhilosophyPopup.css';
import { Card } from "../../card/components/Card"

interface Props {
    description?: string;
    title?: string;
    onExit?: () => void;
}

export const PhilosophyPopup = ({ description, title, onExit }: Props) => {
    return (
        <Card className='philosophy-popup' title={title} description={description} centerFocus={false} topbarButtonText='Back ✕' topbarButtonCallback={() => onExit?.()}/>
    )
}