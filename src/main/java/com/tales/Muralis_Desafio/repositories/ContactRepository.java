package com.tales.Muralis_Desafio.repositories;

import com.tales.Muralis_Desafio.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
