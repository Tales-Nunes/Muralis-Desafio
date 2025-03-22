import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const ClientForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState({ name: '', cpf: '', birthday: '', adress: '' });

    useEffect(() => {
        if (id) {
            api.get(`/clients/${id}`).then(response => {
                setClient(response.data);
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            api.put(`/clients/${id}`, client).then(() => {
                navigate('/clients');
            });
        } else {
            api.post('/clients', client).then(() => {
                navigate('/clients');
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
            <input
                type="text"
                value={client.name}
                onChange={(e) => setClient({ ...client, name: e.target.value })}
                placeholder="Nome"
                required
            />
            <input
                type="text"
                value={client.cpf}
                onChange={(e) => setClient({ ...client, cpf: e.target.value })}
                placeholder="CPF"
                required
            />
            <input
                type="date"
                value={client.birthday}
                onChange={(e) => setClient({ ...client, birthday: e.target.value })}
                placeholder="Data de Nascimento"
            />
            <input
                type="text"
                value={client.adress}
                onChange={(e) => setClient({ ...client, adress: e.target.value })}
                placeholder="Endereço"
            />
            <button type="submit">Salvar</button>
        </form>
    );
};

export default ClientForm;