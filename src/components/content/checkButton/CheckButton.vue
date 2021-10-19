<template>
  <div class="check-button" :class="{check: isChecked}">
    <img v-show="isChecked" src="@/assets/img/detail/check_active.png" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>
 
<style scoped>
  .check-button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #ccc;
  }

  .check-button img {
    position: relative;
    top: -1px;
    width: 20px;
  }

  .check {
    border-color: #d81e06;
  }
</style>