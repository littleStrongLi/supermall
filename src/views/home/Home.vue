<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                   @tabclick="tabclick"
                   ref="tabControl1"
                   class="tab-Control"
                   v-show="this.isTabFixed"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true" 
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabclick="tabclick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>
<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  
  export default {
    name : 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },

    data () {
      return {
        //存储请求到的数据
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list:[]}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },

    /* 网络请求 */
    //组件创建好后执行，发生网络请求
    created () {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop') 
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      
    },

     mixins: [itemListenerMixin, backTopMixin], //使用混入替代如下代码
    // mounted () {
    //   //在created()中使用this.$refs，document.querySelector查询时可能为null，推荐在mounted()中使用
    //   //监听item中图片加载完成（监听事件总线） 
    //   //debounce 防抖函数
    //   const refresh = debounce(this.$refs.scroll.refresh, 500);

    //   //对监听的事件进行保存
    //   this.itemIamgeListener = () => { refresh() };
    //   this.$bus.$on('itemIamgeLoad', itemIamgeListener)
    // },

    //组件有缓存（keep-alive），进入时调用
    activated () {
      // console.log(this.saveY)
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },

    //组件有缓存（keep-alive），离开时调用
    deactivated () {
      this.saveY = this.$refs.scroll.getScrollY();
      //取消全局事件的监听
      this.$bus.$off('itemIamgeLoad', this.itemIamgeListener)
    },

    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    
    methods: {
      /* 事件监听相关的方法 */
      tabclick(index){
        switch(index)
        {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      backClick(){
        this.$refs.scroll.scrollTo(0, 0);
      },

      contentScroll(position){
        //1.判断tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop

        //2.断backTop是否显示
        this.listenerShowBackTop(position);
      },

      loadMore(){
        this.getHomeGoods(this.currentType);
      },

      swiperImageLoad(){
        //获取tabControl的offsetTop
        //所有的组件都有一个属性$el: 用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },


      /* 网络相关的方法 */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
       })
      },

      getHomeGoods(type){
        //获取page，因为是在原基础上加1 才能获得新数据
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          //将请求到的数据加入到对应的数组中
          this.goods[type].list.push(...res.data.list); 
          //每次请求后将页码加1
          this.goods[type].page += 1; 
          //完成上拉加载
           this.$refs.scroll.finishPullUp();
        })
      },
    },
  }
</script>
<style scoped>
  /* 针对单个组件的样式，只需在所在组件编写 */
  #home {
    /* padding-top: 44px; */
    /* vh -- viewport height 视口 */
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0; 
    z-index: 9; */
  }


  /*  方案1 使用calc方法
  .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

  /* 方案2 使用定位 */
  .content{
    overflow: hidden;
    position: absolute; 
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-Control{
    position: relative;
    z-index: 9;
  }
</style>