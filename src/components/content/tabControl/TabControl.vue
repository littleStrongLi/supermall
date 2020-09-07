<template>
  <div class="tab-Control">
    <div v-for="(item, index) in titles" :key="index"  
         class="tab-Control-item" 
         :class="{active:index == currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name : 'TabControl',
  props: {
    titles: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tabclick', index)
    }
  }
 }
</script>

<style scoped>
  .tab-Control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  }

  .tab-Control-item {
    flex: 1;
  }

   .tab-Control-item span{
     padding: 5px;
   }

  .active{
    color: var(--color-high-text);
  }

  .active span{
    border-bottom: 2px solid var(--color-tint);
  }
</style>