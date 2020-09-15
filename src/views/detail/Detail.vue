<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content" 
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recomends"/> 
    </scroll>
    <back-top @backTop="backTop" v-show="isShowBackTop" class="back-top"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>
<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList' //展示推荐数据
  import BackTop from 'components/content/backTop/BackTop'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  import {debounce} from 'common/utils'

  export default {
    name : 'Detail',

    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop
    },

    mixins: [itemListenerMixin, backTopMixin],

    data(){ 
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recomends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },

    created () {
      //1.保存传入的iid
      this.iid = this.$route.params.iid;

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //console.log(res)
        const data = res.result;
        //1) 获取轮播图数据
        this.topImages = data.itemInfo.topImages;
        //2) 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        //3) 获取店铺信息
        this.shop = new Shop(data.shopInfo);
        //4）保存商品详情数据
        this.detailInfo = data.detailInfo;
        //5）获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //6）获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        }

        //7）设置各个标签的位置
        /*
        //1. 第一次获取组件offsetTop值不对，
        //原因：this.$refs.params.$el压根没有渲染
        this.themeTopYs = [];

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        console.log(this.themeTopYs);

        //2. 第二次获取组件offsetTop值不对
        //原因：图片没有计算在内
        this.$nextTick(()=>{
          //根据最新的数据，对应的DOM已经渲染完成，但是图片并没有加载完成
          //offsetTop值不对，都是图片原因造成
          this.themeTopYs = [];

          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

          console.log(this.themeTopYs);
        })*/
      })

      //3.获取推荐数据
      getRecommend().then(res => {
        //console.log(res);
        this.recomends = res.data.list
      })
    
      //4.使用防抖函数给this.getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        //console.log(this.themeTopYs);
      }, 100)
    },

    //组件没有缓存（keep-alive），离开时调用
    destroyed () {
      this.$bus.$off('itemIamgeLoad', this.itemImageListener)
    },
    
    methods: {
      imageLoad(){
        this.newRefresh();
        this.getThemeTopY();
      },
      titleClick(index){
        //console.log("*****"+index)
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
      },
      contentScroll(postion)
      {
        //1.获取y值
        const positionY = -postion.y;

        //2.positionY和主题中的值进行对比
        let length = this.themeTopYs.length;

        //1).常规方法
        /*
        for (let i = 0; i < length; i++) {
          
          if(this.currentIndex !== i && ((i < (length-1) && positionY > this.themeTopYs[i] && positionY <= this.themeTopYs[i+1]) || 
            (i === (length-1)&& positionY >= this.themeTopYs[i]))){
              this.currentIndex = i;
              console.log(this.currentIndex);
              this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
        */

        //2).hack方法，在this.themeTopYs中push一个number.MAX_VALUE值
        for(let i = 0; i < length-1; i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }

        //3. 断backTop是否显示
        this.listenerShowBackTop(postion);
      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车
        //this.$store.commit('addCart', product); //对应vuex中mutations
        this.$store.dispatch('addCart', product); //对应vuex中actions
      },

    }
 }
</script>

<style scoped>
  .detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav{
    /* 相对定位 */
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height: calc(100% - 44px - 58px);
  }

  .back-top{
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style>