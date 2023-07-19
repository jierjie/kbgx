<template>
  <div class="score_result">
    <div class='report'>
      <span>总积分</span>
      <b></b>
    </div>
    <ul class='core'>
      <li>
        <p>您获得积分</p>
        <div>
          <b>{{ myScore || 0　}}</b>
          <span>点</span>
        </div>
      </li>
    </ul>
    <p class='score_tip' @click="goScoreDetail">积分明细查询请点击</p>
    <!--<div class='tip'>-->
      <!--<h6>积分规则：</h6>-->
      <!--<p>通过课后测试（80分及以上）可获得30点积分。</p>-->
      <!--<p class='exchange'>-->
        <!--<span>积分仅在当年有效，请前往</span><img @click='goExchange' src="@/assets/img/logo.jpg" alt="">-->
        <!--<span>兑换</span>-->
      <!--</p>-->
      <!--&lt;!&ndash; <p>积分规则解释权归平台所有。</p> &ndash;&gt;-->
      <!--<p>点击“睛英汇”专区，在“我的”页面查看库点和明细</p>-->
    <!--</div>-->
    <!--<img class='score_tip_img' src="@/assets/img/score_tip.jpg" alt="">-->
    <!--<p class='copy_right'>规则解释权归平台所有</p>-->
  </div>
</template>

<script>
import { Score } from '@/service'
export default {
  data() {
    return {
      user: JSON.parse(localStorage.user || '{}'),
      myScore: 0
    }
  },
  created() {
    this.getScore()
  },
  methods: {
    getScore() {
      Score.getScore(this.user.id)
        .then(res => {
          this.myScore = res.score || 0
        })
    },
    goScoreDetail() {
      this.$router.push({ path: '/score/detail', query: { myScore: this.myScore } })
    },
    goExchange() {
      window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA5ODA4MjAxOA==&scene=123#wechat_redirect'
    }
  }
}
</script>

<style lang='less' scoped>
@blue-color : #1AC1C9;
.score_result {
  position: relative;
  padding: 0.32rem 0 0.3rem;
  .report {
    position: relative;
    color: @blue-color;
    font-size: 0.3rem;
    line-height: 0.3rem;
    height: 0.3rem;
    padding: 0 0.56rem 0 0.7rem;
    background: url('../assets/img/exam/1.png') no-repeat 0.5rem center;
    background-size: 0.16rem 0.2rem;
    span {
      position: absolute;
      z-index: 5;
      background: #fff;
      padding-right: 0.1rem;
    }
    b {
      position: relative;
      display: block;
      border-bottom: 1px solid @blue-color;
      width: 6.1rem;
      padding-top: 0.14rem;
      &::after {
        position: absolute;
        content: '';
        width: 0.04rem;
        height: 0.04rem;
        border: 1px solid @blue-color;
        border-radius: 50%;
        right: -0.05rem;
        top: 0.11rem;
      }
    }
  }
  .core {
    display: flex;
    justify-content: center;
    margin-bottom: 0.28rem;
    padding-top: 0.5rem;
    li {
      width: 2.86rem;
      height: 2.04rem;
      background: rgba(26, 193, 201, 0.05);
      border: 1px solid @blue-color;
      margin: 0 0.5rem;
      border-radius: 0.12rem;
      overflow: hidden;
      p {
        color: #fff;
        background: @blue-color;
        text-align: center;
        font-size: 0.32rem;
        line-height: 0.36rem;
        padding: 0.12rem 0 0.1rem;
        margin-bottom: 0.1rem;
      }
      >div {
        color: @blue-color;
        font-size: 0;
        text-align: center;
        b {
          font-size: 0.9rem;
          font-weight: 400;
          display: inline-block;
        }
        span {
          display: inline-block;
          font-size: 0.32rem;
        }
      }
    }
  }
  .tip {
    font-size: 0.28rem;
    padding: 0.2rem 0.6rem 0;
    h6 {
      font-size: 0.32rem;
      font-weight: 400;
      color: #333;
      padding: 0.2rem 0 0.1rem;
    }
    p {
      color: #626675;
      padding-top: 0.16rem;
      &.exchange {
        font-size: 0;
        margin-top: 0.1rem;
      }
      img {
        display: inline-block;
        vertical-align: top;
        width: 2.2rem;
        margin-top: -0.04rem;
      }
      span {
        font-size: 0.28rem;
        display: inline-block;
        line-height: 0.4rem;
        height: 0.4rem;
      }
    }
  }
  .score_tip {
    text-align: center;
    font-size: 0.26rem;
    padding-bottom: 0.68rem;
    font-weight: 700;
  }
  .score_tip_img {
    width: 90vw;
    margin: 0.26rem auto 0.5rem;
  }
  .copy_right {
    text-align: center;
    font-size: 0.2rem;
  }
}
</style>
