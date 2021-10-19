<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartBottomBar from './childComps/CartBottomBar'

import CartList from './childComps/CartList.vue'

import { mapGetters } from 'vuex'
import Scroll from '../../components/common/scroll/Scroll.vue'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartBottomBar,
    Scroll,
    CartList,
  },
  computed: {
    ...mapGetters(['cartLength'])
    // 如果想给getters改个名:
    // ...mapGetters({
    // computed的方法 <=映射为<= getters里的方法
    //   length: 'cartLength',
    //   list: 'carList'
    // })
  },
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-text);
    color: #fff;
    /* font-weight: 700; */
  }

  .cart {
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>