# Orbita Bank - Projeto Fintech FIAP

Sistema financeiro completo com backend Spring Boot + frontend React.

## Estrutura do projeto

```
projeto-fintech/
  backend/          -> API REST (Spring Boot + JPA + Oracle)
  frontend/         -> Interface web (React + React Router)
```

## Entidades

- **Conta** - contas bancarias (corrente/poupanca)
- **Receita** - entradas de dinheiro
- **Despesa** - saidas de dinheiro

Cada entidade possui CRUD completo (GET, POST, PUT, DELETE) no backend e pagina dedicada no frontend.

## Como inicializar

### Pre-requisitos

- Java 21
- Maven
- Node.js 18+
- Acesso a instancia Oracle da FIAP

### 1. Banco de dados

Execute o script `backend/src/main/resources/schema.sql` no SQL Developer conectado na instancia Oracle da FIAP.

Ou deixe o Hibernate criar as tabelas automaticamente (configurado com `ddl-auto=update`).

### 2. Backend

```bash
cd backend

# Edite src/main/resources/application.properties com suas credenciais Oracle
# spring.datasource.username=RM_SEU_RM
# spring.datasource.password=SUA_SENHA

./mvnw spring-boot:run
# Ou no Windows: mvnw.cmd spring-boot:run
# Ou via IntelliJ: execute FintechApplication.java
```

O backend inicia em http://localhost:8080

Endpoints disponiveis:
- GET/POST http://localhost:8080/api/contas
- GET/PUT/DELETE http://localhost:8080/api/contas/{id}
- GET/POST http://localhost:8080/api/receitas
- GET/PUT/DELETE http://localhost:8080/api/receitas/{id}
- GET/POST http://localhost:8080/api/despesas
- GET/PUT/DELETE http://localhost:8080/api/despesas/{id}

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

O frontend inicia em http://localhost:3000

### Dados de autenticacao (usuario de teste)

- **Email:** admin@orbitabank.com
- **Senha:** admin123

## Tecnologias utilizadas

- Java 21
- Spring Boot 3.2
- Spring Data JPA
- Oracle Database (instancia FIAP)
- React 18
- React Router 6
