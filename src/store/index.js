import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//1.安装插件
Vue.use(Vuex);

//2.创建实例
const state = {
  cartList: [],
}

const store = new Vuex.Store({
  state, 
  //mutations唯一的目的就是修改state中状态
  //mutations中的每个方法的功能（完成的事情）尽可能比较单一一点
  mutations,
  //异步操作、比较复杂的逻辑推荐放入actions中
  actions,
  getters
})

//3.挂载Vue实例上
export default store