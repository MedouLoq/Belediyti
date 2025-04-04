import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../common/Card'; // Use Card for consistency

const QuickActionButton = ({ to, title, description, icon, gradient }) => {
    // gradient example: "from-blue-500 to-blue-700"
    const bgGradient = gradient || "from-gray-500 to-gray-700";

    return (
        <Link to={to}>
            <motion.div
                whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.98 }}
            >
                <Card className={`bg-gradient-to-r ${bgGradient} text-white p-5 shadow-md flex items-center justify-between`}>
                    <div>
                        <h3 className="text-lg font-medium">{title}</h3>
                        <p className="opacity-80 text-sm mt-1">{description}</p>
                    </div>
                    {icon && <div className="text-2xl opacity-90">{icon}</div>}
                </Card>
            </motion.div>
        </Link>
    );
};

export default QuickActionButton;