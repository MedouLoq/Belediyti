import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/common/Card';
import ProfileForm from '../components/user/ProfileForm';
import { AnimatePresence, motion } from 'framer-motion';

const ProfilePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="hidden md:flex md:flex-shrink-0"><Sidebar /></div>
            <AnimatePresence>{sidebarOpen && ( /* Mobile Sidebar */ <> {/* ... */} </>)}</AnimatePresence>
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pt-16">
                    <PageWrapper>
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>
                        <Card className="p-6">
                            <ProfileForm />
                        </Card>

                        {/* Optional: Section for Changing Password */}
                        {/* <Card className="p-6 mt-8"> ... </Card> */}
                    </PageWrapper>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;