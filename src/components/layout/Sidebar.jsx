import React from 'react';
import { NavLink, Link } from 'react-router-dom';

// Example Icons
const DashboardIcon = () => <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ReportIcon = () => <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const ComplaintIcon = () => <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>;
const UserIcon = () => <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

const Sidebar = ({ setSidebarOpen }) => { // Receive setSidebarOpen to close on navigation (optional)

    const baseLinkClass = "flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200";
    const activeLinkClass = "bg-blue-100 text-blue-800 font-medium";

    const handleLinkClick = () => {
        if (setSidebarOpen) {
            // Close sidebar on mobile after clicking a link
            if (window.innerWidth < 768) { // Check if on mobile viewport (adjust breakpoint if needed)
                setSidebarOpen(false);
            }
        }
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
            {/* Optional: Sidebar Header */}
            <div className="h-16 flex items-center justify-center border-b">
        <span className="text-lg font-semibold text-gray-700">Menu</span>
      </div> 

            <nav className="flex-grow px-4 py-6 space-y-2">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                    onClick={handleLinkClick}
                >
                    <DashboardIcon />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/report-problem"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                    onClick={handleLinkClick}
                >
                    <ReportIcon />
                    Report Problem
                </NavLink>
                <NavLink
                    to="/submit-complaint"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                    onClick={handleLinkClick}
                >
                    <ComplaintIcon />
                    Submit Complaint
                </NavLink>

                {/* Divider */}
                <hr className="my-4 border-gray-200" />

                <NavLink
                    to="/profile"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                    onClick={handleLinkClick}
                >
                    <UserIcon />
                    Profile
                </NavLink>
                {/* Add Settings, Help, etc. if needed */}
            </nav>

            {/* Optional: Sidebar Footer */}
            {/* <div className="p-4 border-t">
        <p className="text-xs text-gray-500">© 2024 Baladiyati</p>
      </div> */}
        </div>
    );
};

export default Sidebar;