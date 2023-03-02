# todo-list-api
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
