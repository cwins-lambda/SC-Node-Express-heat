const express = require('express');
const server = express();
const dbProject = require('./data/helpers/projectModel.js');
const dbAction = require('./data/helpers/actionModel.js');


// configure middleware
server.use(express.json());


// Project routing
server.get('/', (req, res) => {
    res.send('Welcome to Node-Express, an express middleware production');
} );

server.get('/projects', (req, res) => {
    dbProject.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The projects information could not be retrieved.' });
    })
})



server.listen(7500, () => console.log('/n== API on port 7.5k ==/n') );