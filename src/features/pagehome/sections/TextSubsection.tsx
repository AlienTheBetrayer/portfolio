import './TextSubsection.css'

import { motion } from "motion/react";
import { ContainerTextFlip } from "../../../shared/components/aceternity/containertext";
import { LinkButton } from "../../../shared/components/LinkButton";
import { logoImages } from "../assets/logos/import";

export const TextSubsection = ({ loaded }: { loaded: boolean }) => {
    const technologies = ['React', 'Typescript', 'Tailwind', 'Redux', 'HTML', 'CSS', 'Javascript'];

    return (
        <motion.section
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: loaded ? 0 : 4.6, duration: 0.7, ease: 'circOut' }}>
                <div className='home-heading'>
                    <div className='flex flex-col gap-6'>
                        <h1>I build websites</h1>
                        <div className='flex gap-4'>
                            <h1>in</h1>
                            <ContainerTextFlip words={technologies}/>
                        </div>

                        <p>
                            Over a decade of expertise — from Assembly and C++ to modern web development with React and Typescript.
                        </p>
                        <p>
                            Delivering reliable, high-performance, and thoughtfully engineered solutions.
                        </p>
                    </div>

                    <nav className='home-heading-nav'>
                        <LinkButton to='/history'>History</LinkButton>
                        <LinkButton to='/contact'>Contact</LinkButton>
                    </nav>

                    <div className='home-heading-logos'>
                        { Object.entries(logoImages).map(([key, img]) => <img key={key} src={img} alt={key}/> ) }
                    </div>
                </div>
            </motion.section>
    )
}
