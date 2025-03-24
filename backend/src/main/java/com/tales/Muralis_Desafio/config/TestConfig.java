package com.tales.Muralis_Desafio.config;

import com.tales.Muralis_Desafio.entities.Client;
import com.tales.Muralis_Desafio.entities.Contact;
import com.tales.Muralis_Desafio.enums.ContactType;
import com.tales.Muralis_Desafio.repositories.ClientRepository;
import com.tales.Muralis_Desafio.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDate;
import java.util.Arrays;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ContactRepository contactRepository;

    @Override
    public void run(String... args) throws Exception {
        // Usando LocalDate para definir as datas de nascimento
        Client cli1 = new Client(null, "Tales", "50487372883", LocalDate.of(2002, 4, 19), "rua 1 08752111");
        Client cli2 = new Client(null, "Alicia", "46907767848", LocalDate.of(2001, 1, 1), "rua 2 108510021");

        clientRepository.saveAll(Arrays.asList(cli1, cli2));

        Contact con1 = new Contact(null, cli1, ContactType.EMAIL, "tales@example.com", "contato 1 de cliente Tales");
        Contact con2 = new Contact(null, cli2, ContactType.EMAIL, "alicia@example.com", "contato 1 de cliente Alicia");
        Contact con3 = new Contact(null, cli1, ContactType.TELEFONE, "11996983359", "contato 2 de cliente Tales");

        contactRepository.saveAll(Arrays.asList(con1, con2, con3));
    }
}
