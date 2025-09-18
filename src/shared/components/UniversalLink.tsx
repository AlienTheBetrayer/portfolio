import { Link } from 'react-router-dom';
import './UniversalLink.css';

interface Props {
    type?: 'router' | 'link';
    to?: string;
    behavior?: 'smooth' | 'instant';
    children?: React.ReactNode;
    className?: string;
}

export const UniversalLink = ({ type, to, children, className, behavior = 'smooth' }: Props) => {
    const handleScroll = () => {
        // if we don't have a #hash -> scroll to the top, if we do have a #hash -> scroll to the corresponding section
        if(to?.indexOf('#') == -1) {
            window.scrollTo({ left: 0, top: 0, behavior: behavior });
        } else if(to) {
            const section = document.querySelector(to.substring(to.indexOf('#'))); 
            section?.scrollIntoView({ behavior: 'smooth' });           
        }
    }

    return (
        type == 'router' ? (
            <Link onClick={() => handleScroll()} className={`universal-link ${className}`} to={to ?? '/home'}>
                { children }
            </Link>
        ) : (
            <a className={`universal-link ${className}`} href={to ?? 'https://www.google.com'} target="_blank" rel="noopener noreferrer">
                { children }
            </a>
        )
    )
}