const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Diretório onde o arquivo do banco de dados será armazenado
const dataDir = '../data';

// Certifica-se de que o diretório exista
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Caminho do arquivo do banco de dados SQLite
const dbPath = path.join(dataDir, 'data.db');


const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite');
        // Criar a tabela tb_urls se ela não existir
        db.run(`
            CREATE TABLE IF NOT EXISTS tb_urls (
                id INTEGER PRIMARY KEY,
                url TEXT NOT NULL,
                description TEXT
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela tb_urls:', err.message);
            } else {
                console.log('Tabela tb_urls criada ou já existente');
            }
        });
    }
});

module.exports = db;