import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import PageWrapper from '../components/layout/PageWrapper';
import SubmitComplaintForm from '../components/reports/SubmitComplaintForm';
import { AnimatePresence, motion } from 'framer-motion';

const SubmitComplaintPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="hidden md:flex md:flex-shrink-0"><Sidebar /></div>
            <AnimatePresence>{sidebarOpen && ( /* Mobile Sidebar */ <> {/* ... */} </>)}</AnimatePresence>
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pt-16">
                    <PageWrapper className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                        <SubmitComplaintForm />
                    </PageWrapper>
                </main>
            </div>
        </div>
    );
};

export default SubmitComplaintPage;