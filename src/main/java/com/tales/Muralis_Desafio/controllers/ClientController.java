package com.tales.Muralis_Desafio.controllers;

import com.tales.Muralis_Desafio.entities.Client;
import com.tales.Muralis_Desafio.repositories.ClientRepository;
import com.tales.Muralis_Desafio.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    //RF04: O sistema deve permitir a listagem de todos os clientes cadastrados;
    @GetMapping
    public ResponseEntity<List<Client>> findAll(){
        List<Client> clients = clientService.findAll();
        return ResponseEntity.ok().body(clients);
    }

    //RF05: O sistema deve permitir a busca de um cliente pelo Nome ou CPF;
    @GetMapping(value = "/{nome}")
    public ResponseEntity<List<Client>> findByName(@PathVariable String nome){
        List<Client> client = clientService.findByName(nome);
        return ResponseEntity.ok().body(client);
    }
    @GetMapping(value = "/{nome}")
    public ResponseEntity<Client> findByCpf(@PathVariable String cpf){
        Client client = clientService.findByCpf(cpf);
        return ResponseEntity.ok().body(client);
    }




}
