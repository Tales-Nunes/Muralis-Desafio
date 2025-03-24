# Muralis - Desafio Programa de Estágio

## 1. Objetivo
Este projeto foi desenvolvido como parte do desafio do programa de estágio da Muralis. O objetivo é demonstrar conhecimentos nas tecnologias frontend (React.js, HTML, CSS, JavaScript) e backend (Java com Spring Boot), além de modelagem de banco de dados (PostgreSQL). O sistema desenvolvido permite a gestão de clientes e seus respectivos contatos.

---

## 2. Tecnologias Utilizadas

### Backend:
- Java 17.0.6
- Spring Boot 3.4.3
- Hibernate 
- JPA
- PostgreSQL 17

### Frontend:
- React.js 19
- JavaScript
- Bootstrap

### Ferramentas Adicionais:
- Postman (para testes de API)
- H2 para testes
- Git/GitHub (controle de versão)

---

## 3. Funcionalidades

### 3.1. Cadastro de Clientes
- [x] Cadastro de clientes com Nome, CPF, Data de Nascimento e Endereço.
- [x] Edição dos dados de um cliente cadastrado.
- [x] Exclusão de um cliente cadastrado.
- [x] Listagem de todos os clientes cadastrados.
- [x] Busca de um cliente pelo Nome ou CPF.

### 3.2. Cadastro de Contatos
- [x] Cadastro de contatos para um cliente (Tipo do Contato, Valor do Contato, Observação).
- [x] Edição dos contatos de um cliente.
- [x] Exclusão de um contato de um cliente.
- [x] Listagem de todos os contatos de um cliente específico.

---

## 4. Regras de Negócio
- O CPF deve ser único no sistema.
- O Nome do cliente não pode estar vazio.
- A Data de Nascimento deve ser válida.
- Um cliente pode ter mais de um contato cadastrado.
- Ao excluir um cliente, todos os seus contatos devem ser removidos do sistema.
- O sistema deve validar os dados informados antes de permitir o cadastro ou edição.

---

## 5. Como Executar o Projeto

### 5.1. Configuração do Backend
1. Clone o repositório:
   ```bash
   git clone https://github.com/Tales-Nunes/Muralis-Desafio.git
   ```
2. Acesse a pasta do backend:
   ```bash
   cd backend
   ```
3. Configure o PostgreSQL no arquivo `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/muralis_db
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
   ```
4. Execute a aplicação com Maven:
   ```bash
   mvn spring-boot:run
   ```

### 5.2. Configuração do Frontend
1. Acesse a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute a aplicação:
   ```bash
   npm start
   ```
4. Acesse no navegador: `http://localhost:3000/clients`

---

## 6. Banco de Dados
O banco de dados utilizado foi o **PostgreSQL**. Segue o script para criação das tabelas:

```sql
CREATE TABLE client (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    birthday DATE NOT NULL,
    address TEXT
);

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES client(id) ON DELETE CASCADE,
    contact_type VARCHAR(50) NOT NULL,
    contact_value VARCHAR(255) NOT NULL,
    observation TEXT
);
```

---

## 7. API Endpoints
### Cliente
- **GET** `/clients` - Lista todos os clientes.
- **GET** `/clients/{id}` - Busca um cliente por ID.
- **GET** `/clients/name/{name}` - Busca um cliente pelo nome.
- **GET** `/clients/cpf/{cpf}` - Busca um cliente pelo cpf.
- **POST** `/clients` - Cria um novo cliente.
- **PUT** `/clients/{id}` - Atualiza os dados de um cliente.
- **DELETE** `/clients/{id}` - Remove um cliente e seus contatos.

### Contato
- **GET** `/contacts` - Lista todos os contatos.
- **GET** `/contacts/contact/{Id}` - Busca um contato por ID.
- **GET** `/contacts/client/{Id}` - lista todos os contatos de um cliente pelo ID.
- **POST** `/contacts` - Adiciona um contato a um cliente.
- **PUT** `/contacts/{id}` - Atualiza um contato.
- **DELETE** `/contacts/{id}` - Remove um contato.

---

## 8. Demonstração
https://drive.google.com/file/d/1S5moroHujg_S95QNUWWsCceDBZrWbN25/view?usp=sharing

---

## 9. Checklist de Implementação
- [x] CRUD de clientes
- [x] CRUD de contatos
- [x] Validação de CPF único
- [x] Validação de dados obrigatórios
- [x] Remoção em cascata dos contatos ao excluir um cliente
- [x] Frontend responsivo
- [x] Integração com API REST

---

## 10. Contato
Desenvolvido por [Tales Nunes](https://github.com/Tales-Nunes) para o desafio do programa de estágio da **Muralis**.

Se tiver alguma dúvida, entre em contato pelo e-mail ou abra uma **issue** no repositório!

---

🚀 **Obrigado pela oportunidade!**

