const express = require('express');
const server = express();

server.use(express.json());

// Query params = ?teste=1 (req.query)
// Route params =/users/1   (req.params)
// Request body = {"name": "Magno", "email": "magno@mail.com"} (req.body)

const users = ['Magno', 'Bruno', 'Robson', 'Camile', 'Ávila'];

// Middleware global
server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url};`);
  next();
  console.timeEnd('Request');
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'username é obrigatório' });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!users[req.params.index]) {
    return res.status(404).json({ error: 'index não existe' });
  }

  req.user = user;

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post('/users/', checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
