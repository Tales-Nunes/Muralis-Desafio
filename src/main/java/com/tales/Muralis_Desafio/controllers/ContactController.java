package com.tales.Muralis_Desafio.controllers;

import com.tales.Muralis_Desafio.entities.Client;
import com.tales.Muralis_Desafio.entities.Contact;
import com.tales.Muralis_Desafio.services.ClientService;
import com.tales.Muralis_Desafio.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping
    public ResponseEntity<List<Contact>> findAll(){
        List<Contact> contacts = contactService.findAll();
        return ResponseEntity.ok().body(contacts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Contact>> findByClientId(@PathVariable Long id){
        List<Contact> contacts = contactService.findByClientId(id);
        return ResponseEntity.ok().body(contacts);
    }


}