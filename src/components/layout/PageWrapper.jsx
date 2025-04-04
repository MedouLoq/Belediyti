import React from 'react';

// A simple wrapper to provide consistent padding/max-width for page content
const PageWrapper = ({ children, className = '' }) => {
    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
            {children}
        </div>
    );
};

export default PageWrapper;