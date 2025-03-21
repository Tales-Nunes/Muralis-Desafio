package com.tales.Muralis_Desafio.services;

import com.tales.Muralis_Desafio.entities.Contact;
import com.tales.Muralis_Desafio.repositories.ContactRepository;
import jakarta.persistence.Access;
import org.springframework.beans.factory.annotation.Autowired;
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
}
