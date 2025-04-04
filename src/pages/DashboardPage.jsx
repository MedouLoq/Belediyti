import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import Layout & Components
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import PageWrapper from '../components/layout/PageWrapper';
import StatCard from '../components/dashboard/StatCard';
import QuickActionButton from '../components/dashboard/QuickActionButton';
import ReportListItem from '../components/reports/ReportListItem'; // Create this next
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner'; // For simulated loading

// --- MOCK DATA (Replace with API fetching later) ---
const mockReports = [
    { id: 1, type: 'problem', category: 'Roads', title: 'Pothole on Main Street', status: 'PENDING', createdAt: '2023-10-26T10:00:00Z', location: 'Main St & 1st Ave' },
    { id: 2, type: 'problem', category: 'Water', title: 'Leaking fire hydrant', status: 'IN_PROGRESS', createdAt: '2023-10-25T14:30:00Z', location: 'Park Avenue' },
    { id: 3, type: 'complaint', subject: 'Delayed garbage collection', status: 'RESOLVED', createdAt: '2023-10-24T09:15:00Z', municipality: 'Municipality A' },
    { id: 4, type: 'problem', category: 'Electricity', title: 'Street light out', status: 'FIXED', createdAt: '2023-10-20T11:00:00Z', location: 'Oak Streetlamp #123' },
];

const fetchMockData = () => new Promise(resolve => {
    setTimeout(() => {
        resolve(mockReports);
    }, 1000); // Simulate 1 second loading
});
// --- END MOCK DATA ---

// Example Icons (replace)
const ProblemIcon = () => '❗';
const ComplaintIcon = () => '💬';

const DashboardPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('problems'); // 'problems' or 'complaints'
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetchMockData().then(data => {
            setReports(data);
            setIsLoading(false);
        });
    }, []);

    const filteredReports = reports.filter(report => {
        if (activeTab === 'problems') return report.type === 'problem';
        if (activeTab === 'complaints') return report.type === 'complaint';
        return false;
    });

    // Calculate stats based on fetched reports
    const stats = reports.reduce((acc, report) => {
        if (report.type === 'problem') {
            if (report.status === 'PENDING') acc.pending++;
            if (report.status === 'IN_PROGRESS') acc.inProgress++;
            if (report.status === 'FIXED' || report.status === 'RESOLVED') acc.fixed++; // Consider Resolved as fixed for stats
        }
        return acc;
    }, { pending: 0, inProgress: 0, fixed: 0 });


    const handleReportClick = (id) => {
        navigate(`/report/${id}`);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* --- Desktop Sidebar --- */}
            <div className="hidden md:flex md:flex-shrink-0">
                <Sidebar /> {/* Assuming Sidebar itself doesn't set top-0 */}
            </div>

            {/* --- Mobile Sidebar --- */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        {/* Backdrop - Starts from below Navbar */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            // Starts below the navbar, full height remaining
                            className="fixed top-16 inset-x-0 bottom-0 bg-black bg-opacity-50 z-30 md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                        {/* Sidebar Panel - Starts from below Navbar */}
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            // Position fixed, STARTING from top-16 (below navbar)
                            // Height should fill remaining screen: h-[calc(100vh-4rem)] (4rem = h-16)
                            className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-50 md:hidden shadow-lg" // <<< Changed top-0 to top-16, adjusted height
                        >
                            {/* The Sidebar component itself should NOT have height constraints like h-full
                       if it's meant to fit within this container */}
                            <Sidebar setSidebarOpen={setSidebarOpen} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>


            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <Navbar setSidebarOpen={setSidebarOpen} />

                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pt-16"> {/* Added pt-16 */}
                    <PageWrapper>
                        {/* Welcome Header */}
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
                            <p className="text-gray-600 mt-1">Here's an overview of your reports.</p>
                        </motion.div>

                        {/* Stats Section */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                <StatCard
                                    title="Pending Issues" value={stats.pending} description="Waiting for review"
                                    colorTheme={{ bg: 'bg-yellow-50', text: 'text-yellow-800', valueBg: 'bg-yellow-100' }} icon="⏳"
                                />
                                <StatCard
                                    title="In Progress" value={stats.inProgress} description="Being addressed"
                                    colorTheme={{ bg: 'bg-blue-50', text: 'text-blue-800', valueBg: 'bg-blue-100' }} icon="🛠️"
                                />
                                <StatCard
                                    title="Resolved" value={stats.fixed} description="Successfully fixed"
                                    colorTheme={{ bg: 'bg-green-50', text: 'text-green-800', valueBg: 'bg-green-100' }} icon="✅"
                                />
                            </div>
                        </motion.div>

                        {/* Quick Actions Section */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <QuickActionButton
                                        to="/report-problem" title="Report a Problem" description="Signal an issue in your area"
                                        icon={<ProblemIcon />} gradient="from-blue-500 to-blue-700"
                                    />
                                    <QuickActionButton
                                        to="/submit-complaint" title="Submit a Complaint" description="Follow up on unmet expectations"
                                        icon={<ComplaintIcon />} gradient="from-purple-500 to-purple-700"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Recent Reports Section */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                            <Card className="mt-8">
                                <div className="px-6 py-4 border-b">
                                    <h2 className="text-xl font-semibold text-gray-800">Your Recent Reports</h2>
                                </div>

                                {/* Tabs */}
                                <div className="px-6 border-b border-gray-200">
                                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                                        <button
                                            onClick={() => setActiveTab('problems')}
                                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'problems' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                        >
                                            Problems ({reports.filter(r => r.type === 'problem').length})
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('complaints')}
                                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'complaints' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                        >
                                            Complaints ({reports.filter(r => r.type === 'complaint').length})
                                        </button>
                                    </nav>
                                </div>

                                {/* Tab Content */}
                                <div className="px-6 py-4">
                                    {isLoading ? (
                                        <div className="flex justify-center items-center h-40">
                                            <LoadingSpinner />
                                        </div>
                                    ) : filteredReports.length > 0 ? (
                                        <ul className="space-y-4">
                                            {filteredReports.slice(0, 5).map((report) => ( // Show recent 5
                                                <ReportListItem key={report.id} report={report} onClick={() => handleReportClick(report.id)} />
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="text-center py-10 text-gray-500">
                                            No {activeTab} found.
                                        </div>
                                    )}

                                    {/* View All Link */}
                                    {filteredReports.length > 5 && (
                                        <div className="text-center mt-6">
                                            <Link to={`/my-reports?type=${activeTab}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                                View all {activeTab} →
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>

                    </PageWrapper>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;