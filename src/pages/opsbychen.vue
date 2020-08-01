<template>
  <div id="table">
    <!--role-->
    <div class="add">
      <input type="text" v-model="roleDetail.name" name="role_name" value="" placeholder="角色名称"/>
      <button @click="addRole">新增</button>
    </div>
    <table cellpadding="0" cellspacing="0">
      <thead>
      <tr>
        <th>id</th>
        <th>角色名称</th>
        <!-- <th>操作</th>-->
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in roleList" :key='index'>
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <!--<td><span @click="deletelist(item.id,index)" class="delete">删除</span><span class="edit" @click="edit(item)">编辑</span></td>-->
      </tr>
      </tbody>
    </table>
    <!--    <div id="mask" v-if="editlist">
          <div class="mask">
            <div class="title">
              编辑
              <span @click="editlist=false">
                        X
                    </span>
            </div>
            <div class="content">
              <input type="text" v-model="editDetail.title" name="title" value="" placeholder="标题" />
              <input type="text" v-model="editDetail.user" name="user" value="" placeholder="发布人" />
              <input type="date" v-model="editDetail.dates" name="date" value="" placeholder="发布时间" />
              <button @click="update">更新</button>
              <button @click="editlist=false">取消</button>
            </div>
          </div>
        </div>-->

    <!--user-->
    <table cellpadding="0" cellspacing="0">
      <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>phone</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in userList" :key='index'>
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.phone}}</td>
        <td><span class="edit" @click="editUserToRole(item)">编辑</span></td>
      </tr>
      </tbody>
    </table>
    <div id="mask1" v-if="showUserEdit">
      <div class="mask">
        <div class="title">
          编辑
          <span @click="showUserEdit=false">
					X
				</span>
        </div>
        <div class="content">
          <span>{{userToRole.userId}}</span>
          <select name="public-choice" v-model="userToRole.roleId">
            <option :value="role.id" v-for="role in roleList">{{role.name}}</option>
          </select>
          <button @click="commitUserToRole">提交</button>
          <button @click="showUserEdit=false">取消</button>
        </div>
      </div>
    </div>

    <!--class-->
    <table cellpadding="0" cellspacing="0">
      <thead>
      <tr>
        <th>id</th>
        <th>topic</th>
        <th>description</th>
        <th>number</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in classList" :key='index'>
        <td>{{item.id}}</td>
        <td>{{item.topic}}</td>
        <td>{{item.description}}</td>
        <td>{{item.number}}</td>
        <td><span class="edit" @click="editClassToRole(item)">编辑</span></td>
      </tr>
      </tbody>
    </table>
    <div id="mask2" v-if="showClassEdit">
      <div class="mask">
        <div class="title">
          编辑
          <span @click="showClassEdit=false">
					X
				</span>
        </div>
        <div class="content">
          <span>{{classToRole.classId}}</span>
          <select name="classToRole" v-model="classToRole.roleId">
            <option :value="role.id" v-for="role in roleList">{{role.name}}</option>
          </select>
          <button @click="commitClassToRole">提交</button>
          <button @click="showClassEdit=false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Opsbychen} from '@/service'

  export default {
    data() {
      return {
        roleDetail: {},
        roleList: [],
        userList: [],
        classList: [],
        showUserEdit: false,
        showClassEdit: false,
        userToRole: {
          roleId: '',
          userId: ''
        },
        classToRole: {
          roleId: '',
          classId: ''
        }
      }
    },
    created() {
      this.getAllRole()
      this.getAllUser()
      this.getAllClass()
    },
    methods: {
      addRole() {
        //roleDetail.name
        Opsbychen.addRole({name: this.roleDetail.name})
        this.getAllRole()
      },
      getAllRole() {
        Opsbychen.getAllRole()
          .then(res => {
            this.roleList = res
          })
      },
      getAllUser() {
        Opsbychen.getAllUser()
          .then(res => {
            this.userList = res
          })
      },
      getAllClass() {
        Opsbychen.getAllClass()
          .then(res => {
            this.classList = res
          })
      },
      editUserToRole(user) {
        this.showUserEdit = true
        this.userToRole.userId = user.id
      },
      commitUserToRole() {
        Opsbychen.addUserToRole(this.userToRole).then(res => {
          this.showUserEdit = false
          this.$toast(res)
        })
      },
      editClassToRole(classs) {
        this.showClassEdit = true
        this.classToRole.classId = classs.id
      },
      commitClassToRole() {
        Opsbychen.addClassToRole(this.classToRole).then(res => {
          this.showClassEdit = false
          this.$toast(res)
        })
      }
    }
  }
</script>
<style scoped>
  #table table {
    width: 100%;
    font-size: 14px;
    border: 1px solid #eee
  }

  #table {
    padding: 0 10px;
    margin-top: 80px;
    width: 100%;
  }

  table thead th {
    background: #f5f5f5;
    padding: 10px;
    text-align: left;
  }

  table tbody td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
  }

  table tbody td span {
    margin: 0 10px;
    cursor: pointer;
  }

  .delete {
    color: red;
  }

  .edit {
    color: #008cd5;
  }

  .add {
    border: 1px solid #eee;
    margin: 10px 0;
    padding: 15px;
  }

  input {
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 3px;
    margin-right: 15px;
  }

  button {
    background: #008cd5;
    border: 0;
    padding: 4px 15px;
    border-radius: 3px;
    color: #fff;
  }

  .mask {
    position:fixed;
    *position:absolute;
    width:300px;
    height:300px;
    top:50%;
    left:50%;
    margin:-50px 0 0 -50px;
    background: #eaf2f9;
  }

  .title {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  .title span {
    float: right;
    cursor: pointer;
  }

  .content {
    padding: 10px;
  }

  .content input {
    width: 270px;
    margin-bottom: 15px;
  }
</style>
