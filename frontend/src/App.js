import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ClientSearch from './components/ClientSearch';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/clients" element={<ClientList />} />
                <Route path="/clients/new" element={<ClientForm />} />
                <Route path="/clients/:id" element={<ClientForm />} />
                <Route path="/clients/search" element={<ClientSearch />} />
                <Route path="/clients/:clientId/contacts" element={<ContactList />} />
                <Route path="/clients/:clientId/contacts/new" element={<ContactForm />} />
                <Route path="/contacts/:id" element={<ContactForm />} />
            </Routes>
        </Router>
    );
}

export default App;