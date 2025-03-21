package com.tales.Muralis_Desafio.repositories;

import com.tales.Muralis_Desafio.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByClientId(Long clienteId);
}
