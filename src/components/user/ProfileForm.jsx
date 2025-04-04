import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { motion } from 'framer-motion';

// --- MOCK ---
const updateMockProfile = (userData) => new Promise((resolve) => {
    console.log("Simulating profile update:", userData);
    setTimeout(() => resolve({ success: true, message: "Profile updated successfully!" }), 1000);
});
// --- END MOCK ---

const ProfileForm = () => {
    const { user } = useAuth(); // Get current user data (even if mocked)
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '', // Add phone if in user object
        // Password fields are usually separate or handled differently
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);
        try {
            const result = await updateMockProfile(formData);
            if (result.success) {
                setSuccess(result.message);
                // Optional: Update context user if needed, though login/logout usually handles this
            } else {
                setError(result.message || "Failed to update profile.");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}
                <InputField
                    id="fullName" name="fullName" label="Full Name" required
                    value={formData.fullName} onChange={handleChange}
                />
                <InputField
                    id="email" name="email" type="email" label="Email Address" required disabled // Usually email is not changeable or requires verification
                    value={formData.email} onChange={handleChange} className="bg-gray-100"
                />
                <InputField
                    id="phone" name="phone" label="Phone Number (Optional)" placeholder="Your phone number"
                    value={formData.phone} onChange={handleChange}
                />
                {/* Add Change Password section/link here */}
                <div className="pt-2">
                    <Button type="submit" isLoading={isLoading} variant="primary">
                        Save Changes
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};

export default ProfileForm;