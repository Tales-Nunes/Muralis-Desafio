package com.tales.Muralis_Desafio.controllers;

import com.tales.Muralis_Desafio.entities.Client;
import com.tales.Muralis_Desafio.entities.Contact;
import com.tales.Muralis_Desafio.services.ClientService;
import com.tales.Muralis_Desafio.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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

    @GetMapping(value = "contact/{id}")
    public ResponseEntity<Contact> findById(@PathVariable Long id){
        Contact contact = contactService.findById(id);
        return ResponseEntity.ok().body(contact);
    }

    @GetMapping("client/{id}")
    public ResponseEntity<List<Contact>> findByClientId(@PathVariable Long id){
        List<Contact> contacts = contactService.findByClientId(id);
        return ResponseEntity.ok().body(contacts);
    }

    @PostMapping
    public ResponseEntity<Contact> insert(@RequestBody Contact contact) {
        if (contact.getClient() == null || contact.getClient().getId() == null) {
            throw new IllegalArgumentException("client_id is mandatory.");
        }
        contact = contactService.insert(contact);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(contact.getId()).toUri();
        return ResponseEntity.created(uri).body(contact);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        contactService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> update(@PathVariable Long id, @RequestBody Contact contact) {
        Contact updatedContact = contactService.update(id, contact);
        return ResponseEntity.ok().body(updatedContact);
    }

}