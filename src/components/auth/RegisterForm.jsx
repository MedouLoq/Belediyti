import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth'; // Use the custom hook
import InputField from '../common/InputField'; // Use common component
import Button from '../common/Button'; // Use common component

// Mock registration function (if not using the one from AuthContext yet)
const mockRegister = async (registrationData) => {
    console.log("Simulating registration with:", registrationData);
    return new Promise(resolve => {
        setTimeout(() => {
            // Simulate success
            resolve({ success: true, message: "Registration successful!" });
            // Simulate failure example:
            // resolve({ success: false, message: "Email already exists." });
        }, 1500); // 1.5 second delay
    });
};


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '', // Add phone if needed based on your DB schema
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth(); // Get register function from context via hook (or use mockRegister if context isn't fully setup)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (formData.password.length < 8) { // Basic password length validation
            setError('Password must be at least 8 characters long.');
            return;
        }
        setIsLoading(true);

        try {
            const { confirmPassword, ...registrationData } = formData; // Don't send confirmPassword to backend/mock

            // Decide whether to use context's register or the mock one for now
            const registrationFunction = register || mockRegister; // Use context if available, else mock
            const result = await registrationFunction(registrationData);

            if (!result.success) {
                setError(result.message || 'Registration failed. Please try again.');
                setIsLoading(false);
            } else {
                // Registration successful, navigate to dashboard
                console.log("Registration successful, navigating...");
                navigate('/dashboard', { replace: true });
                // No need to setIsLoading(false) here as we are navigating away
            }
        } catch (err) {
            console.error("Registration error:", err);
            setError('An unexpected error occurred during registration.');
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-8" // Form container styling
        >
            {/* Header */}
            <div>
                {/* Replace with your actual logo/icon */}
                <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}
                    className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center mb-6"
                >
                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>
                </motion.div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Join to report issues and help your community
                </p>
            </div>

            {/* Form */}
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm" role="alert"
                    >
                        {error}
                    </motion.div>
                )}
                <InputField
                    id="fullName" name="fullName" label="Full Name" placeholder="Your full name" required
                    value={formData.fullName} onChange={handleChange} labelSrOnly // Hides label visually
                />
                <InputField
                    id="email" name="email" type="email" label="Email" placeholder="Email address" required
                    value={formData.email} onChange={handleChange} autoComplete="email" labelSrOnly
                />
                {/* Optional: Phone Input */}
                {/* <InputField
          id="phone" name="phone" type="tel" label="Phone Number" placeholder="Phone number (Optional)"
          value={formData.phone} onChange={handleChange} autoComplete="tel" labelSrOnly
        /> */}
                <InputField
                    id="password" name="password" type="password" label="Password" placeholder="Password (min 8 characters)" required
                    value={formData.password} onChange={handleChange} autoComplete="new-password" labelSrOnly
                />
                <InputField
                    id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" placeholder="Confirm Password" required
                    value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" labelSrOnly
                />

                <Button type="submit" isLoading={isLoading} fullWidth>
                    Register
                </Button>
            </form>

            {/* Link to Login */}
            <div className="text-center text-sm">
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default RegisterForm;