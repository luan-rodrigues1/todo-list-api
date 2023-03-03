# todo-list-api

API desenvolvida para auxiliar na organização de suas tarefas diárias

## Tabela de Conteúdos

- [Visão Geral](#1-vis%C3%A3o-geral)
- [Diagrama ER](#2-diagrama-er)
- [Comandos](#3---comandos)
- [Variáveis de Ambiente](#4---vari%C3%A1veis-de-ambiente)
- [Migrations](#5---migrations)
- [Endpoints](#6-endpoints)
- [Documentação](#7-documenta%C3%A7%C3%A3o)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

---

## 2. Diagrama ER

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![Design sem nome (15)](https://user-images.githubusercontent.com/106760673/222546175-e95600aa-c130-4f96-a62c-354ff672f435.png)

---

## 3 - Comandos

[ Voltar para o topo ](#todo-list-api)

 - Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn install
```

- Para rodar a aplicação use o comando:

```shell
yarn dev
```

- Para rodar testes use o comando:

```shell
yarn test
```


## 4 - Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.


## 5 - Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 6. Endpoints

[ Voltar para o topo ](#todo-list-api)

### Índice

- [Users](#cria%C3%A7%C3%A3o-de-usu%C3%A1rio)
    - [POST - /users](#cria%C3%A7%C3%A3o-de-usu%C3%A1rio)
    - [GET - /users](#listar-informa%C3%A7%C3%B5es-do-usu%C3%A1rio-logado)
    - [PATCH - /users](#atualiza%C3%A7%C3%A3o-de-usu%C3%A1rio)
    - [DELETE - /users](#deletar-usu%C3%A1rio)
- [Login](#login-de-usu%C3%A1rio)
    - [POST - /login](#login-de-usu%C3%A1rio)
- [Tasks](#criar-tarefas)
    - [POST - /tasks](#criar-tarefas)
    - [GET - /tasks](#listar-tarefas-por-categoria)
    - [PATCH - /tasks](#atualiza%C3%A7%C3%A3o-de-usu%C3%A1rio)
    - [DELETE - /tasks](#deletar-tarefa)

---

## 7. Documentação

### **Criação de Usuário**
### `/users`

### Exemplo de Request:
```
POST /users
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Luan rodrigues",
	"email": "luanRodrigues@mail.com",
	"password": "1234"
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "d09eaaa0-6cdd-4525-9166-a92ec8bc14b0",
	"name": "Luan rodrigues",
	"email": "luanRodrigues@mail.com",
	"createdAt": "2023-03-01T17:46:59.408Z",
	"updatedAt": "2023-03-01T17:46:59.408Z",
	"isActive": true
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | User already exists! |

---

### **Listar informações do usuário logado**
### `/users`

### Exemplo de Request:
```
GET /users
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```

```json
{
	"id": "d09eaaa0-6cdd-4525-9166-a92ec8bc14b0",
	"name": "Luan rodrigues",
	"email": "luanRodrigues@mail.com",
	"createdAt": "2023-03-01T17:46:59.408Z",
	"updatedAt": "2023-03-01T17:46:59.408Z",
	"isActive": true,
	"tasks": [
		{
			"id": "3bde1e03-eb86-4434-9e94-0832688b44fa",
			"name": "Estudar node.js",
			"priority": "Média",
			"description": "estudar upload de imagens",
			"category": "Estudo",
			"completed": false,
			"createdAt": "2023-03-01T18:07:43.549Z"
		},
		{
			"id": "860652fa-32d1-4432-84fa-355ff8aa4243",
			"name": "Finalizar Readme",
			"priority": "Baixa",
			"description": "",
			"category": "Trabalho",
			"completed": false,
			"createdAt": "2023-03-01T18:13:26.943Z"
		}
	]
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid Token |

---

### **Atualização de Usuário**
### `/users`

### Exemplo de Request:
```
PATCH /users
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Luan rodrigues carlos",
	"email": "luanRodrigues@mail.com",
	"password": "123456"
}
```

### Exemplo de Response:
```
200 OK
```

```json
{
	"id": "d09eaaa0-6cdd-4525-9166-a92ec8bc14b0",
	"name": "Luan rodrigues carlos",
	"email": "luanRodriguesCarlos@mail.com",
	"createdAt": "2023-03-01T17:46:59.408Z",
	"updatedAt": "2023-03-01T18:28:32.997Z",
	"isActive": true
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 400 Bad Request   | It is not possible to change this data |
| 401 Unauthorized   | Invalid Token |
| 409 Conflict   | A user with this email already exists |

---

### **Deletar Usuário**
### `/users`

### Exemplo de Request:
```
DELETE /users
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No Content
```

```json
Nenhuma informação é retornada nessa requisição
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid Token |

---

### **Login de Usuário**
### `/login`

### Exemplo de Request:
```
POST /login
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email": "luanRodrigues@mail.com",
	"password": "1234"
}
```

### Exemplo de Response:
```
200 OK
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6ImYzNTkzZDc3LWQyNDEtNGU5MS04OGFjLWMyYzZkN2VjOTYxNyIsImlhdCI6MTY3NzcwODk0OCwiZXhwIjoxNjc3Nzk1MzQ4LCJzdWIiOiJmMzU5M2Q3Ny1kMjQxLTRlOTEtODhhYy1jMmM2ZDdlYzk2MTcifQ.DS4tXxU-gb1Ksp4zrxljvwYoo8rtRvcORaGbI18dbag"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid Token |

---

### **Criar Tarefas**
### `/tasks`

### Exemplo de Request:
```
POST /tasks
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Estudar node.js",
	"priority": "Média",
	"description": "estudar upload de imagens",
	"category": "Estudo"
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "3bde1e03-eb86-4434-9e94-0832688b44fa",
	"name": "Estudar node.js",
	"priority": "Média",
	"description": "estudar upload de imagens",
	"category": "Estudo",
	"completed": false,
	"createdAt": "2023-03-01T18:07:43.549Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 400 Bad Request   | The priority field value is invalid |
| 401 Unauthorized   | Invalid Token |

---

### **Listar tarefas por categoria**
### `/tasks/{Nome da categoria}`

### Exemplo de Request:
```
GET /tasks/estudo
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```

```json
[
	{
		"id": "d16bf096-903c-431d-aec0-925abaa375c5",
		"name": "Estudar node.js",
		"priority": "Média",
		"description": "estudar upload de imagens",
		"category": "Estudo",
		"completed": false,
		"createdAt": "2023-03-02T16:10:12.071Z"
	},
	{
		"id": "633d00fc-8844-4a31-b401-ef772d07e87a",
		"name": "Estudar React Native",
		"priority": "Baixa",
		"description": "estudar como fazer navegação entre telas, para iniciar novo projeto",
		"category": "Estudo",
		"completed": false,
		"createdAt": "2023-03-02T16:26:12.783Z"
	}
]
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid Token |
| 404 Not Found   | category not found |

---

### **Atualizar tarefa**
### `/tasks/{id da tarefa}`

### Exemplo de Request:
```
PATCH /tasks/633d00fc-8844-4a31-b401-ef772d07e87a
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "ler documentação do React Native",
	"priority": "Alta",
	"description": "estudar como fazer navegação entre telas, para iniciar novo projeto com várias telas",
	"category": "Trabalho",
	"completed": true
}
```

### Exemplo de Response:
```
200 OK
```

```json
{
	"id": "633d00fc-8844-4a31-b401-ef772d07e87a",
	"name": "ler documentação do React Native",
	"priority": "Alta",
	"description": "estudar como fazer navegação entre telas, para iniciar novo projeto com várias telas",
	"category": "Trabalho",
	"completed": true,
	"createdAt": "2023-03-02T16:26:12.783Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 400 Bad Request   | The priority field value is invalid|
| 401 Unauthorized   | Invalid Token |
| 401 Unauthorized   | missing permissions |
| 404 Unauthorized   | Task not found |

---

### **Deletar Tarefa**
### `/tasks/{id da tarefa}`

### Exemplo de Request:
```
DELETE /tasks/633d00fc-8844-4a31-b401-ef772d07e87a
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No Content
```

```json
Nenhuma informação é retornada nessa requisição
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid Token |
| 401 Unauthorized   | missing permissions |
| 404 Unauthorized   | Task not found |

---
