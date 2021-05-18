import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})
// 请求拦截器，
http.interceptors.request.use(function (config) {
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 响应拦截器，显示错误信息
http.interceptors.response.use(res => {
    return res
},err => {
    if(err.response.data.message){
    //     Vue.prototype.$message({
    //     type: 'error',
    //     message: err.response.data.message
    // })
    Vue.prototype.$message.error(err.response.data.message)
    if(err.response.status === 401){
        router.push('/login')
    }
    }
    // console.log(err.response.data.message); 这里是想要展示的信息
    return Promise.reject(err)
})

export default http