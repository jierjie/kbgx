<template>
  <div class="register">
    <div class='register-form'>
      <div class='one' v-show='isActive===1'>
        <ul>
          <li>
            <span>姓名</span>
            <input type="text" v-model.trim="form.name" placeholder="请输入您的姓名" ref='name'>
            <b class='clear' v-show="form.password" @click="clear('name')">×</b>
          </li>
          <li>
            <span>手机</span>
            <input type="text" v-model.trim="form.phone" placeholder="请输入您的手机号" maxlength="11" @focus="inputFocus('phone')" ref='phone'>
            <b class='clear' v-show="form.phone" @click="clear('phone')">×</b>
          </li>
          <li>
            <span>密码</span>
            <input type="password" v-model.trim="form.password" placeholder="请输入密码" @focus="inputFocus('password')" ref='password'>
            <b class='clear' v-show="form.password" @click="clear('password')">×</b>
          </li>
          <li>
            <span>确认密码</span>
            <input type="password" v-model.trim="form.rePassword" placeholder="请确认密码" @focus="inputFocus('rePassword')" ref='rePassword'>
            <b class='clear' v-show="form.rePassword" @click="clear('rePassword')">×</b>
          </li>
        </ul>
        <p @click='next' :class="{'no-active':!isNext}">下一步</p>
      </div>
      <div class='two' v-show='isActive===2'>
        <ul>
          <li>
            <span>省份</span>
            <p @click="showArea = true" :class="{'active':form.province}">
              {{form.province || '点击选择'}}
            </p>
          </li>
          <li>
            <span>城市</span>
            <p @click="showArea = true" :class="{'active':form.city}">
              {{form.city || '点击选择'}}
            </p>
          </li>
          <li>
            <span>门店</span>
            <input type="text" v-model.trim="form.store">
          </li>
          <li>
            <span>职位</span>
            <p @click="showPosition = true" :class="{'active':form.position}">
              {{form.position || '点击选择'}}
            </p>
          </li>
          <li>
            <span>联系地址</span>
            <input type="text" placeholder="将关联后续活动" v-model.trim="form.address">
          </li>
          <li class='code'>
            <span>邀请码</span>
            <input type="text" v-model.trim="form.code">
            <h6>请向库博销售代表获取</h6>
          </li>
        </ul>
        <p @click='register'>立即注册</p>
      </div>
    </div>
    <!-- 城市 -->
    <van-popup v-model="showArea" position="bottom" :style="{ height: '30%' }">
      <van-area :area-list="areaList" :columns-num="2" title="请选择" @confirm="onConfirm" @cancel="showArea = false" value="110100" />
    </van-popup>
    <!-- 门店 -->
    <van-popup v-model="showPosition" position="bottom" :style="{ height: '30%' }">
      <van-picker show-toolbar :columns="positionList" @confirm="onConfirmPosition" @cancel="showPosition = false" />
    </van-popup>
  </div>
</template>

<script>
import areaList from '@/assets/json/area.js'
import { ConstService, UserService } from '@/service'

export default {
  data() {
    return {
      isActive: 1,
      form: {
        name: '',
        // chinese_name:'',
        phone: '',
        password: '',
        rePassword: '',
        province: '',
        city: '',
        store: '',
        position: '',
        address: '',
        code: ''
      },
      provinceShow: false,
      cityShow: false,
      active: '',
      areaList: areaList,
      showArea: false,
      showPosition: false,
      positionList: []
    }
  },
  computed: {
    isNext() {
      if (this.form.name && this.form.phone && this.form.password && this.form.rePassword) {
        return true
      }
      return false
    }
  },
  created() {
    this.getPosition()
  },
  methods: {
    register() {
      if (!this.form.province) {
        this.$toast('请选择省份')
        return
      }
      if (!this.form.city) {
        this.$toast('请选择城市')
        return
      }
      if (!this.form.store) {
        this.$toast('请输入门店')
        return
      }
      if (!this.form.position) {
        this.$toast('请选择职位')
        return
      }
      if (!this.form.code) {
        this.$toast('请输入邀请码')
        return
      }
      UserService.registry(this.form)
        .then(res => {
          localStorage.user = JSON.stringify({ id: res.id, phone: res.phone, name: res.name } || {})
          this.$toast('注册成功')
          // 登录成功 跳转首页
          this.$router.push('/home')
        })
    },
    getPosition() {
      ConstService.getPosition()
        .then(res => {
          this.positionList = res || []
        })
    },
    next() {
      if (!this.isNext) {
        return
      }
      if (!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
        this.$toast('请输入正确的手机号码')
        return
      }
      if (this.form.password !== this.form.rePassword) {
        this.$toast('两次输入的密码不一致')
        return
      }
      this.isActive = 2
    },
    onConfirm(values) {
      this.form.province = values[0].name || ''
      this.form.city = values[1].name || ''
      this.showArea = false;

    },
    onConfirmPosition(val) {
      this.form.position = val
      this.showPosition = false
    },
    inputFocus(type) {
      this.$refs[type].focus()
    },
    clear(type) {
      this.form[type] = ""
      this.inputFocus(type)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.register {
  min-height: 100vh;
  font-size: .32rem;
  padding-top: 0.6rem;
  .register-form {
    margin: 0 0.6rem 0.6rem;
    width: 6.3rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0rem 0.06rem 0.4rem 0rem rgba(119, 119, 119, 0.2);
    >div {
      padding: 0.2rem 0.5rem 0.6rem;
      >ul {
        >li {
          position: relative;
          span {
            display: block;
            padding: 0.4rem 0 0.2rem;
          }
          input {
            width: 5.3rem;
            height: 0.8rem;
          }
          p {
            height: 0.8rem;
            line-height: 0.8rem;
            background: rgba(85, 182, 179, 0.1);
            border: 0.01rem solid rgba(85, 182, 179, 1);
            text-align: center;
            font-size: 0.24rem;
            color: rgba(29, 193, 156, 1);
            line-height: 0.8rem;
            &.active {
              color: #000;
            }
          }
          .clear {
            position: absolute;
            line-height: 0.8rem;
            right: 0.1rem;
            color: #55b6b3;
            opacity: 0.5;
            font-weight: 400;
            font-size: 0.4rem;
          }
          &.code {
            input {
              width: 2.6rem;
            }
            h6 {
              float: right;
              font-size: 0.24rem;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 0.8rem;
            }
          }
        }
      }
      >p {
        height: 0.8rem;
        line-height: 0.8rem;
        background: rgba(85, 182, 179, 1);
        border-radius: 0.04rem;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        margin-top: 0.6rem;
        &.no-active {
          opacity: 0.5;
        }
      }
    }
  }
}

.register /deep/ .van-picker__toolbar {
  position: fixed;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 9;
}

.register /deep/ .van-popup {
  min-height: 220px !important;
}
</style>
