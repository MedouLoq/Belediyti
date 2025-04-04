import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button'; // Reuse button
import { AnimatePresence, motion } from 'framer-motion';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 text-center px-4">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', duration: 0.5 }}>
                <h1 className="text-8xl font-extrabold text-blue-600 mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Oops! The page you are looking for doesn't seem to exist. It might have been moved, deleted, or maybe you just mistyped the URL.
                </p>
                <Link to="/dashboard">
                    <Button variant="primary" size="lg">Go to Dashboard</Button>
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;