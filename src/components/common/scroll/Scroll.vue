<template>
  <!-- 
    ref如果绑定在组件上，通过this.$refs.refname获取到的是一个组件对象
    ref如果绑定在普通元素上，通过this.$refs.refname获取到的是一个元素对象
   -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name : 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    
    //2.监听滚动位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll', (position)=>{
      //console.log(position)
      //传出事件，并传出position数据
      this.$emit('scroll', position)
      })
    }

    //3.监听上拉加载
    if(this.pullUpLoad){
      this.scroll.on("pullingUp", ()=>{
      this.$emit('pullingUp')
     })
    }
  },
  methods: {
    //封装回到顶部方法
    scrollTo(x, y, time=300){
      //先判断scroll是否为null，再执行
      //console.log('--------')
      this.scroll && this.scroll.scrollTo(x, y, time)
    },

    finishPullUp(){
      this.scroll.finishPullUp()
    },

    refresh(){
      //先判断scroll是否为null，再执行
      //console.log('refresh--------')
      this.scroll && this.scroll.refresh();
    },

    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
 }
</script>

<style scoped>
  
</style>