package com.tales.Muralis_Desafio.repositories;

import com.tales.Muralis_Desafio.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findByName(String nome);
    Client findByCpf(String cpf);

}
