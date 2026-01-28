import React, { useState } from 'react';
import api from '../api';

const CreatePaste = () => {
    const [content, setContent] = useState('');
    const [expiresMinutes, setExpiresMinutes] = useState('');
    const [viewsLeft, setViewsLeft] = useState('');
    const [responseid, setResponseid] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                content,
                expires_minutes: expiresMinutes ? parseInt(expiresMinutes) : 1,
                views_left: viewsLeft ? parseInt(viewsLeft) : 1
            };
            const response = await api.post('/pastes/', payload);
            setResponseid(response.data.id);
            setCopied(false); // Reset copied state when new paste is created
        } catch (error) {
            console.error("Error creating paste:", error);
            alert("Failed to create paste");
        }
    };

    const handleCopy = () => {
        const pasteUrl = import.meta.env.VITE_FRONTEND_URL + '/' + responseid;
        navigator.clipboard.writeText(pasteUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    return (
        <div className="container">
            <h1>Create New Paste</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your content here..."
                    required
                    style={{ width: '100%', height: '200px', marginBottom: '10px' }}
                />
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Expires in (minutes):
                        <input
                            type="number"
                            min="1"
                            value={expiresMinutes}
                            onChange={(e) => setExpiresMinutes(e.target.value)}
                            placeholder="Optional"
                            style={{ marginLeft: '5px', marginRight: '15px' }}
                        />
                    </label>
                    <label>
                        View limit:
                        <input
                            type="number"
                            min="1"
                            value={viewsLeft}
                            onChange={(e) => setViewsLeft(e.target.value)}
                            placeholder="Optional"
                            style={{ marginLeft: '5px' }}
                        />
                    </label>
                </div>
                <button type="submit">Create Paste</button>
            </form>
            {responseid && <div className="paste-result">
                <h4>Your Paste is Ready! 🎉</h4>
                <div className="paste-box">
                    <div className="paste-url-container">
                        <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                        <div className="paste-url">
                            {import.meta.env.VITE_FRONTEND_URL + '/' + responseid}
                        </div>
                    </div>
                    <button className="copy-btn" onClick={handleCopy}>
                        {copied ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                                Click to Copy
                            </>
                        )}
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default CreatePaste;
