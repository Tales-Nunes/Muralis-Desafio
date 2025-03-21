package com.tales.Muralis_Desafio.services;

import com.tales.Muralis_Desafio.entities.Client;
import com.tales.Muralis_Desafio.entities.Contact;
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

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;

    public List<Contact> findAll() {
        return contactRepository.findAll();
    }


    public List<Contact> findByClientId(Long id) {
        return contactRepository.findByClientId(id);
    }

    public Contact insert(Contact contact) {
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

    public Contact update(Long id, Contact contact) {
        try{
            Contact entity = contactRepository.getReferenceById(id);
            updateData(entity, contact);
            return contactRepository.save(entity);
        }catch(EntityNotFoundException e){
            throw new ResourceNotFoundException(id);
        }

    }

    private void updateData(Contact entity, Contact contact) {
        entity.setClient(contact.getClient());
        entity.setContactType(contact.getContactType());
        entity.setContactValue(contact.getContactValue());
        entity.setObservation(contact.getObservation());

    }
}
