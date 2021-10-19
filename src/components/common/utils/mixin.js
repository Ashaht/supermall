import BackTop from '@/components/content/backTop/BackTop'

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000)
    },
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackTop = position.y < -1000

      //2.决定tabControl是否吸顶(positon: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
  }
}