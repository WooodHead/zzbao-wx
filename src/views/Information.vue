<template>
  <div class="page gray row h w">
    <div class="col v-m t-c" style="padding:0 1rem;">
      <div class="face">
        <img src="static/img/face.jpg" alt="">
      </div>
      <group gutter="30px" class="information">
        <x-input v-model="form.userName" text-align="right">
          <span class="iconfont icon-user" slot="label"></span>
        </x-input>      
      </group>
      <group gutter="10px" class="information">
        <datetime :title="birthIcon" placeholder="请选择出生日期" :min-year="1950" confirm-text="确认" cancel-text="取消" v-model="form.birthday"></datetime>
      </group>
      <group gutter="10px" class="information">
        <cell class="sex">
          <span class="iconfont icon-xingbie" slot="icon"></span>
          <ul slot="default" class="row w">
            <li class="col v-m">
              <div class="checkbox circle right">
                <input type="radio" name="sex" value="0" id="s1" v-model="form.userSex">
                <span class="iconfont icon-dot"></span>
                <label for="s1">保密</label>
              </div>
              <div class="checkbox circle right">
                <input type="radio" name="sex" value="1" id="s2" v-model="form.userSex">
                <span class="iconfont icon-dot"></span>
                <label for="s2">男</label>
              </div>
              <div class="checkbox circle right">
                <input type="radio" name="sex" value="2" id="s3" v-model="form.userSex">
                <span class="iconfont icon-dot"></span>
                <label for="s3">女</label>
              </div>
            </li>
          </ul>
        </cell>
      </group>
      <x-button type="warn" style="margin-top:40px;" @click.native="handleSubmit" :show-loading="loading">确认修改</x-button>  <!--show-loading-->
    </div>
  </div>
</template>
<script>
  import {XInput, Group, Datetime, XButton, Cell, dateFormat} from 'vux'
  import {mapMutations} from 'vuex'
  export default {
    name: 'information',
    head: {
      title: {
        inner: '我的资料'
      }
    },
    data () {
      return {
        loading: false,
        birthIcon: '<span class="iconfont icon-shengri"></span>',
        userInfo: {},
        form: {
          userId: '',
          userName: '刘勇',
          birthday: '',
          userSex: ''
        }
      }
    },
    created () {
      const user = JSON.parse(this.$localStorage.get('userInfo'))
      console.log(user)
      this.form.userId = user.userId
      this.form.userName = user.userName
      this.form.birthday = dateFormat(user.userBirthday).substr(0, 10)
      this.form.userSex = user.userSex
    },
    methods: {
      handleSubmit () {
        this.editInformation(this)
      },
      ...mapMutations({
        editInformation: 'editInformation'
      })
    },
    components: {
      XInput,
      Group,
      Datetime,
      XButton,
      Cell
    }
  }
</script>
<style scoped>
.form-panel{margin-top:2rem;}
.form-panel .form{margin:0;margin-top:-1px;}
.face{display:inline-block;width:7rem;height:7rem;border-radius:50%;overflow:hidden;border:2px solid #D9D9D9;}
.face img{width:100%;height:100%;}
.form .iconfont,.weui-cells .iconfont{color:#959595;font-size:1.8rem;margin-right:1rem;}
.form .icon-right{right:0;left:auto;font-size:1.4rem;transform:translate(0, -50%);}
.icon-shengri{position:absolute;left:1rem;top:50%;transform:translate(0,-50%);}
.weui-cell{padding:1rem;font-size:1.2rem;border:1px solid #E6E6E6;}
.sex .checkbox label{font-size:1.2rem;color:#666;}
.sex .icon-xingbie{position:absolute;left:1rem;top:50%;transform:translate(0,-50%);font-size:1.8rem;color:#959595;}
</style>
<style>
.vux-datetime .iconfont{color:#959595;font-size:1.8rem;}
.sex .weui-cell__ft{width:90%;}
.sex{padding:0.8rem 1rem !important;}
.information .weui-cell{padding:0.5rem 1rem;}
.information .iconfont{padding:0;}
.information .vux-datetime-value,.information input{color:#666 !important;}
</style>
