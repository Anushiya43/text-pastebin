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
        <div className="container">
            <h1>Paste Content</h1>
            <div className="paste-box" style={{
                background: 'black',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                whiteSpace: 'pre-wrap',
                marginBottom: '15px'
            }}>
                {paste.content}
            </div>
            <div className="meta" style={{ fontSize: '0.9em', color: '#666', marginBottom: '15px' }}>
                <p>Created at: {new Date(paste.created_at).toLocaleString()}</p>
                {paste.expires_at && <p>Expires at: {new Date(paste.expires_at).toLocaleString()}</p>}
                {paste.views_left !== null && <p>Views left: {paste.views_left}</p>}
            </div>
            <Link to="/">Create New Paste</Link>
        </div>
    );
};

export default ViewPaste;
