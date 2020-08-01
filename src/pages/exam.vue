<template>
  <div class="exam">
    <ul>
      <li v-for='(item,index) in examList' :key='item.id'>
        <h6>{{ item.question }} 【{{ item.type==='single'?'单':'多' }}选{{ item.score }}分】</h6>
        <ul>
          <template v-if="item.type==='single'">
            <li v-for='i in item.options' :key='i.key' @click='getKeys(i,index)' :class="{'active':keys[index]===i.key}">
              <p>{{ i.key }}. {{ i.label }}</p>
            </li>
          </template>
          <template v-else>
            <li v-for='i in item.options' :key='i.key' @click='getKeys(i,index)' :class="{'active':(keys[index] instanceof Array) && keys[index].indexOf(i.key) !==-1 ?true:false}">
              <p>{{ i.key }}. {{ i.label }}</p>
            </li>
          </template>
        </ul>
      </li>
    </ul>
    <span class='submit' @click='submit'>提交</span>
  </div>
</template>

<script>
import { Exam } from '@/service'
export default {
  data() {
    return {
      query: {},
      user: JSON.parse(localStorage.user || '{}'),
      examList: [],
      keys: []
    }
  },
  created() {
    this.query = {
      classId: this.$route.query.classId,
      userId: this.user.id
    }
    this.getExamQuestions()
  },
  methods: {
    getExamQuestions() {
      Exam.getExamQuestions(this.query.classId)
        .then(res => {
          this.examList = res
        })
    },
    getKeys(item, index) {
      if (this.examList[index].type === 'single') {
        // 单选
        if (this.keys[index] === item.key) {
          this.$set(this.keys, index, '')
          return
        }
        this.$set(this.keys, index, item.key)
      } else {
        // 多选
        this.keys[index] = this.keys[index] || []
        let itemIndex = ''
        this.keys[index].map((i, index) => {
          if (i === item.key) {
            itemIndex = index
          }
        })
        if (itemIndex || itemIndex === 0) {
          this.keys[index].splice(itemIndex, 1)
          this.$set(this.keys, index, this.keys[index])
        } else {
          this.keys[index].push(item.key)
          this.$set(this.keys, index, this.keys[index])
        }
      }
    },
    submit() {
      let Index = 0
      this.keys.map(i => {
        if (i instanceof Array && i.length) {
          Index++
        } else if (!(i instanceof Array) && i) {
          Index++
        }
      })
      if (Index !== this.examList.length) {
        this.$toast('请答题完整')
        return
      }
      // 都有值
      this.examCommit({ ...this.query, answer: JSON.stringify(this.keys) })
    },
    examCommit(data) {
      Exam.examCommit(data)
        .then(res => {
          if (res) {
            this.$router.replace({ path: '/exam/result', query: { classId: this.$route.query.classId } })
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.exam {
  position: relative;
  padding: 0.32rem 0 1.02rem;
  >ul {
    >li {
      font-size: 0.27rem;
      h6 {
        padding: 0 .5rem;
        margin-bottom: 0.06rem;
        background: rgba(0, 0, 0, 0.06);
        line-height: 0.7rem;
        color: #717071;
      }
      ul {
        padding: 0 0.8rem 0.37rem;
        li {
          color: #2F2E2F;
          line-height: 0.67rem;
          p {
            width: 5.4rem;
          }
          &.active {
            color: #1AC1C9;
            background: url('../assets/img/exam/right.png') no-repeat right 0.2rem;
            background-size: 0.33rem 0.27rem;
          }
          &.error {
            color: #b00613;
            background: url('../assets/img/exam/error.png') no-repeat right 0.19rem;
            background-size: 0.29rem 0.29rem;
          }
        }
      }
    }
  }
  .submit {
    position: fixed;
    width: 5.5rem;
    line-height: 0.82rem;
    text-align: center;
    color: #fff;
    background: #1AC1C9;
    bottom: 0.2rem;
    left: 1rem;
    border-radius: 0.4rem;
    font-size: 0.38rem;
    letter-spacing: 0.2rem;
  }
}
</style>
