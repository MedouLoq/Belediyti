import React from 'react';

const ReportStatusBadge = ({ status }) => {
    const statusStyles = {
        PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
        FIXED: 'bg-green-100 text-green-800 border-green-300',
        RESOLVED: 'bg-green-100 text-green-800 border-green-300', // Same as FIXED often
        REJECTED: 'bg-red-100 text-red-800 border-red-300',
        CLOSED: 'bg-gray-100 text-gray-800 border-gray-300',
        // Add more statuses as needed
    };

    const defaultStyle = 'bg-gray-100 text-gray-800 border-gray-300';
    const style = statusStyles[status?.toUpperCase()] || defaultStyle;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
            {status ? status.replace('_', ' ').toUpperCase() : 'UNKNOWN'}
        </span>
    );
};

export default ReportStatusBadge;