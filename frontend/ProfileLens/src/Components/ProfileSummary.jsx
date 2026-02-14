import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileSummary = () => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                // 1. Get the JWT token from wherever you stored it during login
                const token = localStorage.getItem('access_token'); 

                // 2. Make the GET request to your Django backend, attaching the token
                const response = await axios.get('http://localhost:8000/api/summary/', {
                    headers: {
                        Authorization: `Bearer ${token}` //
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
    }, []); // Empty dependency array means this runs once when the component mounts

    // Render the UI based on the state
    if (loading) return <div className="p-4 text-center">🤖 AI is analyzing your reviews...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h3 className="text-xl font-bold mb-4">✨ AI Profile Consensus</h3>
            {/* The summary might have line breaks, so we map them to paragraphs */}
            <div className="text-gray-700 whitespace-pre-line">
                {summary}
            </div>
        </div>
    );
};

export default ProfileSummary;