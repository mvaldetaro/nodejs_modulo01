const express = require('express');
const server = express();

// Query params = ?teste=1
// Route params =/users/1
// Request body = {"name": "Magno", "email": "magno@mail.com"} //payload

server.get('/user/:id', (req, res) => {
  const nome = req.query.nome;
  const id = req.params.id;
  //return res.send('Hello World');
  return res.json({ message: `Hello, ${nome}. Id: ${id}` });
});

server.listen(3000);
