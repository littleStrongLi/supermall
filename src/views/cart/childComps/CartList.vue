<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item 
        v-for="(item, index) in cartList" 
        :key="index" 
        :item-info="item">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

  export default {
    name : 'CartList',
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated () {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
   height: 100%;
  }

  .content{
   overflow: hidden;
   position: absolute;
   left: 0;
   right: 0;
   top: 44px;
   bottom: 49px;
  }
</style>