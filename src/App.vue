<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    let originUrl = window.origin
    if (window.origin === 'http://localhost:8080') {
      originUrl = 'http://39.98.132.132'
    }
    localStorage.originUrl = originUrl
  }
}
</script>

<style>
#app {
  font-family: PingFangSC-Regular, PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  min-height: 100vh;
}
</style>
