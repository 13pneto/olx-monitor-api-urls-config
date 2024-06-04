require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser'); 
const urlRoutes = require('./routes/url-routes');

const db = require('./db');


// API
const app = express();
app.use(bodyParser.json());

//ROTAS
app.use('/urls', urlRoutes);

// START API
const PORT = process.env.PORT || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// STATIC FILES
app.use(express.static(__dirname));

// SEND HTML
app.get('/', (req, res) => {
    // Passa a variável de ambiente para o arquivo HTML
    const SERVER_IP = '192.168.3.18';
    res.sendFile(path.join(__dirname, 'index.html'));
  });


//MODULE EXPORTS
module.exports = db;
