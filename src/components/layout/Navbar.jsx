import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Use the mock user data if available from context, otherwise just show generic state
// import { useAuth } from '../../hooks/useAuth'; // Still useful for showing user name/avatar if mocked

// Example Icons (Replace with react-icons or similar)
const MenuIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const BellIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.002 6.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const UserCircleIcon = () => <svg className="h-8 w-8 rounded-full" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0012 11z" clipRule="evenodd" /></svg>;


const Navbar = ({ setSidebarOpen }) => {
    // const { user, logout } = useAuth(); // Get mock user/logout if implemented in context
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Mock user for display purposes if not using context yet
    const mockUser = { name: "Citizen User", avatar: null };
    const user = mockUser; // Replace with context user when ready

    const handleLogout = () => {
        // In a real app, call logout() from context
        console.log("Simulating logout");
        // Need a way to simulate redirect to login, maybe context manages this
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md h-16 z-80"> 
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Left side: Burger Menu & Logo */}
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(prev => !prev)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden mr-4" // Hide on medium screens and up
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuIcon />
                        </button>
                        <Link to="/dashboard" className="flex-shrink-0 flex items-center">
                            {/* Replace with your actual logo */}
                            <span className="font-bold text-xl text-blue-600">بلديتي</span>
                            {/* <img className="h-8 w-auto" src="/path/to/logo.svg" alt="Baladiyati Logo" /> */}
                        </Link>
                    </div>

                    {/* Right side: Notifications & User Menu */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/notifications"
                            className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon />
                            {/* Mock notification badge */}
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
                        </Link>

                        {/* Profile dropdown */}
                        <div className="relative">
                            <div>
                                <button
                                    type="button"
                                    className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    id="user-menu-button"
                                    aria-expanded={dropdownOpen}
                                    aria-haspopup="true"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    {user?.avatar ? (
                                        <img className="h-8 w-8 rounded-full" src={user.avatar} alt="User avatar" />
                                    ) : (
                                        <UserCircleIcon className="text-gray-400" />
                                    )}
                                </button>
                            </div>

                            {/* Dropdown menu */}
                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.1 }}
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu-button"
                                    >
                                        <div className="px-4 py-2 border-b">
                                            <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                                            {/* <p className="text-sm text-gray-500">{user?.email}</p> */}
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem" onClick={() => setDropdownOpen(false)}
                                        >
                                            Your Profile
                                        </Link>
                                        {/* Add other links like Settings if needed */}
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            Sign out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;