const express = require('express');
const { notFound, errorHandling } = require('./middleware')
const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send(`<h2>Why hello there</h2>`)
})

server.use('*', notFound)
server.use(errorHandling)

module.exports = server;
