import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';

const ContactList = () => {
    const { clientId } = useParams();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        api.get(`/contacts/${clientId}`).then(response => {
            setContacts(response.data);
        });
    }, [clientId]);

    const handleDelete = (id) => {
        api.delete(`/contacts/${id}`).then(() => {
            setContacts(contacts.filter(contact => contact.id !== id));
        });
    };

    return (
        <div>
            <h2>Contacts</h2>
            <Link to={`/clients/${clientId}/contacts/new`}>Add Contact</Link>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>
                        {contact.name} - {contact.phone}
                        <Link to={`/contacts/${contact.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(contact.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;