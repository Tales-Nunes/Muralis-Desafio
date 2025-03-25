import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ClientSearch from './components/ClientSearch';
import Navbar from './components/Navbar'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<Navigate to="/clients" replace />} />
                        <Route path="/clients" element={<ClientList />} />
                        <Route path="/clients/new" element={<ClientForm />} />
                        <Route path="/clients/:id" element={<ClientForm />} />
                        <Route path="/clients/:clientId/contacts" element={<ContactList />} />
                        <Route path="/clients/:clientId/contacts/new" element={<ContactForm />} />
                        <Route path="/clients/:clientId/contacts/:id/edit" element={<ContactForm />} />
                        <Route path="/clients/search" element={<ClientSearch />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
