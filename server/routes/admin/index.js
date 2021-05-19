module.exports = app => {

    const express = require('express')

    const jwt = require("jsonwebtoken")

    const assert = require('http-assert')

    const AdminUser = require('../../models/AdminUser') 

    const router = express.Router({
        // 合并参数
        mergeParams: true
    })


    // 登录校验中间件的封装
    const auth = require('../../middleware/auth')
    // 请求通用接口
    const resourceMiddlewave = require('../../middleware/resource')

    // 做动态的模型
    // const Category = require('../../models/Category')

    // 创建分类
    router.post('/', async (req,res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 修改分类
    router.put('/:id', async (req,res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 获取分类列表
    router.get('/', auth(), async (req,res) => {
        // const modelName = require('inflection').classify(req.params.resource)
        // return res.send(modelName) 查看modelName
        // const Model = require(`../../models/${modelName}`)
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    // 获取分类详情的接口
    router.get('/:id', async (req,res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 删除分类
    router.delete('/:id', async(req,res) => {
        await req.Model.findByIdAndRemove(req.params.id, req.body)
        res.send({
            status: true
        })
    })
    // 保存子分类，只需修改模型schema即可
    // router.post()
    
    app.use('/admin/api/rest/:resource', auth(), resourceMiddlewave(), router)

    // 上傳圖片的接口
    const multer = require("multer")
    // 定義一個上傳中間件,dest:目標地址
    const upload = multer({dest:__dirname+ '/../../uploads'})
    app.post('/admin/api/upload', auth(), upload.single('file'), async (req,res) => {
        //  這裏面就能獲取到上傳圖片
        const file = req.file
        // 拼出url,再展示
        file.url = `http://www.yxiaoping.com/uploads/${file.filename}`
        res.send(file)
    })

    // 登录的接口
    app.post('/admin/api/login', async (req,res) => {
        const {username,password} = req.body
        // 1.根据用户名找用户
        // 引入模型
        // const AdminUser = require('../../models/AdminUser') 
        const user = await AdminUser.findOne({username}).select('+password')
        // 如果用户不存在，抛出异常
        assert(user, '422', '用户不存在')
        // if(!user){
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        // 2.校验密码
        // compareSync 比较明文和密文是否匹配，参数为1明文，2密文
        const isValid = require("bcryptjs").compareSync(password,user.password)
        assert(isValid, '422', '密码错误')
        // if(!isValid){
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        // 3.返回tokex
        // const jwt = require("jsonwebtoken")
        // sign方法生成一个token，保存用户的唯一id
        // scret,给他传一个密钥
        const token = jwt.sign({id:user._id}, app.get('secret'))
        res.send({token})
    })
    // 错误处理
    app.use(async (err,req,res,next) => {
        // console.log(err);
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}