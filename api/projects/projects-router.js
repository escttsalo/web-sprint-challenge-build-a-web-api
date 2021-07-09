const express = require('express');
const Project = require('./projects-model');
const { validateProjectId, validateProject } = require('./projects-middleware')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.get()
        if (projects){
            res.status(200).json(projects)
        } else {
            res.status(200).json([])
        }
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Project.insert(req.body)
        res.status(201).json(newProject)
    } catch(err) {
        next()
    }
})

router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
    try {
        const updatedProject = await Project.update(req.params.id, req.body)
        res.status(200).json(updatedProject)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.status(200).json()
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Project.getProjectActions(req.params.id)
        if (actions) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({message: 'actions for projects not found'})
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router