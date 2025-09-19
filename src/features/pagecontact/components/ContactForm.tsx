import { useState } from 'react';
import './ContactForm.css'

import { motion } from 'motion/react'
import { cssVar } from '../../../shared/utils/cssVar';
export const ContactForm = () => {
    const [isInputSelected,] = useState<boolean>(false);

    return (
        <motion.div className='contact-form'
        animate={ isInputSelected ? { borderColor: cssVar('--background5') } : { borderColor: cssVar('--background4')} }>
            <h3>Collaboration form</h3>

            <form action="mailto:your@email.com" method="post" encType="text/plain">
                <input className='contact-form-input' placeholder='Name' required type="text" name="name"/>
                <input className='contact-form-input' placeholder='Email' required type="text" name="email"/>
                <textarea placeholder='Message' required name="content"/>
                
                <input className='contact-form-submit' type="submit" value="Send"/>
            </form>
        </motion.div>
    )
}