const express = require('express');
const bodyParser = require('body-parser');

const talkers = require('./utils/fsUtils');
const generateToken = require('./utils/generateToken');

const validateRoute = require('./middleware/talker/validateRoute');
const validateEmail = require('./middleware/login/validateEmail');
const validatePassword = require('./middleware/login/validatePassword');
const validateToken = require('./middleware/talker/validateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const data = await talkers();
  response.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', validateRoute, (_request, response) => {
  response.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validateEmail, validatePassword, (_request, response) => {
  const token = generateToken();
  response.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validateToken, (_resquest, response) => {
  response.status(201).json({ message: 'Token autorizado' });
});

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = app;