import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/common/Card';
import ReportStatusBadge from '../components/reports/ReportStatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { AnimatePresence, motion } from 'framer-motion';

// --- MOCK ---
const fetchMockReportDetails = (id) => new Promise((resolve, reject) => {
    console.log("Fetching details for ID:", id);
    setTimeout(() => {
        const report = mockReports.find(r => r.id.toString() === id.toString()); // Use mock data from dashboard
        if (report) {
            // Add more details if needed for this view
            report.details = "This is a more detailed description fetched for the report. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
            report.updates = [
                { timestamp: '2023-10-26T11:00:00Z', status: 'IN_PROGRESS', comment: 'Assigned to Roads Department.' },
                { timestamp: '2023-10-26T10:05:00Z', status: 'PENDING', comment: 'Report Received.' }
            ];
            report.photoUrl = report.category === 'Roads' ? 'https://via.placeholder.com/400x300.png?text=Pothole+Image' : null;
            resolve(report);
        } else {
            reject(new Error("Report not found"));
        }
    }, 800);
});
const mockReports = [ // Copied from Dashboard for easy access
    { id: 1, type: 'problem', category: 'Roads', title: 'Pothole on Main Street', status: 'PENDING', createdAt: '2023-10-26T10:00:00Z', location: 'Main St & 1st Ave' },
    { id: 2, type: 'problem', category: 'Water', title: 'Leaking fire hydrant', status: 'IN_PROGRESS', createdAt: '2023-10-25T14:30:00Z', location: 'Park Avenue' },
    { id: 3, type: 'complaint', subject: 'Delayed garbage collection', status: 'RESOLVED', createdAt: '2023-10-24T09:15:00Z', municipality: 'Municipality A' },
    { id: 4, type: 'problem', category: 'Electricity', title: 'Street light out', status: 'FIXED', createdAt: '2023-10-20T11:00:00Z', location: 'Oak Streetlamp #123' },
];
const formatDate = (dateString) => new Date(dateString).toLocaleString(); // Simple format
// --- END MOCK ---


const ReportDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setError('');
        fetchMockReportDetails(id)
            .then(data => setReport(data))
            .catch(err => setError(err.message))
            .finally(() => setIsLoading(false));
    }, [id]);

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="hidden md:flex md:flex-shrink-0"><Sidebar /></div>
            <AnimatePresence>{sidebarOpen && ( /* Mobile Sidebar */ <> {/* ... */} </>)}</AnimatePresence>
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pt-16">
                    <PageWrapper>
                        <div className="mb-4">
                            <Button onClick={() => navigate(-1)} variant="secondary" size="sm">← Back</Button>
                        </div>

                        {isLoading && <div className="text-center py-10"><LoadingSpinner size="lg" /></div>}
                        {error && <Card className="p-6 text-center text-red-600 bg-red-50">Error: {error}</Card>}

                        {!isLoading && !error && report && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Card>
                                    <div className="px-6 py-4 border-b flex justify-between items-center">
                                        <h1 className="text-xl font-bold text-gray-800">
                                            {report.type === 'problem' ? `Problem: ${report.title}` : `Complaint: ${report.subject}`} (ID: #{report.id})
                                        </h1>
                                        <ReportStatusBadge status={report.status} />
                                    </div>
                                    <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Column 1: Basic Info */}
                                        <div className="md:col-span-2 space-y-4 text-sm">
                                            {report.type === 'problem' && (
                                                <p><strong className="text-gray-600">Category:</strong> {report.category}</p>
                                            )}
                                            <p><strong className="text-gray-600">Reported on:</strong> {formatDate(report.createdAt)}</p>
                                            {report.type === 'problem' && (
                                                <p><strong className="text-gray-600">Location:</strong> {report.location}</p>
                                            )}
                                            {report.type === 'complaint' && (
                                                <p><strong className="text-gray-600">Municipality:</strong> {report.municipality}</p>
                                            )}
                                            <div className="pt-2">
                                                <strong className="text-gray-600 block mb-1">Description:</strong>
                                                <p className="text-gray-800 bg-gray-50 p-3 rounded border">{report.details || 'No detailed description provided.'}</p>
                                            </div>
                                            {report.photoUrl && (
                                                <div className="pt-2">
                                                    <strong className="text-gray-600 block mb-1">Attached Photo:</strong>
                                                    <img src={report.photoUrl} alt="Report" className="max-w-sm rounded border shadow-sm" />
                                                </div>
                                            )}
                                        </div>
                                        {/* Column 2: Updates/History */}
                                        <div className="md:col-span-1 space-y-4">
                                            <h2 className="text-md font-semibold text-gray-700 border-b pb-1">Updates</h2>
                                            {report.updates && report.updates.length > 0 ? (
                                                <ul className="space-y-3">
                                                    {report.updates.map((update, index) => (
                                                        <li key={index} className="text-xs border-l-2 pl-3 border-blue-200">
                                                            <p className="font-medium"><ReportStatusBadge status={update.status} /></p>
                                                            <p className="text-gray-600 mt-0.5">{update.comment}</p>
                                                            <p className="text-gray-400 mt-0.5">{formatDate(update.timestamp)}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-xs text-gray-500 italic">No updates yet.</p>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </PageWrapper>
                </main>
            </div>
        </div>
    );
};

export default ReportDetailsPage;