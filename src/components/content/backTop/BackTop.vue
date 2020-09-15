<template>
  <div class="back-top" @click="topClick">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name : 'BackTop',
  methods: {
    topClick(){
      this.$emit('backTop')
    }
  }
 }
</script>

<style  scoped>
  .back-top{
    position: fixed;
    right: 8px;
    bottom: 50px;
  }
  .back-top img{
    height: 43px;
    width: 43px;
  }
</style>