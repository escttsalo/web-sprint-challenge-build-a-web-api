// add middlewares here related to actions
const Action = require('./actions-model')
// const Project = require('../projects/projects-model')

const validateActionId = async (req, res, next) => {
    try{
        const { id } = req.params
        const actions = await Action.get(id)
        if (actions){
            req.actions = actions
            next()
        } else {
            next({
                status: 404,
                message: 'not found'
            })
        }
    } catch (err) {
        next(err)
    }
}

const validateAction = async ( req, res, next) => {
    const { project_id, description, notes } = req.body
    if (!project_id || !description || !notes) {
        res.status(400).json({message: 'missing required name or description or completed'})
    }
    // if (project_id){
    //     const project = await Project.get(project_id)
    //     if (project) {
    //         next()
    //     } else {
    //         res.status(400).json({message: `project with id ${project_id} does not exist`})
    //     }
    // }
    // if (description.length > 128 ){
    //     res.status().json({message: "Description can only be 128 characters long"})
    // }
    next()
}

module.exports = {
    validateActionId,
    validateAction
}