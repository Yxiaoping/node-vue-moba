const express = require('express')
// 创建express的实例app
const app = express()

// 在全局中添加一个属性，保存在token中
app.set('secret', 'wwgw7g9w6w9r3232vr')

// 中间件
app.use(require('cors')())
app.use(express.json())

// 托管靜態文件，相當於開放uploads文件
const path = require('path')
app.use('/uploads',express.static(path.join(__dirname, '/uploads')))

require('./plugins/db')(app)

// 引入admin里面的index.js，并将app传过去
require('./routes/admin')(app)

// 引入路由
require('./routes/web')(app)


app.listen(3000, () => {
    console.log('http://localhost:3000');
})