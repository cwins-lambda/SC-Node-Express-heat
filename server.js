const express = require('express');
const server = express();
const dbProject = require('./data/helpers/projectModel.js');
const dbAction = require('./data/helpers/actionModel.js');


// configure middleware
server.use(express.json());


// Generic routing -------------------------
server.get('/', (req, res) => {
    res.send('Welcome to Node-Express-Sprint, an express middleware production');
} );

// Project routing -------------------------
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

server.put('/projects/:id', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400).json({ errorMessage: 'Please provide both the project name and description.' });
        return;
    }
    dbProject.update(req.params.id, req.body)
        .then(project => {
            if (project) {
                res.status(200).json(req.body)
                // console.log(req.body);
            } else {
                res.status(404).json({ message: 'The project with the specified ID does not exist.' })
            }
            
        })
        .catch(err => res.status(500).json({ message: 'The project information could not be modified.' }));
});

server.get('/projects/:id/actions', (req, res) => {
    dbProject.getProjectActions(req.params.id)
    .then(projectActions => {
        console.log(projectActions.length);
        if (projectActions.length === 0) {
            res.status(404).json({ message: 'The project with the specified ID either does not exist or does not have any actions.' });
            return;
        }
        res.status(200).json(projectActions);
    })
    .catch(err => {
        console.error('error', err);
        res.status(500).json({ error: 'The project information could not be retrieved.'})
    })
});

// Actions routing -------------------------
server.get('/actions', (req, res) => {
    dbAction.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The actions information could not be retrieved.' });
    })
});

server.get('/actions/:id', (req, res) => {
    dbAction.get(req.params.id)
    .then(action => {
        // console.log(action);
        if (!action) {
            res.status(404).json({ message: 'The action with the specified ID does not exist.' });
            return;
        }
        res.status(200).json(action);
    })
    .catch(err => {
        console.error('error', err);
        res.status(500).json({ error: 'The action information could not be retrieved.'})
    })
});

server.post('/actions', (req, res) => {
    const { description, notes, completed, project_id } = req.body;
    if (!description || !notes) {
        res.status(400).json({ errorMessage: 'Please provide both a description and notes for this action.' });
        return;
    }
    dbAction.insert({
        project_id,
        description,
        notes,
        completed
    })
    .then(response => {
        res.status(201).json(req.body);
    })
    .catch(error => {
        console.error('error', err);
        res.status(500).json({ error: 'There was an error while saving the action to the database' });
        return;
    })
});

server.delete('/actions/:id', (req, res) => {
    const { id } = req.params;
    dbAction.remove(id)
        .then(count => {
            // console.log(count);
            if (count) {
                res.status(202).json({ message: 'Action has been deleted'}).end();
            } else {
                res.status(404).json({ message: 'The action with the specified ID does not exist.' })
            }
        })
        .catch(error => res.status(500).json({ error: 'The action could not be removed' }));
});

server.listen(7500, () => console.log('/n== API on port 7.5k ==/n') );