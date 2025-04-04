import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// --- MOCK ---
const mockNotifications = [
    { id: 101, type: 'STATUS_UPDATE', message: 'Your report #2 (Leaking fire hydrant) status changed to IN_PROGRESS.', read: false, timestamp: '2023-10-26T11:00:00Z', link: '/report/2' },
    { id: 102, type: 'NEW_MESSAGE', message: 'Admin left a comment on report #1.', read: false, timestamp: '2023-10-26T09:30:00Z', link: '/report/1' },
    { id: 103, type: 'REPORT_RESOLVED', message: 'Your complaint #3 (Delayed garbage collection) has been RESOLVED.', read: true, timestamp: '2023-10-25T15:00:00Z', link: '/report/3' },
    { id: 104, type: 'SYSTEM_ALERT', message: 'Welcome to the new Baladiyati platform!', read: true, timestamp: '2023-10-24T08:00:00Z', link: null },
];
const fetchMockNotifications = () => new Promise(resolve => setTimeout(() => resolve(mockNotifications), 600));
const markNotificationsRead = (ids) => new Promise(resolve => { console.log("Marking as read:", ids); setTimeout(resolve, 300); });
// --- END MOCK ---

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchMockNotifications().then(data => {
            setNotifications(data);
            setIsLoading(false);
        });
    }, []);

    const handleMarkAllRead = async () => {
        const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
        if (unreadIds.length === 0) return;
        // Simulate API call
        await markNotificationsRead(unreadIds);
        // Update local state
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const handleNotificationClick = async (notification) => {
        if (!notification.read) {
            await markNotificationsRead([notification.id]);
            setNotifications(notifications.map(n => n.id === notification.id ? { ...n, read: true } : n));
        }
        // Navigation is handled by Link component
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleString();

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="hidden md:flex md:flex-shrink-0"><Sidebar /></div>
            <AnimatePresence>{sidebarOpen && ( /* Mobile Sidebar */ <> {/* ... */} </>)}</AnimatePresence>
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pt-16">
                    <PageWrapper>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                            <button onClick={handleMarkAllRead} disabled={!notifications.some(n => !n.read)}
                                className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed">
                                Mark all as read
                            </button>
                        </div>

                        <Card>
                            {isLoading ? (
                                <div className="py-20 text-center"><LoadingSpinner size="lg" /></div>
                            ) : notifications.length === 0 ? (
                                <div className="py-20 text-center text-gray-500">No notifications</div>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {notifications.map(notification => (
                                        <li key={notification.id} className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50/30' : ''}`}>
                                            <Link to={notification.link || '#'} className="block" onClick={() => handleNotificationClick(notification)}>
                                                <div className="flex items-center justify-between">
                                                    <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                                                        {notification.message}
                                                    </p>
                                                    {!notification.read && (
                                                        <span className="h-2 w-2 rounded-full bg-blue-500 ml-2 flex-shrink-0"></span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-400 mt-1">{formatDate(notification.timestamp)}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Card>
                    </PageWrapper>
                </main>
            </div>
        </div>
    );
};

export default NotificationsPage;