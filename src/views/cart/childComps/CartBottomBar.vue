<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton.vue';

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((prev, item) => {
        return prev + item.realPrice * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // 如果数组里没有数据,那么返回false
      if (this.$store.state.cartList.length === 0) {
        return false
      }
      // 方法一: 效率不高,因为会遍历完整个数组,还会多次求取length
      // return !this.$store.state.cartList.filter(item => !item.checked).length

      // 方法二:
      return !this.$store.state.cartList.find(item => !item.checked)

      // 方法三:
      // for (let item of this.$store.state.cartList) {
      //   if (!item.checked) {
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {  // 全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {  // 部分或全部不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (this.checkLength === 0) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;

    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left:9px;
    width: 70px;
  }

  .check-button {
    width: 19px;
    height: 19px;
    line-height: 19px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: #ff8198;
    color: #fff;
    text-align: center;
  }
</style>