<template>
  <div class="retrieve">
    <div class='form'>
      <div class='one' v-show='isActive===1'>
        <ul>
          <li>
            <i>手机号</i>
            <input type="text" placeholder="请输入注册手机号" v-model.trim="form.phone" maxlength="11" @focus="inputFocus('phone')" ref='phone'>
            <div class='clear' v-show="form.phone" @click="clear('phone')">×</div>
          </li>
          <li class='code'>
            <i>验证码</i>
            <input type="text" placeholder="请输入验证码" v-model.trim="form.code" ref='code'>
            <div class='clear clear-code' v-show="form.code" @click="clear('code')">×</div>
            <b @click='sendValidateCode' :class="{'no-active':countingDone}">{{countingDone?'重获验证码('+countdown+'s)':'获取验证码'}}</b>
          </li>
        </ul>
        <p class='loginBtn' @click='next' :class="{'notActive':!isNext}">下一步</p>
      </div>
      <div class='two' v-show='isActive===2'>
        <ul>
          <li>
            <i>新密码</i>
            <input type="password" v-model.trim="form.password" ref='password' @focus="inputFocus('password')">
            <div class='clear' v-show="form.password" @click="clear('password')">×</div>
          </li>
          <li :class="{error:isPasswordError}">
            <i>确认密码</i>
            <input type="password" v-model.trim="form.rePassword" ref='rePassword' @focus="inputFocus('rePassword')">
            <div class='clear clear-error' v-show="form.rePassword" @click="clear('rePassword')">×</div>
            <span>两次输入的密码不一致</span>
          </li>
        </ul>
        <p class='loginBtn' @click='changePwd' :class="{'notActive':!isSubmit}">确定</p>
      </div>
    </div>
  </div>
</template>

<script>
import { UserService } from '@/service'
export default {
  data() {
    return {
      isActive: 1,
      isPasswordError: false,
      form: {
        phone: '',
        code: '',
        password: '',
        rePassword: ''
      },
      interval: null,
      countdown: 60, //倒计时初始值
      countingDone: false, //是否开始倒计时
      count: 0 //倒计时执行次数
    }
  },
  computed: {
    isNext() {
      if (this.form.phone && this.form.code) {
        return true
      }
      return false
    },
    isSubmit() {
      if (this.form.password && this.form.rePassword) {
        return true
      }
      return false
    }
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    next() {
      if (!this.isNext) {
        return
      }
      if (!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
        this.$toast('请输入正确的手机号码')
        return
      }
      UserService.validate(this.form)
        .then(res => {
          this.isActive = 2
        })
    },
    changePwd() {
      if (this.form.password !== this.form.rePassword) {
        this.isPasswordError = true
        return
      }
      UserService.changePwd({ phone: this.form.phone, password: this.form.password, code: this.form.code })
        .then(res => {
          localStorage.user = JSON.stringify({ id: res.id, phone: res.phone, name: res.name } || {})
          this.$toast('修改密码成功')
          // 登录成功 跳转首页
          this.$router.push('/home')
        })
    },
    inputFocus(type) {
      if (type === 'rePassword' || type === 'password') {
        this.isPasswordError = false
      }
      this.$refs[type].focus()
    },
    clear(type) {
      if (type === 'rePassword' || type === 'password') {
        this.isPasswordError = false
      }
      this.form[type] = ""
      this.inputFocus(type)
    },
    sendValidateCode() {
      if (!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
        this.$toast('请输入正确的手机号码')
        return
      }
      if (this.countdown > 0 && this.countdown < 60) {
        return;
      }
      UserService.sendValidateCode(this.form.phone)
        .then(res => {
          this.countdown = 60
          this.countingDone = true
          this.count++
          this.$toast("验证短信已发送，请注意查收");
          this.interval = setInterval(() => this.tick(), 1000)
        })
        .catch((err) => {
          this.countdown = 0
          this.countingDone = false
        })
    },
    // 倒计时
    tick() {
      this.countingDone = true
      this.countdown--
      if (this.countdown <= 0) {
        clearInterval(this.interval)
        this.countingDone = false
        this.count++
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@blue-color : #55B6B3;
.retrieve {
  padding-top: 0.9rem;
  .form {
    padding-bottom: 0.4rem;
    background: #fff;
    position: relative;
    margin: 0 auto;
    width: 6.3rem;
    box-shadow: 0rem 0.06rem 0.4rem 0rem rgba(119, 119, 119, 0.2);
    ul {
      padding: .2rem 0.5rem 0.2rem;
      li {
        position: relative;
        padding-top: .4rem;
        >i {
          display: block;
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 0.45rem;
          padding-bottom: 0.2rem;
        }
        input {
          width: 5.3rem;
          height: 0.8rem;
        }
        &.code {
          input {
            width: 3.2rem;
          }
          b {
            box-sizing: border-box;
            float: right;
            height: 0.8rem;
            line-height: 0.8rem;
            width: 1.8rem;
            text-align: center;
            border-radius: 0.04rem;
            border: 0.02rem solid rgba(85, 182, 179, 1);
            font-size: 0.24rem;
            font-weight: 400;
            color: rgba(85, 182, 179, 1);
            white-space: nowrap;
            &.no-active {
              color: #999999;
              border: 0.02rem solid rgba(204, 204, 204, 1);
            }
          }
        }
        span {
          display: none;
        }
        .clear {
          position: absolute;
          line-height: 0.8rem;
          right: 0.1rem;
          bottom: 0;
          color: #55b6b3;
          opacity: 0.5;
          font-weight: 400;
          font-size: 0.4rem;
        }
        .clear-code {
          left: 2.9rem;
        }
        &.error {
          .clear-error {
            color: rgba(234, 78, 78, 1);
            bottom: .52rem;
          }
          input {
            background: rgba(234, 78, 78, 0.1);
            border: 0.02rem solid rgba(234, 78, 78, 1);
          }
          span {
            display: block;
            font-size: 0.24rem;
            color: rgba(234, 78, 78, 1);
            line-height: 0.33rem;
            padding-top: 0.2rem;
          }
        }
      }
    }
    p {
      font-size: 0.32rem;
      text-align: center;
      margin: 0.4rem auto 0.2rem;
      height: .8rem;
      width: 5.3rem;
      line-height: .8rem;
      background-color: #fff;
      border: 1px solid @blue-color;
      color: @blue-color;
      border-radius: 0.04rem;
      &.loginBtn {
        background-color: @blue-color;
        color: #fff;
      }
      &.notActive {
        opacity: 0.5;
      }
    }
  }
}
</style>
