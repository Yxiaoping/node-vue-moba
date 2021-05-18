// 引入mongoDB数据库
const mongoose = require('mongoose')
// 创建模型

// 1.创建schema（模式）（约束）对象
const schema = new mongoose.Schema({
    name: {type: String},
    // 保存的是图片地址
    avatar: {type: String},
    banner: {type: String},
    title: {type: String},
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    scores: {
        difficult: {type: Number},
        skills: {type: Number},
        attack: {type: Number},
        survive: {type: Number}
    },
    skills: [{
        icon: {type: String},
        name: {type: String},
        delay: {type: String},
        cost: {type: String},
        decription: {type: String},
        tips: {type: String}
    }],
    items1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    items2: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    usageTips: {type: String},
    battleTips: {type: String},
    teamTips: {type: String},
    partners: [{
        hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
        decription: {type: String}
    }]
})

// 2.创建model，Category是要映射的集合名
// mongoose会自动将集合名变成复数
// module.exports 将模型对象赋值给exports，引入文件时就能直接引入到模型对象
module.exports = mongoose.model('Hero', schema, 'heroes')
// 3.向数据库插入一个文档，在routes中