const express = require('express');


const ProjectRouter = require('./projects/projects-router.js');

const server = express();


server.use(express.json());

server.use('/api/projects', ProjectRouter);

server.get('/', (req, res) => {
    res.send('HELLO TESTING')
  });

module.exports = server