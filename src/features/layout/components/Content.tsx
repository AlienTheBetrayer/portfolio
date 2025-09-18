import './Content.css';

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export const Content = ({ className = '', children }: Props) => {
    return (
        <div className={`content ${className}`}>
            { children }
        </div>
    )
}