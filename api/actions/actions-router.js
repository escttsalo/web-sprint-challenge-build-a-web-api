const express = require('express');
const { validateActionId, validateAction } = require('./actions-middleware');
const Action = require('./actions-model');

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const actions = await Action.get()
        if (actions){
            res.status(200).json(actions)
        } else {
            res.status(200).json([])
        }
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.actions)
})

router.post('/', validateAction, async (req, res, next) => {
    try {
        const newAction = await Action.insert(req.body)
        console.log(newAction)
        res.status(201).json(newAction)
    } catch(err) {
        next()
    }
})

router.put('/:id', validateActionId, validateAction, async (req, res, next) => {
    try {
        const updatedAction = await Action.update(req.params.id, req.body)
        res.status(200).json(updatedAction)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id)
        res.status(200).json()
    } catch (err) {
        next(err)
    }
})

module.exports = router