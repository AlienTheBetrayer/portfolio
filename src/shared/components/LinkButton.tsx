import './Button.css';
import './LinkButton.css';
import { Link } from 'react-router-dom';

interface Props {
    className?: string;
    children?: React.ReactNode;
    to?: string;
    behavior?: 'smooth' | 'instant';
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const LinkButton = ({ className = '', children, onClick, to = '/home', behavior = 'smooth' }: Props) => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        window.scrollTo({ left: 0, top: 0, behavior: behavior });
        onClick?.(e);
    }

    return (
        <Link className={`button link-button ${className}`} to={to} onClick={e => handleScroll(e)}>
            { children }
        </Link>
    )
}