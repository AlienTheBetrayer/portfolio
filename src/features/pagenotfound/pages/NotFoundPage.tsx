import './NotFoundPage.css';
import { Page } from "../../layout/components/Page"
import { LinkButton } from '../../../shared/components/LinkButton';

export const NotFoundPage = () => {
    return (
        <Page className='notfound-page'>
            <section className='notfound-mainsection gap'>
                <h1>404</h1>
                <h2>You probably shouldn't be here..</h2>
                <LinkButton to='/home' className='notfound-gobackbutton'>Go back home</LinkButton>
            </section>
        </Page>
    )
}