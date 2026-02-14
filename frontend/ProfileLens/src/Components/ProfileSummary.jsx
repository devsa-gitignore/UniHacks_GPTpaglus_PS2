import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileSummary = () => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Using the exact same Vite environment variable setup from your Login page
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                // 1. Get the JWT token using your specific key name
                const token = localStorage.getItem('accessToken'); 

                // 2. Make the GET request, attaching the token to the headers
                const response = await axios.get(`${apiBaseUrl}/api/summary/`, {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });

                // 3. Save the AI's summary to state
                setSummary(response.data.summary);
            } catch (err) {
                console.error(err);
                setError('Failed to load your profile summary. Make sure you are logged in!');
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [apiBaseUrl]);

    // Render the UI based on the state
    if (loading) return <div className="p-4 text-center text-[#6C0C27] text-xl">🤖 AI is analyzing your reviews...</div>;
    if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

    return (
        <div className="w-full max-w-2xl mx-auto bg-[#f7d0e1] rounded-3xl shadow-2xl border-2 border-[#6C0C27] p-8 mt-6">
            <h2 className="text-3xl text-[#6C0C27] pb-4 font-bold text-center border-b-2 border-[#6C0C27] mb-6">
                ✨ AI Profile Consensus
            </h2>
            {/* The summary might have line breaks, so we map them to whitespace-pre-line */}
            <div className="text-[#6C0C27] whitespace-pre-line text-lg leading-relaxed">
                {summary}
            </div>
        </div>
    );
};

export default ProfileSummary;