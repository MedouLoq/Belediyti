import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card'; // Use the common Card component

const StatCard = ({ title, value, description, icon, colorTheme }) => {
    // colorTheme example: { bg: 'bg-blue-50', text: 'text-blue-800', valueBg: 'bg-blue-100' }
    const theme = colorTheme || { bg: 'bg-gray-50', text: 'text-gray-800', valueBg: 'bg-gray-100' };

    return (
        <motion.div whileHover={{ y: -5 }}>
            <Card className={`${theme.bg} p-5 shadow-sm`}>
                <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-medium ${theme.text}`}>{title}</h3>
                    <span className={`${theme.valueBg} ${theme.text} py-1 px-3 rounded-full font-bold text-sm`}>
                        {value}
                    </span>
                </div>
                <p className={`mt-2 text-sm ${theme.text} opacity-80`}>{description}</p>
                {icon && <div className={`mt-3 text-3xl ${theme.text} opacity-50`}>{icon}</div>}
            </Card>
        </motion.div>
    );
};

export default StatCard;