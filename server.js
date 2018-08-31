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
});

server.get('/projects/:id', (req, res) => {
    dbProject.get(req.params.id)
    .then(project => {
        // console.log(project);
        if (!project) {
            res.status(404).json({ message: 'The project with the specified ID does not exist.' });
            return;
        }
        res.status(200).json(project);
    })
    .catch(err => {
        console.error('error', err);
        res.status(500).json({ error: 'The project information could not be retrieved.'})
    })
});

server.post('/projects', (req, res) => {
    const { name, description, completed } = req.body;
    if (!name || !description) {
        res.status(400).json({ errorMessage: 'Both name and description are required. Please complete both fields and try again.' });
        return;
    }
    dbProject.insert({
        name,
        description,
        completed
    })
    .then(response => {
        res.status(201).json(req.body);
    })
    .catch(error => {
        console.error('error', err);
        res.status(500).json({ error: 'There was an error while saving the project to the database' });
        return;
    })
});

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    dbProject.remove(id)
        .then(count => {
            // console.log(count);
            if (count) {
                res.status(202).json({ message: 'Project has been deleted'}).end();
            } else {
                res.status(404).json({ message: 'The project with the specified ID does not exist.' })
            }
        })
        .catch(error => res.status(500).json({ error: 'The project could not be removed' }));
});

server.listen(7500, () => console.log('/n== API on port 7.5k ==/n') );