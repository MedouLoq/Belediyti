import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // <<< Add Navigate here
import { AnimatePresence, motion } from 'framer-motion';

// Import Page Components
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import ReportProblemPage from '../pages/ReportProblemPage';
import SubmitComplaintPage from '../pages/SubmitComplaintPage';
import ReportDetailsPage from '../pages/ReportDetailsPage';
import NotificationsPage from '../pages/NotificationsPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage'; // Create this page

// Import Route Protection
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../hooks/useAuth';

const pageVariants = {
    initial: { opacity: 0, x: -50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 50 },
};

const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
};

const AppRoutes = () => {
    const { isAuthenticated } = useAuth(); // Use auth state for initial redirect logic if needed

    return (
        <AnimatePresence mode="wait">
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={
                    <motion.div key="login" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                        <LoginPage />
                    </motion.div>
                } />
                <Route path="/register" element={
                    <motion.div key="register" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                        <RegisterPage />
                    </motion.div>
                } />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <motion.div key="dashboard" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                            <DashboardPage />
                        </motion.div>
                    </ProtectedRoute>
                } />
                <Route path="/report-problem" element={
                    <ProtectedRoute>
                        <motion.div key="report-problem" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                            <ReportProblemPage />
                        </motion.div>
                    </ProtectedRoute>
                } />
                <Route path="/submit-complaint" element={
                    <ProtectedRoute>
                        <motion.div key="submit-complaint" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                            <SubmitComplaintPage />
                        </motion.div>
                    </ProtectedRoute>
                } />
                <Route path="/report/:id" element={
                    <ProtectedRoute>
                        <motion.div key="report-details" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                            <ReportDetailsPage />
                        </motion.div>
                    </ProtectedRoute>
                } />
                <Route path="/notifications" element={
                    <ProtectedRoute>
                        <motion.div key="notifications" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                            <NotificationsPage />
                        </motion.div>
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <motion.div key="profile" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                            <ProfilePage />
                        </motion.div>
                    </ProtectedRoute>
                } />

                {/* Fallback Route */}
                {/* Consider redirecting root '/' based on auth status */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                <Route path="*" element={
                    <motion.div key="notfound" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                        <NotFoundPage />
                    </motion.div>
                } />
            </Routes>
        </AnimatePresence>
    );
};

export default AppRoutes;