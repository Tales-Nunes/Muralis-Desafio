package com.tales.Muralis_Desafio.services;

import com.tales.Muralis_Desafio.entities.Client;
import com.tales.Muralis_Desafio.repositories.ClientRepository;
import com.tales.Muralis_Desafio.services.exceptions.DataBaseException;
import com.tales.Muralis_Desafio.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> findAll(){
        return clientRepository.findAll();
    }

    public Client findById(Long id){
        Optional<Client> client = clientRepository.findById(id);
        return client.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public List<Client> findByName(String name) {
        List<Client> clients = clientRepository.findByName(name);
        if (clients.isEmpty()) {
            throw new ResourceNotFoundException("Customer not found with name: " + name);
        }
        return clients;
    }

    public Client findByCpf(String cpf) {
        Client client = clientRepository.findByCpf(cpf);
        if (client == null) {
            throw new ResourceNotFoundException("Customer not found with CPF: " + cpf);
        }
        return client;
    }

    public Client insert(Client client) {
        return clientRepository.save(client);
    }

    public void delete(Long id) {
        try{
            clientRepository.deleteById(id);
        }catch(EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(id);
        }catch(DataIntegrityViolationException e){
            throw new DataBaseException(e.getMessage());
        }
    }

    public Client update(Long id, Client client) {
        try{
            Client entity = clientRepository.getReferenceById(id);
            updateData(entity, client);
            return clientRepository.save(entity);
        }catch(EntityNotFoundException e){
            throw new ResourceNotFoundException(id);
        }

    }

    private void updateData(Client entity, Client client) {
        entity.setName(client.getName());
        entity.setCpf(client.getCpf());
        entity.setBirthday(client.getBirthday());
        entity.setAddress(client.getAddress());

    }
}
