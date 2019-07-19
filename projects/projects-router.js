const express = require('express');

const Projects = require('./projects-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.getProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get Projects' });
  }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const project = await Projects.findById(id);
  
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to get projects' });
    }
  });

  router.post('/', async (req, res) => {
    const projectData = req.body;
  
    try {
      const project = await Projects.addProject(projectData);
      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create new project' });
    }
  });

  router.post('/:id/actions', async (req, res) => {
    const actionData = req.body;
    const { id } = req.params; 
  
    try {
      const project = await Projects.findById(id);
  
      if (project) {
        const action = await Projects.addAction(actionData, id);
        res.status(201).json(action);
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to create new action' });
    }
  });

  router.get('/:id/actions', async (req, res) => {
    const { id } = req.params;
  
    try {
      const actions = await Projects.findActions(id);
  
      if (actions.length) {
        res.json(actions);
      } else {
        res.status(404).json({ message: 'Could not find action for given project' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to get actions' });
    }
  });

module.exports = router;