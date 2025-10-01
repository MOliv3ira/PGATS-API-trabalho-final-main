
# PGATS Automação API - Trabalho Final

API REST para gerenciamento de tarefas com autenticação JWT, documentação Swagger (`swagger.json`) e banco de dados em memória.

---

## Tecnologias Utilizadas

- Node.js
- Express
- JWT (jsonwebtoken)
- Swagger (swagger-ui-express)
- Mocha, Chai e Supertest (para testes automatizados)

---

## Instalação

1. Clone o repositório ou baixe os arquivos:
	```bash
	git clone <url-do-repositorio>
	cd PGATS-API-trabalho-final-main
	```
2. Instale as dependências:
	```bash
	npm install
	```

---

## Como Executar

- **Modo desenvolvimento (com auto-reload):**
  ```bash
  npx nodemon server.js
  ```
- **Modo produção:**
  ```bash
  node server.js
  ```

A API estará disponível em:
`http://localhost:3000`

---

## Como Rodar os Testes

1. Instale as dependências de desenvolvimento (caso ainda não tenha feito):
	```bash
	npm install --save-dev mocha chai supertest
	```
2. Execute os testes:
	```bash
	npm test
	```

---

## Documentação

Acesse a documentação Swagger em:
`http://localhost:3000/api-docs`

---

## Endpoints

- POST /register — Cadastro de usuário
- POST /login — Login e obtenção de token JWT
- POST /tasks — Criar tarefa (autenticado)
- GET /tasks — Listar tarefas (autenticado)
- GET /tasks/:id — Detalhes da tarefa (autenticado)
- PUT /tasks/:id — Editar tarefa (autenticado)
- DELETE /tasks/:id — Excluir tarefa (autenticado)
- POST /tasks/:id/complete — Marcar como concluída (autenticado)

---

## Observações

- Banco em memória (dados perdidos ao reiniciar).
- Endpoints de tarefas exigem JWT (Authorization: Bearer <token>).
- Mensagens de erro claras e status HTTP corretos.
- Swagger vinculado a swagger.json para fácil manutenção e testes.
