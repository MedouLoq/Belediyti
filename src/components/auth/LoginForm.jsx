import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth'; // Use the custom hook
import InputField from '../common/InputField'; // Use common component
import Button from '../common/Button'; // Use common component

// Example Icon (replace with actual icon library if needed)
const LoginIcon = () => <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth(); // Get login function from context via hook
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await login({ email, password }); // Use the async login from context
            if (!result.success) {
                setError(result.message || 'Invalid credentials');
                setIsLoading(false);
            } else {
                // AuthProvider handles setting state, redirect is handled by AppRoutes/ProtectedRoute
                // Optionally navigate immediately if preferred over ProtectedRoute handling it
                navigate('/dashboard', { replace: true });
            }
        } catch (err) {
            // This catch is less likely needed if AuthContext handles errors, but good practice
            setError('An unexpected error occurred. Please try again.');
            setIsLoading(false);
        }
        // No finally block needed if state is managed above
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-8" // Removed padding/bg, page will handle that
        >
            {/* Header section can stay here or move to the Page component */}
            <div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 0.7, type: "spring" }}
                    className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center mb-6"
                >
                    {/* Replace SVG with a more relevant logo/icon */}
                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </motion.div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Report issues in your municipality
                </p>
            </div>

            {/* Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm"
                        role="alert"
                    >
                        {error}
                    </motion.div>
                )}
                <InputField
                    id="email-address"
                    name="email"
                    type="email"
                    label="Email address"
                    labelSrOnly // Hide label visually
                    placeholder="Email address"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    labelSrOnly // Hide label visually
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                            Remember me
                        </label>
                    </div>
                    <div>
                        <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500"> {/* Link to actual route */}
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <Button
                    type="submit"
                    isLoading={isLoading}
                    fullWidth
                    className="group" // Keep group class if needed for icon styling
                // leftIcon={isLoading ? null : <LoginIcon />} // Example icon usage
                >
                    Sign in
                </Button>
            </form>

            <div className="text-center text-sm">
                <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                        Register now
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default LoginForm;