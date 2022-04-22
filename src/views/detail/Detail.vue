<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from '@/components/common/scroll/Scroll.vue'
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from '@/components/content/backTop/BackTop'
// import Toast from '@/components/common/toast/Toast'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail"
import {debounce} from '@/components/common/utils/utils.js'
import {mapActions} from 'vuex'

export default {
  name: "Detail",
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
    BackTop,
    // Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      // message: '',
      // show: false,
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 获取数据
      // console.log(res);
      const data = res.result;
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      // 2.创建商品信息对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      /*
      // 1.第一次获取offsetTop,值不对
      // 原因: this.$refs.params.$el压根没有渲染
      this.themeTopYs = []

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      console.log(this.themeTopYs)


      // 当数据获取完后offsetTop, DOM渲染完毕后,执行$nextTick
      this.$nextTick(() => {
        // 2.第二次获取, 值依然不对
        // 原因: 图片没有计算在内,图片还没加载完
        // 根据最新的数据,对应的DOM时已经被渲染出来
        // 但是图片依然是没有加载完(目前获取到的offsetTop不包含其中的图片)
        // offsetTop值不对的时候,都是因为图片的问题
        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        console.log(this.themeTopYs)
      })
      */
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      //console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('detailImageLoad', () => {
      refresh()
    })
  },
  updated() {
    // this.themeTopYs = []  方法一:在data更新后存入Y数据,失败
    // 原因: this.$refs.params.$el压根没有渲染
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

    // console.log(this.themeTopYs)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()

      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);  //Number.MAX_VALUE为最大值

      //console.log(this.themeTopYs)
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      //console.log(index)
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y

      // 2.positionY和主题中的值进行对比
      // [0, 2607, 3965, 4157, Number.MAX_VALUE]

      // positionY 在 0 和 2607 之间, index = 0
      // positionY 在 2607 和 3965 之间, index = 1
      // positionY 在 3965 和 9452 之间, index = 2

      // positionY 超过 9120 值, index = 3
      
      // for...in...  console.log(i + 1); 这里的i是字符串  3 + 1 = 31
      // 需要将i转化为数字 i * 1 或者 parseInt(i)
      let length = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++) {
        // 第一版if
        // 当i取到3时,会越界
        // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
        //   console.log(i)
        // }
        // 第二版if
        // if (this.currentIndex !== i && ((i< length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i;
        //   console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
        // 第三版if
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          //console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackTop = position.y < -1000

      //2.决定tabControl是否吸顶(positon: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;
      product.realPrice = this.goods.realPrice;
    
      // 2.将商品添加到购物车里(1.Promise 2.mapActions)
      // this.$store.cartList.push(product) ← 不能用这种方法,必须通过Vuex的Mutation来修改
      // this.$store.commit('addCart', product) ← 也不能用这种方法,因为要做两件事,不能直接提交到mutations
      // ↓复杂事情提交到actions里面
      this.addCart(product).then(res => {
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = '';
        // }, 1500)

        this.$toast.show(res, 2000)
      })

      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // }).catch(res => {
      //   console.log(res);
      // })
    },
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 99;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 99;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);  
  }
</style>