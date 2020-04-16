<template>
  <div class='top'>
    <img class='sjk' src="@/assets/img/sjk.png" alt="">
    <img class='logo' src="@/assets/img/logo-Blue.png" alt="">
  </div>
</template>

<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.top {
  box-sizing: content-box;
  height: 0.8rem;
  padding: 0.5rem 0;
  img {
    height: auto;
    &.logo {
      width: 1.66rem;
    }
    &.sjk {
      margin-top: 0.28rem;
      width: 2.75rem;
      float: right;
    }
  }
}
</style>
