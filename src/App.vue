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
    if (window.origin === 'http://192.168.0.105:8080') {
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
  min-height: 100vh;
}
</style>
