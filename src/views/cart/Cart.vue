<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 选中商品的列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar /> 
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name : 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //用法1
    //...mapGetters(['cartLength'])

    //用法2 (用length代替cartLength)
    ...mapGetters({
      length: 'cartLength'
    })
  }
 }
</script>
<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>