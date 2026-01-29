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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h1 className="text-center mb-4">Create New Paste</h1>
                    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Enter your content here..."
                                required
                                rows="8"
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="form-label">Expires in (minutes):</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    min="1"
                                    value={expiresMinutes}
                                    onChange={(e) => setExpiresMinutes(e.target.value)}
                                    placeholder="1"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">View limit:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    min="1"
                                    value={viewsLeft}
                                    onChange={(e) => setViewsLeft(e.target.value)}
                                    placeholder="1"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Create Paste</button>
                    </form>

                    {responseid && (
                        <div className="paste-result mt-4 p-4 border rounded shadow-sm bg-body-tertiary">
                            <h4 className="mb-3 text-primary">Your Paste is Ready! 🎉</h4>
                            <div className="input-group">
                                <span className="input-group-text bg-transparent border-end-0">
                                    <svg className="bi bi-link-45deg" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0"
                                    value={import.meta.env.VITE_FRONTEND_URL + "/" + responseid}
                                    readOnly
                                />
                                <button className="btn btn-outline-primary" onClick={handleCopy} type="button">
                                    {copied ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                            </svg>
                                            Copy
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatePaste;
