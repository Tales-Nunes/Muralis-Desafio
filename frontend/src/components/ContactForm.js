import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const ContactForm = () => {
    const { clientId, id } = useParams(); 
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        contactType: 'TELEFONE',
        contactValue: '',
        observation: '',
        client: { id: Number(clientId) },
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            api.get(`/contacts/contact/${id}`)
                .then(response => {
                    setContact({
                        contactType: response.data.contactType,
                        contactValue: response.data.contactValue,
                        observation: response.data.observation,
                        client: { id: Number(clientId) },
                    });
                })
                .catch(error => {
                    console.error("Erro ao buscar contato:", error);
                });
        }
    }, [id, clientId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!contact.contactValue.trim()) {
            newErrors.contactValue = 'O valor do contato é obrigatório.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const contactData = {
            contactType: contact.contactType,
            contactValue: contact.contactValue,
            observation: contact.observation,
            client: { id: Number(clientId) },
        };

        if (id) {
            api.put(`/contacts/${id}`, contactData)
                .then(() => navigate(`/clients/${clientId}/contacts`))
                .catch(error => console.error("Erro ao editar contato:", error));
        } else {
            api.post('/contacts', contactData)
                .then(() => navigate(`/clients/${clientId}/contacts`))
                .catch(error => console.error("Erro ao adicionar contato:", error));
        }
    };

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow-sm">
                <h2 className="mb-4 text-center">{id ? 'Editar Contato' : 'Adicionar Contato'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Tipo de Contato</label>
                        <select 
                            className="form-select"
                            value={contact.contactType} 
                            onChange={(e) => setContact({ ...contact, contactType: e.target.value })}
                        >
                            <option value="TELEFONE">Telefone</option>
                            <option value="EMAIL">E-mail</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Valor do Contato</label>
                        <input 
                            type="text" 
                            className={`form-control ${errors.contactValue ? 'is-invalid' : ''}`}
                            value={contact.contactValue} 
                            onChange={(e) => setContact({ ...contact, contactValue: e.target.value })} 
                            placeholder="Digite o contato"
                        />
                        {errors.contactValue && <div className="invalid-feedback">{errors.contactValue}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Observação</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={contact.observation} 
                            onChange={(e) => setContact({ ...contact, observation: e.target.value })} 
                            placeholder="Digite uma observação (opcional)"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;