<template>
  <div class='top'>
    <img class='sjk' src="@/assets/img/sjk.png" alt="">
    <div v-if="user.app==='COOPER'">
      <img class='logo' src="@/assets/img/logo-Blue.png" alt="">
    </div>
    <div v-if="user.app==='JM'" class='jm'>
      <img class='jmpng' src="@/assets/img/logo_jm.png" alt="">
      <img class='logo' src="@/assets/img/logo-Blue.png" alt="">
    </div>
    <div v-if="user.app==='BS'" class='bs'>
      <img class='bspng' src="@/assets/img/logo_bs.png" alt="">
      <img class='logo' src="@/assets/img/logo-Blue.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.user || '{}'),
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.top {
  box-sizing: content-box;
  height: 0.8rem;
  padding: 0.5rem 0;
  img {
    height: auto;
    display: inline-block;
    vertical-align: middle;
    &.logo {
      width: 1.66rem;
    }
    &.sjk {
      margin-top: 0.28rem;
      width: 2.75rem;
      float: right;
    }
  }
  .jm {
    .jmpng {
      width: 0.6rem;
    }
  }
  .bs {
    padding-top: 0.2rem;
    .bspng {
      width: 1.3rem;
    }
    .logo {
      width: 1.3rem;
    }
  }
}
</style>
