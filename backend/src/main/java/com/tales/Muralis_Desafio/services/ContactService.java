package com.tales.Muralis_Desafio.services;

import com.tales.Muralis_Desafio.entities.Client;
import com.tales.Muralis_Desafio.entities.Contact;
import com.tales.Muralis_Desafio.repositories.ClientRepository;
import com.tales.Muralis_Desafio.repositories.ContactRepository;
import com.tales.Muralis_Desafio.services.exceptions.DataBaseException;
import com.tales.Muralis_Desafio.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.Access;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<Contact> findAll() {
        return contactRepository.findAll();
    }


    public List<Contact> findByClientId(Long id) {
        return contactRepository.findByClientId(id);
    }

    public Contact insert(Contact contact) {
        Client client = clientRepository.findById(contact.getClient().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with ID: " + contact.getClient().getId()));

        contact.setClient(client);
        return contactRepository.save(contact);
    }

    public void delete(Long id) {
        try{
            contactRepository.deleteById(id);
        }catch(EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(id);
        }catch(DataIntegrityViolationException e){
            throw new DataBaseException(e.getMessage());
        }
    }

    public Contact update(Long contactId, Contact contactDetails) {
        Contact existingContact = contactRepository.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found with ID: " + contactId));

        existingContact.setContactType(contactDetails.getContactType());
        existingContact.setContactValue(contactDetails.getContactValue());
        existingContact.setObservation(contactDetails.getObservation());

        return contactRepository.save(existingContact);
    }

    public Contact findById(Long id) {
        Optional<Contact> contact = contactRepository.findById(id);
        return contact.orElseThrow(() -> new ResourceNotFoundException(id));
    }
}
