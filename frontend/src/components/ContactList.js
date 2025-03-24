import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';

const ContactList = () => {
    const { clientId } = useParams();
    const [contacts, setContacts] = useState([]);
    const [clientData, setClientData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [message, setMessage] = useState(""); 

    useEffect(() => {
        api.get(`/contacts/client/${clientId}`)
            .then(response => {
                setContacts(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar contatos:", error);
            });

        api.get(`/clients/${clientId}`)
            .then(response => {
                setClientData(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados do cliente:", error);
            });
    }, [clientId]);

    const handleDelete = (contactId) => {
        setContactToDelete(contactId);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (contactToDelete) {
            api.delete(`/contacts/${contactToDelete}`)
                .then(() => {
                    setContacts(contacts.filter(contact => contact.id !== contactToDelete));
                    setShowModal(false);
                    setMessage("Contato excluído com sucesso!"); 
                })
                .catch(error => {
                    console.error("Erro ao excluir contato:", error);
                    setShowModal(false);
                    setMessage("Ocorreu um erro ao excluir o contato."); 
                });
        }
    };

    return (
        <Container>
            <h2 className="text-start mt-4">Contatos do Cliente</h2>
            
            {clientData && (
                <div className="text-start mb-4">
                    <h4>{clientData.name}</h4>
                    <p><strong>CPF:</strong> {clientData.cpf}</p>
                </div>
            )}


            
            {message && (
                <div className="alert alert-info text-center" role="alert">
                    {message}
                </div>
            )}

            
            {contacts.length === 0 ? (
                <div className="text-start">
                    <p><strong>O Cliente não possui nenhum contato cadastrado!</strong></p>
                </div>
            ) : (
                <Row className="d-flex justify-content-start">
                    {contacts.map(contact => (
                        <Col key={contact.id} md={6} lg={4} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{contact.contactType}</Card.Title>
                                    <Card.Text>
                                        <strong>Valor:</strong> {contact.contactValue} <br />
                                        <strong>Observação:</strong> {contact.observation}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/clients/${clientId}/contacts/${contact.id}/edit`}>
                                            <Button variant="warning" size="sm">Editar</Button>
                                        </Link>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(contact.id)}>Excluir</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            
            <div className="d-flex justify-content-center mb-4">
                <Link to={`/clients/${clientId}/contacts/new`}>
                    <Button variant="primary">Cadastrar Contato</Button>
                </Link>
            </div>

            
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja excluir este contato?
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
        </Container>
    );
};

export default ContactList;
