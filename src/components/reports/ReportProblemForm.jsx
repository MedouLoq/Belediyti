import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import Common Components
import Button from '../common/Button';
import InputField from '../common/InputField';
import TextAreaField from '../common/TextAreaField';
import StepIndicator from '../common/StepIndicator';


// Icons (Replace with actual icons)
const CameraIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LocationIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CheckCircleIcon = () => <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

// --- MOCK DATA ---
const mockCategories = [
    { id: 1, name: 'Roads', icon: '🛣️', color: 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200' },
    { id: 2, name: 'Water', icon: '💧', color: 'bg-cyan-100 text-cyan-800 border-cyan-300 hover:bg-cyan-200' },
    { id: 3, name: 'Electricity', icon: '⚡', color: 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200' },
    { id: 4, name: 'Waste', icon: '🗑️', color: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200' },
    { id: 5, name: 'Public Spaces', icon: '🏞️', color: 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200' },
    { id: 6, name: 'Other', icon: '📋', color: 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200' },
];

const submitMockReport = (formData) => new Promise((resolve, reject) => {
    console.log("Simulating report submission:", formData);
    setTimeout(() => {
        // Simulate success/failure
        const success = Math.random() > 0.1; // 90% success rate
        if (success) {
            resolve({ success: true, message: "Report submitted successfully!", reportId: Date.now() });
        } else {
            reject(new Error("Failed to submit report. Please try again later."));
        }
    }, 1500); // 1.5 second delay
});
// --- END MOCK DATA ---


const ReportProblemForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        category: '',
        description: '',
        locationText: '',
        photo: null,
        latitude: null,
        longitude: null,
    });
    const [photoPreview, setPhotoPreview] = useState(null);

    const totalSteps = 3; // Category -> Details -> Review

    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps + 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleCategorySelect = (category) => {
        setFormData({ ...formData, category: category.name });
        nextStep();
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        setError('');
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Add validation here if needed (size, type)
            setFormData({ ...formData, photo: file });
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleLocationDetect = () => {
        setError('');
        // Basic Geolocation simulation
        setFormData({
            ...formData,
            latitude: 18.07 + (Math.random() - 0.5) * 0.1, // Simulate around Nouakchott
            longitude: -15.95 + (Math.random() - 0.5) * 0.1,
            locationText: 'Simulated Detected Location'
        });
        // Real implementation:
        // if (navigator.geolocation) { ... } else { setError(...) }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const result = await submitMockReport(formData); // Use mock submission
            setSubmissionSuccess(true);
            nextStep(); // Move to success screen
        } catch (err) {
            setError(err.message || 'An error occurred during submission.');
            // Don't go to next step on failure
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation variants
    const stepVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50, position: 'absolute' }, // Keep exiting step in flow
    };
    const containerVariants = { // To manage height changes
        initial: { height: 'auto' },
        animate: { height: 'auto' },
        exit: { height: 'auto' }
    };

    return (
        <div className="max-w-xl w-full mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden min-h-[450px]">
            <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
                <AnimatePresence mode="wait">

                    {/* ----- STEP 1: CATEGORY ----- */}
                    {step === 1 && (
                        <motion.div
                            key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit"
                            transition={{ duration: 0.3 }} className="w-full"
                        >
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Report Problem</h2>
                            <p className="text-center text-gray-600 mb-6">Select the category</p>
                            <StepIndicator current={step} total={totalSteps} className="mb-8" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {mockCategories.map((category) => (
                                    <motion.button
                                        key={category.id}
                                        whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 5px 10px rgba(0,0,0,0.1)" }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleCategorySelect(category)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-lg border ${category.color} transition-colors duration-200 aspect-square`}
                                    >
                                        <span className="text-4xl mb-2">{category.icon}</span>
                                        <span className="font-medium text-center text-sm">{category.name}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ----- STEP 2: DETAILS ----- */}
                    {step === 2 && (
                        <motion.div
                            key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit"
                            transition={{ duration: 0.3 }} className="space-y-5 w-full"
                        >
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Provide Details</h2>
                            <p className="text-center text-gray-600 mb-6">Describe, add photo, specify location.</p>
                            <StepIndicator current={step} total={totalSteps} className="mb-8" />
                            {error && <p className="text-red-500 text-sm text-center -mt-4 mb-4">{error}</p>}

                            <TextAreaField
                                id="description" name="description" label="Description" required value={formData.description} onChange={handleInputChange}
                                placeholder="Please describe the issue clearly..."
                            />

                            {/* Photo Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Photo (Optional)</label>
                                <div className="mt-1 flex items-center space-x-4">
                                    <label htmlFor="photo-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 inline-flex items-center">
                                        <CameraIcon /> <span className="ml-2">Choose File</span>
                                        <input id="photo-upload" name="photo" type="file" className="sr-only" accept="image/*" onChange={handlePhotoChange} />
                                    </label>
                                    {photoPreview && <motion.img initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={photoPreview} alt="Preview" className="h-16 w-16 rounded-md object-cover border" />}
                                </div>
                                {formData.photo && <p className="text-xs text-gray-500 mt-1">{formData.photo.name}</p>}
                            </div>

                            {/* Location */}
                            <div>
                                <label htmlFor="locationText" className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                                <div className="flex space-x-2">
                                    <InputField
                                        id="locationText" name="locationText" required value={formData.locationText} onChange={handleInputChange}
                                        placeholder="Enter address or use auto-detect" className="flex-grow" labelSrOnly
                                    />
                                    <Button type="button" onClick={handleLocationDetect} variant="secondary" size="md" className="px-3" title="Detect my location">
                                        <LocationIcon />
                                    </Button>
                                </div>
                                {formData.latitude && <p className="text-xs text-gray-500 mt-1">Coords: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}</p>}
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between pt-4">
                                <Button type="button" onClick={prevStep} variant="secondary">Back</Button>
                                <Button type="button" onClick={nextStep} disabled={!formData.description || !formData.locationText} >Next: Review</Button>
                            </div>
                        </motion.div>
                    )}

                    {/* ----- STEP 3: REVIEW ----- */}
                    {step === 3 && (
                        <motion.div
                            key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit"
                            transition={{ duration: 0.3 }} className="space-y-6 w-full"
                        >
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Review Report</h2>
                            <p className="text-center text-gray-600 mb-6">Confirm details before submitting.</p>
                            <StepIndicator current={step} total={totalSteps} className="mb-8" />
                            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                            <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50/50 text-sm">
                                <div className="flex justify-between"><span className="font-medium text-gray-600">Category:</span><span className="text-gray-800 font-semibold">{formData.category}</span></div>
                                <div><span className="font-medium text-gray-600 block mb-1">Description:</span><p className="text-gray-800 bg-white p-2 border rounded-md">{formData.description}</p></div>
                                <div className="flex justify-between"><span className="font-medium text-gray-600">Location:</span><span className="text-gray-800 text-right">{formData.locationText}</span></div>
                                {photoPreview && <div className="text-center"><span className="font-medium text-gray-600 block mb-2">Photo:</span><img src={photoPreview} alt="Preview" className="max-h-36 mx-auto rounded border" /></div>}
                            </div>

                            {/* Navigation/Submit */}
                            <div className="flex justify-between pt-4">
                                <Button type="button" onClick={prevStep} variant="secondary" disabled={isSubmitting}>Back</Button>
                                <Button type="submit" onClick={handleSubmit} isLoading={isSubmitting} variant="primary" className="bg-green-600 hover:bg-green-700 focus:ring-green-500">Submit Report</Button>
                            </div>
                        </motion.div>
                    )}

                    {/* ----- SUCCESS STEP ----- */}
                    {step === totalSteps + 1 && submissionSuccess && (
                        <motion.div
                            key="stepSuccess" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, type: 'spring' }} className="text-center py-10 px-6 w-full"
                        >
                            <CheckCircleIcon className="mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Submitted!</h2>
                            <p className="text-gray-600 mb-6">Thank you! Your report ID is #{/* Display mock ID if needed */}. We'll review it shortly.</p>
                            <Button onClick={() => navigate('/dashboard')} variant="primary">Back to Dashboard</Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ReportProblemForm;