const express = require('express');
const { notFound, errorHandling } = require('./middleware')
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')
const server = express();

server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Why hello there</h2>`)
})

server.use('*', notFound)
server.use(errorHandling)

module.exports = server;
