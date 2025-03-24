package com.tales.Muralis_Desafio.controllers;

import com.tales.Muralis_Desafio.entities.Client;
import com.tales.Muralis_Desafio.repositories.ClientRepository;
import com.tales.Muralis_Desafio.services.ClientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public ResponseEntity<List<Client>> findAll(){
        List<Client> clients = clientService.findAll();
        return ResponseEntity.ok().body(clients);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Client> findById(@PathVariable Long id){
        Client client = clientService.findById(id);
        return ResponseEntity.ok().body(client);
    }

    @GetMapping(value = "/name/{name}")
    public ResponseEntity<List<Client>> findByName(@PathVariable String name){
        List<Client> client = clientService.findByName(name);
        return ResponseEntity.ok().body(client);
    }
    @GetMapping(value = "/cpf/{cpf}")
    public ResponseEntity<Client> findByCpf(@PathVariable String cpf){
        Client client = clientService.findByCpf(cpf);
        return ResponseEntity.ok().body(client);
    }

    @PostMapping
    public ResponseEntity<Client> insert(@Valid @RequestBody Client client){
        client = clientService.insert(client);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(client.getId()).toUri();
        return ResponseEntity.created(uri).body(client);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        clientService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Client> update(@PathVariable Long id, @RequestBody Client client) {
        client = clientService.update(id, client);
        return ResponseEntity.ok().body(client);
    }




}
