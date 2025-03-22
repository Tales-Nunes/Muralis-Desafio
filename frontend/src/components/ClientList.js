import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        api.get('/clients').then(response => {
            setClients(response.data);
        });
    }, []);

    const handleDelete = (id) => {
        api.delete(`/clients/${id}`).then(() => {
            setClients(clients.filter(client => client.id !== id));
        });
    };

    return (
        <div>
            <h2>Clientes</h2>
            <Link to="/clients/new">Adicionar Cliente</Link>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>
                        {client.name} - {client.cpf}
                        <Link to={`/clients/${client.id}`}>Editar</Link>
                        <button onClick={() => handleDelete(client.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;