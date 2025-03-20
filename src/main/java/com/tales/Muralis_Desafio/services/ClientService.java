package com.tales.Muralis_Desafio.services;

import com.tales.Muralis_Desafio.entities.Client;
import com.tales.Muralis_Desafio.repositories.ClientRepository;
import com.tales.Muralis_Desafio.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> findAll(){
        return clientRepository.findAll();
    }

    public List<Client> findByName(String name) {
        List<Client> clients = clientRepository.findByName(name);
        if (clients.isEmpty()) {
            throw new ResourceNotFoundException("Nenhum cliente encontrado com o nome: " + name);
        }
        return clients;
    }

    public Client findByCpf(String cpf) {
        Client client = clientRepository.findByCpf(cpf);
        if (client == null) {
            throw new ResourceNotFoundException("Cliente não encontrado com o CPF: " + cpf);
        }
        return client;
    }
}
