import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
            {/* The background and centering is handled by the page */}
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
                {/* The white card container */}
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;