const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../app'); // ajuste o caminho se necessário

let token;
let taskId;
const user = { username: 'usuarioTeste', password: 'senha123' };

describe('Testes dos endpoints da API', function() {
  this.timeout(5000);

  it('Deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/register')
      .send(user);
    expect([200, 201]).to.include(res.statusCode);
  });

  it('Deve fazer login e retornar um token JWT', async () => {
    const res = await request(app)
      .post('/login')
      .send(user);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('token');
    token = res.body.token;
  });

  it('Deve criar uma nova tarefa', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Tarefa Teste',
        description: 'Descrição da tarefa',
        dueDate: '2099-12-31',
        priority: 'high'
      });
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property('id');
    taskId = res.body.id;
  });

  it('Deve listar as tarefas', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('Deve retornar detalhes de uma tarefa', async () => {
    const res = await request(app)
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('id', taskId);
  });

  it('Deve editar uma tarefa', async () => {
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Tarefa Editada',
        description: 'Nova descrição',
        dueDate: '2099-12-31',
        priority: 'medium'
      });
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('title', 'Tarefa Editada');
  });

  it('Deve marcar uma tarefa como concluída', async () => {
    const res = await request(app)
      .post(`/tasks/${taskId}/complete`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('message', 'Task marcada como concluída.');
  });

  it('Deve excluir uma tarefa', async () => {
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('message', 'Task excluída com sucesso.');
  });
});
