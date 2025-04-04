import React from 'react';
import { motion } from 'framer-motion';
import ReportStatusBadge from './ReportStatusBadge';

// Helper to format date (consider using a library like date-fns later)
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
        return 'Invalid Date';
    }
};

// Example Icons
const RoadIcon = () => '🛣️';
const WaterIcon = () => '💧';
const ComplaintIconMini = () => '💬';
const DefaultIcon = () => '📋';

const ReportListItem = ({ report, onClick }) => {

    const getIcon = (report) => {
        if (report.type === 'complaint') return <ComplaintIconMini />;
        switch (report.category?.toLowerCase()) {
            case 'roads': return <RoadIcon />;
            case 'water': return <WaterIcon />;
            // Add other categories
            default: return <DefaultIcon />;
        }
    };

    return (
        <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ backgroundColor: "#f9fafb", scale: 1.01 }} // Use Tailwind's gray-50
            transition={{ duration: 0.2 }}
            className="block p-4 border rounded-lg hover:shadow-sm cursor-pointer bg-white"
            onClick={onClick}
        >
            <div className="flex items-center justify-between space-x-4">
                {/* Icon & Title */}
                <div className="flex items-center min-w-0">
                    <span className="text-xl mr-3">{getIcon(report)}</span>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {report.type === 'problem' ? report.title : report.subject || 'Complaint'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            {report.type === 'problem' ? `Category: ${report.category || 'N/A'}` : `Municipality: ${report.municipality || 'N/A'}`}
                        </p>
                    </div>
                </div>

                {/* Status & Date */}
                <div className="flex-shrink-0 flex flex-col items-end space-y-1">
                    <ReportStatusBadge status={report.status} />
                    <p className="text-xs text-gray-400">{formatDate(report.createdAt)}</p>
                </div>
            </div>
        </motion.li>
    );
};

export default ReportListItem;