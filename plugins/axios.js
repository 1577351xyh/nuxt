import Vue from 'vue'
import axios from 'axios'
//创建一个axios实例
let server = axios.create({
    timeout:8000,
    baseURL:'/api'
})

Vue.prototype.$http  = server;

