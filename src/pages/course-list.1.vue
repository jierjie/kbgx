<template>
  <div class="list">
    <ul>
      <li @click="goDetail">
        <img src="@/assets/img/1.jpg" alt="">
        <div>
          <div class='top'>
            <h3>提分精品课程</h3>
            <img src="@/assets/img/logo6.png" alt="">
          </div>
          <p>在线一对一</p>
          <div class='bottom'>
            <span>双师教学</span>
            <span>无限回放</span>
            <span>高分冲刺</span>
          </div>
        </div>
      </li>
      <li>
        <img src="@/assets/img/2.jpg" alt="">
        <div>
          <div class='top'>
            <h3>提分精品课程</h3>
            <img src="@/assets/img/logo6.png" alt="">
          </div>
          <p>在线一对一</p>
          <div class='bottom'>
            <span>双师教学</span>
            <span>无限回放</span>
            <span>高分冲刺</span>
          </div>
        </div>
      </li>
      <li>
        <img src="@/assets/img/1.jpg" alt="">
        <div>
          <div class='top'>
            <h3>提分精品课程</h3>
            <img src="@/assets/img/logo6.png" alt="">
          </div>
          <p>在线一对一</p>
          <div class='bottom'>
            <span>双师教学</span>
            <span>无限回放</span>
            <span>高分冲刺</span>
          </div>
        </div>
      </li>
      <li>
        <img src="@/assets/img/2.jpg" alt="">
        <div>
          <div class='top'>
            <h3>提分精品课程</h3>
            <img src="@/assets/img/logo6.png" alt="">
          </div>
          <p>在线一对一</p>
          <div class='bottom'>
            <span>双师教学</span>
            <span>无限回放</span>
            <span>高分冲刺</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goDetail() {
      this.$router.push('/detail')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.list {
  ul {
    padding: .1rem .2rem;
    li {
      cursor: pointer;
      display: flex;
      height: 1.6rem;
      padding: .2rem;
      margin: .12rem 0;
      background: #fff;
      box-shadow: -2px 1px 10px rgba(0, 0, 0, 0.1);
      >img {
        width: 2.13rem;
        height: 1.6rem;
        border-radius: .08rem;
      }
      >div {
        box-sizing: border-box;
        height: 1.6rem;
        flex: 1;
        padding-left: .1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: .1rem 0 0 .2rem;
        .top {
          font-size: 0;
          h3 {
            display: inline-block;
            font-size: .26rem;
            line-height: .26rem;
            vertical-align: middle;
            margin-right: .3rem;
          }
          img {
            display: inline-block;
            width: 1.35rem;
            height: .3rem;
            vertical-align: middle;
          }
        }
        p {
          margin: 0.28rem 0 .32rem;
          font-size: .22rem;
          line-height: .22rem;
          color: #ccc;
        }
        >div {
          font-size: 0;
          span {
            display: inline-block;
            font-size: .16rem;
            padding: .08rem .1rem;
            border-radius: .04rem;
            background: #ccc;
            margin-right: .14rem;
            background: #f6c9d1;
            color: #a32727;
            &:nth-child(2) {
              background: #c8dba1;
              color: #34a634;
            }
            &:nth-child(3) {
              background: #bfd4e1;
              color: #5c5c96;
            }
          }
        }
      }
    }
  }
}
</style>
