import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false); 
    const [clientToDelete, setClientToDelete] = useState(null);
    const [message, setMessage] = useState(""); 

    useEffect(() => {
        api.get('/clients').then(response => {
            setClients(response.data);
        });
    }, []);

    const handleDelete = (id) => {
        setClientToDelete(id); 
        setShowModal(true); 
    };

    const confirmDelete = () => {
        if (clientToDelete) {
            api.delete(`/clients/${clientToDelete}`)
                .then(() => {
                    setClients(clients.filter(client => client.id !== clientToDelete));
                    setShowModal(false); 
                    setMessage("Cliente excluído com sucesso!"); 
                })
                .catch(error => {
                    console.error("Erro ao excluir cliente:", error);
                    setShowModal(false); 
                    setMessage("Ocorreu um erro ao excluir o cliente."); 
                });
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Clientes</h2>
            <div className="d-flex justify-content-end mb-3">
                <Link to="/clients/new" className="btn btn-primary">Adicionar Cliente</Link>
            </div>
            {message && (
                <div className="alert alert-info text-center mt-3">
                    {message}
                </div>
            )}
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Data de Nascimento</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.cpf}</td>
                                <td>{client.birthday ? new Date(client.birthday + 'T00:00:00').toLocaleDateString() : 'Não informado'}</td>
                                <td>{client.address || 'Não informado'}</td>
                                <td className="d-flex gap-2">
                                    <Link to={`/clients/${client.id}`} className="btn btn-warning btn-sm">Editar</Link>
                                    <button onClick={() => handleDelete(client.id)} className="btn btn-danger btn-sm">Excluir</button>
                                    <Link to={`/clients/${client.id}/contacts`} className="btn btn-info btn-sm">Ver Contatos</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>     
                <Modal.Body>
                    Tem certeza que deseja excluir este cliente?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ClientList;
