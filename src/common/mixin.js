import {debounce} from './utils'

export const itemListenerMixin = {
  data () {
    return {
      itemIamgeListener: null,
      newRefresh: null,
    }
  },

  mounted () {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImageListener = () => {
      this.newRefresh()
    };
    this.$bus.$on('itemIamgeLoad', this.itemImageListener);
    //console.log("混入")
  },
}


import {BACKTOP_DISTANCE} from 'common/const'
export const backTopMixin = {
  data () {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTop(){
      this.$refs.scroll.scrollTo(0, 0, 300);
    }, 

    listenerShowBackTop(position){
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
    }
  }
}