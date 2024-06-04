const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para obter a lista de URLs
router.get('/', (req, res) => {
    // Consulta SQL para selecionar todas as URLs da tabela tb_urls
    const sql = 'SELECT * FROM tb_urls';
    // Executar consulta

    db.all(sql, (err, result) => {
        if (err) throw err;
        // Retornar resultados em formato JSON
        res.json(result);
    });
});
  
// Rota para obter a lista de URLs
router.delete('/:id', (req, res) => {
    const urlId = req.params.id;

    const sql = 'DELETE FROM tb_urls WHERE id = ?';
    // Executar consulta
    db.run(sql, urlId, (err, result) => {
        if (err) throw err;
        // Retornar resultados em formato JSON
        res.json(result);
    });
});

router.post('/', (req, res) => {
    const { url, description } = req.body;
    // Consulta SQL para inserir a nova URL na tabela tb_urls
    const sql = 'INSERT INTO tb_urls (url, description) VALUES (?, ?)';
    // Executar consulta
    db.run(sql, [url, description], (err, result) => {
        if (err) {
            // Se houver um erro, retornar um status 500 e uma mensagem de erro
            res.status(500).json({ error: 'Erro ao adicionar a URL' });
            return;
        }
        // Se a inserção for bem-sucedida, retornar um status 201 e uma mensagem de sucesso
        res.status(201).json({ message: 'URL adicionada com sucesso' });
    });
});

module.exports = router;