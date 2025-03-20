package com.tales.Muralis_Desafio.config;

import com.tales.Muralis_Desafio.entities.Client;
import com.tales.Muralis_Desafio.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.text.SimpleDateFormat;
import java.util.Arrays;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {
    @Autowired
    private ClientRepository clientRepository;

    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

    @Override
    public void run(String... args) throws Exception {
        Client cli1 = new Client(null, "Tales", "50487372883", sdf.parse("19/04/2002"), "rua 1 08752111");
        Client cli2 = new Client(null, "Alicia", "46907767848", sdf.parse("01/01/2001"), "rua 2 108510021");
        clientRepository.saveAll(Arrays.asList(cli1, cli2));
    }
}
