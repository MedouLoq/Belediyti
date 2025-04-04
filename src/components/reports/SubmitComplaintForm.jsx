import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import InputField from '../common/InputField';
import TextAreaField from '../common/TextAreaField';


// --- MOCK ---
const submitMockComplaint = (formData) => new Promise((resolve, reject) => {
    console.log("Simulating complaint submission:", formData);
    setTimeout(() => {
        resolve({ success: true, message: "Complaint submitted.", complaintId: Date.now() + 1000 });
    }, 1200);
});
// --- END MOCK ---

const SubmitComplaintForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ subject: '', description: '', municipality: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const result = await submitMockComplaint(formData);
            setSuccess(true);
        } catch (err) {
            setError(err.message || "Failed to submit complaint.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div key="complaintSuccess" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, type: 'spring' }} className="text-center py-10 px-6 w-full max-w-lg mx-auto">
                {/* <CheckCircleIcon className="mx-auto mb-4" /> */} {/* Icon */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Complaint Submitted</h2>
                <p className="text-gray-600 mb-6">Thank you for your feedback. We will review your complaint.</p>
                <Button onClick={() => navigate('/dashboard')} variant="primary">Back to Dashboard</Button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
            <h2 className="text-2xl font-bold text-center text-gray-800">Submit a Complaint</h2>
            <p className="text-center text-gray-600 text-sm mb-6">
                Use this form for issues regarding unmet expectations or services not rendered.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <InputField
                    id="subject" name="subject" label="Subject" placeholder="Brief subject of your complaint" required
                    value={formData.subject} onChange={handleChange}
                />
                {/* Optional: Municipality selection (Needs data) */}
                {/* <InputField id="municipality" name="municipality" label="Concerned Municipality" placeholder="Enter municipality name" value={formData.municipality} onChange={handleChange} /> */}
                <TextAreaField
                    id="description" name="description" label="Detailed Description" required rows={6}
                    placeholder="Please provide details about your complaint..." value={formData.description} onChange={handleChange}
                />
                <Button type="submit" isLoading={isLoading} fullWidth variant="primary" className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500">
                    Submit Complaint
                </Button>
            </form>
        </motion.div>
    );
};

export default SubmitComplaintForm;