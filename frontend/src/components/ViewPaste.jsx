import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const ViewPaste = () => {
    const { id } = useParams();
    const [paste, setPaste] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPaste = async () => {
            try {
                const response = await api.get(`/pastes/${id}`);
                setPaste(response.data);
            } catch (err) {
                setError("Paste not found or expired.");
            }
        };
        fetchPaste();
    }, [id]);

    if (error) {
        return (
            <div className="container">
                <p className="error">{error}</p>
                <Link to="/">Create New Paste</Link>
            </div>
        );
    }

    if (!paste) {
        return <div className="container">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="h3 mb-0">Paste Content</h1>
                        <Link to="/" className="btn btn-outline-primary btn-sm">Create New Paste</Link>
                    </div>

                    <div className="card shadow-sm mb-4">
                        <div className="card-body bg-black text-light p-4 rounded">
                            <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                                {paste.content}
                            </pre>
                        </div>
                        <div className="card-footer text-muted bg-body-secondary">
                            <div className="d-flex flex-wrap justify-content-between small">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock me-1" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                    </svg>
                                    Created: {new Date(paste.created_at).toLocaleString()}
                                </span>
                                {paste.expires_at && <span>Expires: {new Date(paste.expires_at).toLocaleString()}</span>}
                                {paste.views_left !== null && <span>Views left: {paste.views_left}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPaste;
