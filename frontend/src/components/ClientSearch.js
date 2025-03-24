import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const ClientSearch = () => {
    const [searchType, setSearchType] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setError('Por favor, preencha o campo de pesquisa.');
            setResults([]);
            return;
        }

        setError('');
        const endpoint = searchType === 'name' ? `/clients/name/${searchTerm}` : `/clients/cpf/${searchTerm}`;
        
        api.get(endpoint)
            .then(response => {
                if (!response.data || response.data.length === 0) {
                    setError('Nenhum cliente encontrado.');
                    setResults([]);
                } else {
                    setResults(Array.isArray(response.data) ? response.data : [response.data]);
                }
            })
            .catch(error => {
                console.error("Erro ao buscar cliente:", error);
                setError('Cliente não encontrado!');
                setResults([]);
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Buscar Cliente</h2>
            <div className="row mb-3">
                <div className="col-md-3">
                    <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option value="name">Nome</option>
                        <option value="cpf">CPF</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={searchType === 'name' ? 'Digite o nome' : 'Digite o CPF'}
                    />
                </div>
                <div className="col-md-3">
                    <button className="btn btn-primary w-100" onClick={handleSearch}>Buscar</button>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <ul className="list-group">
                {results.map(client => (
                    <li key={client.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{client.name} - {client.cpf}</span>
                        <Link to={`/clients/${client.id}/contacts`} className="btn btn-outline-secondary btn-sm">Ver Contatos</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientSearch;