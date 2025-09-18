import { motion } from "motion/react";

interface Props {
    children?: React.ReactNode;
    className?: string;
    y?: number;
    duration?: number;
    amount?: number;

    ready?: boolean;
}

export const RevealingContainer = ({ children, className = '', y = 100, duration = 0.8, amount = 0.05, ready = true, ...rest }: Props) => {
    return (
        <motion.div className={className}
            initial={{ y: y, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: duration }}
            viewport={{ amount: amount, once: true }} {...rest}>
                { children }
        </motion.div>
    )
}