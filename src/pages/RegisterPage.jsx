import React from 'react';
import RegisterForm from '../components/auth/RegisterForm'; // Make sure this import path is correct now

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-600 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
                {/* Ensure RegisterForm component exists at the imported path */}
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;