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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// STATIC FILES
app.use(express.static(__dirname));

// SEND HTML
app.get('/', (req, res) => {
    // Passa a variável de ambiente para o arquivo HTML
    res.sendFile(path.join(__dirname, 'index.html'));
  });


//MODULE EXPORTS
module.exports = db;
