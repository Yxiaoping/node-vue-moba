// 引入mongoDB数据库
const mongoose = require('mongoose')
// 创建模型

// 1.创建schema（模式）（约束）对象
const schema = new mongoose.Schema({
    title: {type: String},
    // 保存的是图片地址
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    body: {type: String}
},{
    timestamps: true
})

// 2.创建model，Category是要映射的集合名
// mongoose会自动将集合名变成复数
// module.exports 将模型对象赋值给exports，引入文件时就能直接引入到模型对象
module.exports = mongoose.model('Article', schema)
// 3.向数据库插入一个文档，在routes中