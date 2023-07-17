<template>
  <div class="register">
    <div class='register-form'>
      <div class='one' v-show='isActive===1'>
        <ul>
          <li class='code'>
            <span>邀请码</span>
            <input type="text" v-model.trim="form.code">
            <h6>请向库博销售代表获取</h6>
          </li>
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
            <p @click="showPositionHandle" :class="{'active':form.position}">
              {{form.position || '点击选择'}}
            </p>
          </li>
          <li>
            <span>联系地址</span>
            <input type="text" placeholder="将关联后续活动" v-model.trim="form.address">
          </li>
        </ul>
        <p @click='register'>立即注册</p>
        <div class='agreement'>
          <i v-if='!isCheck' @click='agreementHandler'></i>
          <!-- <img v-if='!isCheck' @click='agreementHandler' src="@/assets/img/check.png" alt=""> -->
          <img v-else @click='agreementHandler' src="@/assets/img/check-square.png" alt="">
          <span @click='agreementView'>阅读并接受《库博用户协议》</span>
        </div>
      </div>
       <div class='three' v-show='isActive===3'>
        <div>
          <img v-if='!agreementList[0]' @click='agreementListHandler(0)' src="@/assets/img/check.png" alt="">
          <img v-else @click='agreementListHandler(0)' src="@/assets/img/check-square.png" alt="">
          <p>本人兹同意持续接收与库博光学（关于数据控制方的完整名称和地址，请参阅库博光学的《隐私政策》）（以下简称为“库博光学”、“我们”或“我们的”）产品和服务（包括补充产品、促销与优惠、销售区域代表、新产品/服务/优惠等）有关的新闻、优惠信息和资讯，以及参加库博光学产品、服务和教育资料相关调查的邀请，且库博光学可以收集、使用、披露和向海外传输本人在下方提供的个人信息，用于依据《隐私政策》的规定进行市场活动的目的。</p>
        </div>
        <div>本人同意通过下列通信渠道接收上述信息：</div>
        <div>
          <img v-if='!agreementList[1]' @click='agreementListHandler(1)' src="@/assets/img/check.png" alt="">
          <img v-else @click='agreementListHandler(1)' src="@/assets/img/check-square.png" alt="">
          <p>电子邮箱</p>
        </div>
        <div>
          <img v-if='!agreementList[2]' @click='agreementListHandler(2)' src="@/assets/img/check.png" alt="">
          <img v-else @click='agreementListHandler(2)' src="@/assets/img/check-square.png" alt="">
          <p>电话</p>
        </div>
        <div>
          <img v-if='!agreementList[3]' @click='agreementListHandler(3)' src="@/assets/img/check.png" alt="">
          <img v-else @click='agreementListHandler(3)' src="@/assets/img/check-square.png" alt="">
          <p>短信</p>
        </div>
        <div>
          <img v-if='!agreementList[4]' @click='agreementListHandler(4)' src="@/assets/img/check.png" alt="">
          <img v-else @click='agreementListHandler(4)' src="@/assets/img/check-square.png" alt="">
          <p>邮件</p>
        </div>
        
        <div>本人有权通过发送电子邮件[CNacademy@cn.coopervision.com]等方式，随时撤回未来处理本人数据的知情同意。</div>
        <div>我们收集您的个人信息旨在为您提供与该学习平台有关的服务，包括为您提供访问平台、相关培训和资源的权限。我们可能向参与管理该平台、提供培训、对培训反馈进行数据分析的关联企业和第三方服务提供商披露您的数据，包括位于[库博光学学习中心所在地]、英国和新加坡的企业。若库博光学开展的活动符合持续职业发展（CPD）学时或学分的条件，则我们可能在适当的情况下，将您的个人信息提供给您所在地区负责保管持续职业发展CPD记录的相关机构。若您不同意提供个人信息，我们可能无法为您提供培训和资料。《隐私政策》中解释了库博光学如何收集、使用、处理和披露您的数据，可点击[<a href="https://coopervision.com.cn/privacy-policy">https://coopervision.com.cn/privacy-policy</a>]查看《隐私政策》。《隐私政策》中还详细介绍了您可以如何访问、更正您的个人信息，或者如何对您的个人信息的处理进行投诉。</div>
        <span @click='goback'>同意并返回注册</span>
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
      isCheck:false,
      isActive:1,
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
      positionList: [],
      agreementList:[true,true,true,true,true]
    }
  },
  computed: {
    isNext() {
      if (this.form.name && this.form.phone && this.form.password && this.form.rePassword) {
        return true
      }
      return false
    },
  },
  created() {
    this.getPosition()
  },
  methods: {
    goback(){
      let temp = this.agreementList.find(i=>{
        return !i
      })
      if(temp === undefined){
        // 全选
        this.isCheck = true
      }else{
        this.isCheck = false
      }
      this.isActive = 2
    },
    agreementListHandler(index){
      let temp = [...this.agreementList]
      let val = !temp[index]
      temp.splice(index,1,val)
      this.agreementList = temp
    },
    agreementHandler(){
      this.isCheck = !this.isCheck
      if(this.isCheck){
        this.agreementList = [true,true,true,true,true]
      }
    },
    agreementView(){
      this.isActive =3
    },
    register() {
      if(!this.isCheck){
        this.$toast('请先阅读并接受《库博用户协议》')
        return
      }
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
      UserService.registry(this.form)
        .then(res => {
          localStorage.user = JSON.stringify({ id: res.id, phone: res.phone, name: res.name, app: res.app } || {})
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
      if (!this.form.code) {
        this.$toast('请输入邀请码')
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
      window.scrollTo(0, 0)
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
    },
    showPositionHandle() {
      window.scrollTo(0, 0)
      this.showPosition = true
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
    .agreement{
      padding-top: 0.16rem;
      text-align: center;
      font-size: 0.2rem;
      color:#55b6b3;
      img,span,i{
        display: inline-block;
        vertical-align: middle;
      }
      i{
        height: 0.2rem;
        width: 0.2rem;
        border: 1px solid red;
      }
      img{
        height: 0.22rem;
        width: 0.22rem;
      }
    }
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
  .three{
    >div{
      position: relative;
      font-size: 0.24rem;
      padding-bottom: 0.14rem;
      line-height: 0.4rem;
      word-wrap: break-word;
      word-break: break-all;
      p{
        text-indent: 1.3em;
      }
      img{
        position: absolute;
        top: 0.05rem;
        height: 0.22rem;
        width: 0.22rem;
      } 
    }
     span{
      display: block;
      text-align: center;
      font-size: 0.2rem;
      color:#55b6b3;
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
