import Vue from 'vue'
import axios from 'axios'
import { MessageBox } from 'element-ui'
//创建一个axios实例
let service = axios.create({
  timeout: 8000,
  baseURL: '/api'
})

const TOKEN_KEY = 'TOKEN'
//请求拦截
export default ({ store, redirect }) => {
  //请求拦截
  service.interceptors.request.use(
    config => {
      const token = window.localStorage.getItem(TOKEN_KEY)
      if (token) {
        //请求头带上token
        config.headers.common['Authorization'] = 'Bearer ' + token;
      }
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )
}
//响应拦截
service.interceptors.response.use(
  async response => {
    let { data, config } = response;
    console.log('拦截', response)
    if (data.code == 200) {
      if (config.url === '/api/user/login') {
        // 存储token
        localStorage.setItem(TOKEN_KEY, data.data.token)
      }
    } else if (data.code === -666) {
      //token过期了
      MessageBox.confirm('登录过期了', '过期', {
        confirmButtonText: '登录',
        showCancelButton: false,
        type: 'warning',
      }).then(() => {
        localStorage.removeItem(TOKEN_KEY);
        //重定向
        // redirect({path:'/login'})
        window.location.href='/login'
      })
    }
    return data
  },
  err => {
    return Promise.reject(err)
  }
)

Vue.prototype.$http = service;
export const http = service;
