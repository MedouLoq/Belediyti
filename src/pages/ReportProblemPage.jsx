import React, { useState } from 'react';
// Import Layout & Components
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import PageWrapper from '../components/layout/PageWrapper';
import ReportProblemForm from '../components/reports/ReportProblemForm';
import { AnimatePresence, motion } from 'framer-motion';

const ReportProblemPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar - Reusing Dashboard structure */}
            <div className="hidden md:flex md:flex-shrink-0"><Sidebar /></div>
            <AnimatePresence>
                {sidebarOpen && ( /* Mobile Sidebar Logic */ <> {/* Backdrop */} <motion.div /* ... */ onClick={() => setSidebarOpen(false)} /> {/* Panel */} <motion.div /* ... */> <Sidebar setSidebarOpen={setSidebarOpen} /> </motion.div> </>)}
            </AnimatePresence>

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pt-16">
                    <PageWrapper className="flex items-center justify-center min-h-[calc(100vh-4rem)]"> {/* Center form vertically */}
                        {/* The ReportProblemForm includes its own card styling */}
                        <ReportProblemForm />
                    </PageWrapper>
                </main>
            </div>
        </div>
    );
};

export default ReportProblemPage;