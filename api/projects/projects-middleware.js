// add middlewares here related to projects
const Project = require('./projects-model')

const validateProjectId = async (req, res, next) => {
    try{
        const { id } = req.params
        const project = await Project.get(id)
        if (project){
            req.project = project
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

const validateProject = ( req, res, next) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({message: 'missing required name or description or completed'})
    }
    next()
}


module.exports = {
    validateProjectId,
    validateProject
}