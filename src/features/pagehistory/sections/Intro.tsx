import './Intro.css'

import { motion } from 'motion/react'

export const Intro = () => {
    return (
        <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className='intro-section'>
            <h1 className='text-center'>History</h1>
            <p className='text-center history-heading-p'>
                This page presents a clear overview of my journey as a developer, highlighting the progression of my skills, learning process, and recent projects. 
                It showcases how my experience has evolved over time and provides insight into the approach, dedication, and creative problem-solving that I bring to every project.
            </p>
            <p className='text-center history-heading-p'>
                By sharing this progression, I aim to give a transparent view of not just the technologies I've learned, but the principles and mindset that guide my work. 
                It reflects a commitment to growth, adaptability, and creating solutions that balance technical precision with user-focused design.
            </p>
        </motion.section>
    )
}