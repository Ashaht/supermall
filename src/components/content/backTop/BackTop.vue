<template>
  <div class="back-top">
    <img src="@/assets/img/back-top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    // backClick() {
    //   console.log('backtop')
    // }
  }
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }

  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>