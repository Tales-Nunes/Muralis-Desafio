import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const ClientForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState({ name: '', cpf: '', birthday: '', address: '' });
    const [errors, setErrors] = useState({});

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const validateCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
        let remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(9))) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(10))) return false;

        return true;
    };

    const validateBirthday = (birthday) => {
        const today = new Date();
        const birthDate = new Date(birthday);
        return birthDate <= today;
    };

    useEffect(() => {
        if (id) {
            api.get(`/clients/${id}`)
                .then(response => {
                    const clientData = response.data;
                    setClient({
                        ...clientData,
                        birthday: formatDate(clientData.birthday),
                    });
                })
                .catch(error => console.error("Erro ao buscar cliente:", error));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!client.name.trim()) newErrors.name = 'O nome é obrigatório';
        if (!validateCPF(client.cpf)) newErrors.cpf = 'CPF inválido';
        if (!validateBirthday(client.birthday)) newErrors.birthday = 'Data de nascimento inválida';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const request = id ? api.put(`/clients/${id}`, client) : api.post('/clients', client);

        request
            .then(() => navigate('/clients'))
            .catch(error => console.error("Erro ao salvar cliente:", error));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">{id ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        value={client.name}
                        onChange={(e) => setClient({ ...client, name: e.target.value })}
                        required
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">CPF</label>
                    <input
                        type="text"
                        className="form-control"
                        value={client.cpf}
                        onChange={(e) => setClient({ ...client, cpf: e.target.value })}
                        required
                    />
                    {errors.cpf && <div className="text-danger">{errors.cpf}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Data de Nascimento</label>
                    <input
                        type="date"
                        className="form-control"
                        value={client.birthday}
                        onChange={(e) => setClient({ ...client, birthday: e.target.value })}
                        required
                    />
                    {errors.birthday && <div className="text-danger">{errors.birthday}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Endereço</label>
                    <input
                        type="text"
                        className="form-control"
                        value={client.address}
                        onChange={(e) => setClient({ ...client, address: e.target.value })}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
        </div>
    );
};

export default ClientForm;
