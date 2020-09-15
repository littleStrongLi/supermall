import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  addCart(context, plyload){
    //判断数组中是否存在相同商品
    let oldProduce = context.state.cartList.find(p => p.iid === plyload.iid)

    //判断oldProduce，存在将商品数量 +1，不存在就将商品加入cartList
   if(oldProduce){
      context.commit(ADD_COUNTER, oldProduce)
    }
    else{
      plyload.count = 1;
      context.commit(ADD_TO_CART, plyload)
    }
  },
}