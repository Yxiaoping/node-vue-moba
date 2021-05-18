module.exports = options => {
    return async(req,res,next)=> {
        const modelName = await require('inflection').classify(req.params.resource)
        // const Model = require(`../../models/${modelName}`) const 会导致访问不到
        req.Model = require(`../models/${modelName}`)
        // 在请求对象上挂在一个属性Model
        next()
    }
}