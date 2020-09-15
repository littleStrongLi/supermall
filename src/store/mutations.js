import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  //存在的商品数量 +1
  [ADD_COUNTER](state, plyload){
    plyload.count++;
  },

  //不存在的商品加入cartList
  [ADD_TO_CART](state, plyload){
    plyload.checked = false; //商品是否选中的属性
    state.cartList.push(plyload);
  }
}