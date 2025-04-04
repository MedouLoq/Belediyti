import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverEffect = false, ...props }) => {
    const baseClasses = 'bg-white rounded-xl shadow-lg overflow-hidden';
    const combinedClasses = `${baseClasses} ${className}`;

    return (
        <motion.div
            className={combinedClasses}
            whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" } : {}}
            transition={{ duration: 0.2 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;