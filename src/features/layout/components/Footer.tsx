import { UniversalLink } from '../../../shared/components/UniversalLink';
import { socialLinks } from '../../../shared/data/socialLinks';
import './Footer.css';

export const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-content'>
                <div className='footer-top'>
                    <div className='footer-description'>
                        <h4>Gleb Pichkurov</h4>
                        <p className='footer-description'>Developer driven not just by code, but by the desire to create experiences that connect with people and leave an impact.</p>
                    </div>

                    <nav className='footer-nav'>
                        <div>
                            <h4>Navigation</h4>
                            <UniversalLink type='router' to='/home'>Home</UniversalLink>
                            <UniversalLink type='router' to='/history'>History</UniversalLink>
                            <UniversalLink type='router' to='/contact'>Contact</UniversalLink>
                        </div>    
                                          
                        <div>
                            <h4>History</h4>
                            <UniversalLink type='router' to='/history#beginning'>The Beginning</UniversalLink>
                            <UniversalLink type='router' to='/history#progress'>Progress</UniversalLink>
                            <UniversalLink type='router' to='/history#advanced'>Advanced</UniversalLink>
                            <UniversalLink type='router' to='/history#webstart'>Web Start</UniversalLink>
                            <UniversalLink type='router' to='/history#today'>Today</UniversalLink>
                        </div>  

                        <div>
                            <h4>Socials</h4>
                            <UniversalLink type='link' to={socialLinks.linkedin}>Linkedin</UniversalLink>
                            <UniversalLink type='link' to={socialLinks.github}>Github</UniversalLink>
                            <UniversalLink type='link' to={socialLinks.gmail}>Gmail</UniversalLink>
                            <UniversalLink type='link' to={socialLinks.telegram}>Telegram</UniversalLink>
                        </div>  

                        <div>
                            <h4>placeholder</h4>
                            <UniversalLink type='router' to='/contact'>Home</UniversalLink>
                            <UniversalLink type='router' to='/contact'>History</UniversalLink>
                            <UniversalLink type='router' to='/contact'>Skillset</UniversalLink>
                            <UniversalLink type='router' to='/contact'>Contact</UniversalLink>
                        </div>  
                    </nav>
                </div>

                <hr/>

                <div className='footer-bottom'>
                    <p>
                        © {new Date().getFullYear()} Gleb Pichkurov. All rights reserved | Built with ⚛️ + 🟦
                    </p>

                    <div className='footer-bottom-terms'>
                        <UniversalLink type='link'>Terms</UniversalLink>
                        <UniversalLink type='link'>Privacy</UniversalLink>
                        <UniversalLink type='link'>Compliances</UniversalLink>
                    </div>
                </div>
            </div>
        </footer>
    )
}