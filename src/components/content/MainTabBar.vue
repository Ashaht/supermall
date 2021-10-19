<template>
  <tab-bar class="tab-bar">
    <tabbar-item path="/home" activeColor="deeppink">
      <img slot="item-icon" src="../../assets/img/tabbar/icon01.png" alt="">
      <img slot="item-icon-active" src="../../assets/img/tabbar/icon01_active.png" alt="">
      <div slot="item-text">首页</div>
    </tabbar-item>
    <tabbar-item path="/category" activeColor="deeppink">
      <img slot="item-icon" src="../../assets/img/tabbar/icon02.png" alt="">
      <img slot="item-icon-active" src="../../assets/img/tabbar/icon02_active.png" alt="">
      <div slot="item-text">分类</div>
    </tabbar-item>
    <tabbar-item path="/cart" activeColor="deeppink">
      <img slot="item-icon" src="../../assets/img/tabbar/icon03.png" alt="">
      <img slot="item-icon-active" src="../../assets/img/tabbar/icon03_active.png" alt="">
      <div slot="item-text">购物车</div>
    </tabbar-item>
    <tabbar-item path="/profile" activeColor="deeppink">
      <img slot="item-icon" src="../../assets/img/tabbar/icon04.png" alt="">
      <img slot="item-icon-active" src="../../assets/img/tabbar/icon04_active.png" alt="">
      <div slot="item-text">我的</div>
    </tabbar-item>
  </tab-bar>
</template>

<script>
import TabBar from '../common/tabbar/TabBar'
import TabbarItem from '../common/tabbar/TabbarItem.vue'
export default {
  name: "MainTabBar",
  components: { 
    TabbarItem,
    TabBar 
  },
}
</script>

<style scoped>
  .tab-bar {
    z-index: 9;
  }
</style>