<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  <home-swiper :banners="banners"/>
  <recommend-view :recommends="recommends"/>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'

  import {getHomeMultidata} from 'network/home'
  
  
  export default {
    name : 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },

    data () {
      return {
        //存储请求到的数据
        banners: [],
        recommends: [],
        tabOffsetTop: 0,
      }
    },

    methods: {
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
    },

    /* 网络请求 */
    //组件创建好后，发生网络请求
    created () {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        //console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>
<style scoped>
  /* 针对单个组件的样式，只需在所在组件编写 */
  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }
</style>