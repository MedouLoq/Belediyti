import React, { createContext, useState, useEffect } from 'react';
// import { loginUser, registerUser, fetchUserProfile } from '../services/api'; // Import your API functions

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [isLoading, setIsLoading] = useState(true); // Check initial auth status

    useEffect(() => {
        // Attempt to fetch user profile if token exists on initial load
        const verifyToken = async () => {
            if (token) {
                try {
                    // const userData = await fetchUserProfile(token); // Your API call
                    // --- Mock User Data ---
                    const userData = { id: 1, name: "Mock User", email: "user@example.com" };
                    // --- End Mock User Data ---
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to verify token:", error);
                    localStorage.removeItem('authToken');
                    setToken(null);
                    setUser(null);
                }
            }
            setIsLoading(false);
        };
        verifyToken();
    }, [token]);

    const login = async (credentials) => {
        try {
            // const { token: newToken, user: userData } = await loginUser(credentials); // API Call
            // --- Mock Login ---
            const newToken = "mock-jwt-token-" + Date.now();
            const userData = { id: 1, name: "Mock User", email: credentials.email };
            // --- End Mock Login ---

            localStorage.setItem('authToken', newToken);
            setToken(newToken);
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, message: error.message || "Login failed" };
        }
    };

    const register = async (userData) => {
        try {
            // const { token: newToken, user: newUser } = await registerUser(userData); // API Call
            // --- Mock Register ---
            const newToken = "mock-jwt-token-" + Date.now();
            const newUser = { id: 2, name: userData.fullName, email: userData.email };
            // --- End Mock Register ---

            localStorage.setItem('authToken', newToken);
            setToken(newToken);
            setUser(newUser);
            return { success: true };
        } catch (error) {
            console.error("Registration failed:", error);
            return { success: false, message: error.message || "Registration failed" };
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        // Optionally call a backend logout endpoint
    };

    const value = {
        user,
        token,
        isAuthenticated: !!user, // True if user object exists
        isLoading, // To show loading state during initial auth check
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};