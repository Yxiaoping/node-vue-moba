module.exports = options => {   
    
    const jwt = require("jsonwebtoken")

    const assert = require('http-assert')

    const AdminUser = require('../models/AdminUser')
 return async(req,res,next) => {
    // 校验用户是否登录
    // 1. 获取用户信息
    const token = String(req.headers.authorization || '').split(' ').pop()
    // console.log(token); 在服务器端查看
    // 获取到token数据中的id
    // token必须存在
    assert(token, 401, '请先登录')
    const {id} = jwt.verify(token,req.app.get('secret'))
    // 客户端请求时的那个用户对象
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id)
    // 判断用户是否存在
    assert(req.user,401,'请先登录')
    await next()
  }
}