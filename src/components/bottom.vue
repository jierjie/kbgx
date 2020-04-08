<template>
  <div class='bottom' @click='goHome'>
    返回首页
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.bottom {
  position: fixed;
  text-align: center;
  font-weight: 700;
  line-height: .8rem;
  width: 60%;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 4px;
  box-shadow: -2px 1px 10px rgba(0, 0, 0, 0.1);
}
</style>
