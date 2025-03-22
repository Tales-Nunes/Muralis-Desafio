import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const ContactForm = () => {
    const { clientId, id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({ name: '', phone: '' });

    useEffect(() => {
        if (id) {
            api.get(`/contats/${id}`).then(response => {
                setContact(response.data);
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            api.put(`/contacts/${id}`, contact).then(() => {
                navigate(`/clients/${clientId}/contacts`);
            });
        } else {
            api.post(`/clients/${clientId}/contacts`, contact).then(() => {
                navigate(`/clients/${clientId}/contacts`);
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? 'Edit Contact?' : 'Add Contact'}</h2>
            <input
                type="text"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                placeholder="Contact Name"
                required
            />
            <input
                type="text"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                placeholder="Contact Phone"
                required
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default ContactForm;