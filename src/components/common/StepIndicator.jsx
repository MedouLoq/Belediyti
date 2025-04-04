import React from 'react';
import { motion } from 'framer-motion';

const StepIndicator = ({ current, total, className = '' }) => {
    return (
        <div className={`flex justify-center space-x-2 ${className}`}>
            {/* Create an array with 'total' number of elements */}
            {Array.from({ length: total }).map((_, index) => (
                <motion.div
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                        // Check if the current step matches this indicator's index (plus 1 because index is 0-based)
                        index + 1 === current ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                    // Animate the scale to make the current step slightly larger
                    animate={{ scale: index + 1 === current ? 1.3 : 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }} // Add a little bounce
                />
            ))}
        </div>
    );
};

export default StepIndicator;