import { http } from '../plugins/axios'

//用户状态存储
const state = () => ({
  token: '',
  id: '',
  email: "",
  nickname: "",
  avatar: ''
})
//方法
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.id = user._id
    state.email = user.email
    state.nickname = user.nickname
    state.avatar = user.avatar
  }
}
//异步事件
const actions = {
  //派发一个登录事件
  login: async ({ state, commit }, data) => {
    let ret = await http.post('/user/login', data)
    //登录返回token
    commit('SET_TOKEN', ret.data.token);
    return ret;
  },
  //获取用户详情
  detail: async ({ state, commit }, data) => {
    let ret = await http.get('/user/detail')
    if (ret.code === 200) {
      commit('SET_USER', ret.data)
      return ret;
    }
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}