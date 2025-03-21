package com.tales.Muralis_Desafio.entities;

import com.tales.Muralis_Desafio.enums.ContactType;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "tb_contacts")
public class Contact implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @ManyToOne
    @JoinColumn(name ="client_id")
    private Client client;

    //RN02: Os campos Tipo do Contato e Valor do Contato são obrigatórios no cadastro do contato;
    @NotNull
    private ContactType contactType;

    @NotNull
    private String contactValue;

    private String observation;

    public Contact() {}

    public Contact(Long id, Client client, ContactType contactType, String contactValue, String observation) {
        Id = id;
        this.client = client;
        this.contactType = contactType;
        this.contactValue = contactValue;
        this.observation = observation;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public ContactType getContactType() {
        return contactType;
    }

    public void setContactType(ContactType contactType) {
        this.contactType = contactType;
    }

    public String getContactValue() {
        return contactValue;
    }

    public void setContactValue(String contactValue) {
        this.contactValue = contactValue;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Contact contacts)) return false;
        return Id.equals(contacts.Id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(Id);
    }
}
