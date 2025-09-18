import './HeaderMenu.css';
import { Button } from '../../../shared/components/Button';
import { LinkButton } from '../../../shared/components/LinkButton';
import { useSettingsMenu } from '../hooks/useSettingsMenu';

interface Props {
    onInteract: () => void;
}

export const HeaderMenu = ({ onInteract }: Props) => {
    const settingsMenu = useSettingsMenu(false);

    return (
        <nav className='header-menu'>
            <nav className='header-menu-nav'>
                <LinkButton onClick={() => onInteract()} to='/home'>Home</LinkButton>
                <LinkButton onClick={() => onInteract()} to='/history'>History</LinkButton>
                <LinkButton onClick={() => onInteract()} to='/contact'>Contact</LinkButton>
            </nav>

            <nav className='header-menu-nav'>
                <Button onClick={() => { settingsMenu.setShown(true); } }>Settings</Button>
                <Button onClick={() => onInteract()}>✕</Button>
            </nav>

            { settingsMenu.render() }
        </nav>
    )
}