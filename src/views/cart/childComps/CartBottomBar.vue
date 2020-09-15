<template>
  <div class="bottom-menu">
    <check-button class="select-all"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">结算({{cartCount}})</span>
  </div>
</template>

<script>
import CheckButton from './CheckButton'

import {mapGetters} from 'vuex'
export default {
  name : 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice(){
      //过滤选择的商品
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => { //计算选择的商品价格
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },

    cartCount(){
      return this.cartList.filter(item => { return item.checked}).length
    }
  }
 }
</script>


<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>