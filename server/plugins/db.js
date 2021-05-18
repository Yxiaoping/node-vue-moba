// 定义一个模块，用来连接mongoDB数据库
module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.set('useFindAndModify', false)
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

    // 将所有模型引用一次，不做操作，防止报错
    require('require-all')(__dirname + '/../models')
}