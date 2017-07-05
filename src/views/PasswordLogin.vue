<template>
  <div class="page gray login form-panel">
    <group gutter="0">
      <x-input placeholder="请输入原始密码！" ref="old" v-model="form.oldPwd" type="password">
        <img style="width:2rem;margin:0.2rem 0;" src="static/img/key.png" slot="label" alt="">
      </x-input>
    </group>
    <group gutter="10px">
      <x-input placeholder="请输入新密码！" ref="new1" v-model="form.newPwd" type="password">
        <img style="width:2rem;margin:0.2rem 0;" src="static/img/pwd.png" slot="label" alt="">
      </x-input>
    </group>
    <group gutter="10px">
      <x-input placeholder="请再次输入新密码！" ref="new2" v-model="pwd" type="password">
        <img style="width:2rem;margin:0.2rem 0;" src="static/img/pwd.png" slot="label" alt="">
      </x-input>
    </group>
    <group gutter="10px">
      <x-button type="warn" @click.native="handleSubmit" :show-loading="loading">确认修改</x-button>
    </group>
  </div>
</template>
<script>
  import {Group, XInput, XButton} from 'vux'
  import {editLoginPwd} from '../config'
  export default {
    name: 'passwordLogin',
    head: {
      title: {
        inner: '修改登录密码'
      }
    },
    data () {
      return {
        loading: false,
        pwd: '',
        form: {
          userId: '',
          oldPwd: '',
          newPwd: ''
        }
      }
    },
    created () {
      this.form.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
    },
    components: {
      Group,
      XInput,
      XButton
    },
    methods: {
      handleSubmit () {
        const reg = /^[0-9a-zA-Z]+$/
        console.log(reg.test(this.form.newPwd))
        if (!this.form.oldPwd) {
          this.$vux.toast.show({
            type: 'text',
            width: '15em',
            position: 'bottom',
            text: '请输入旧密码！',
            time: '1000'
          })
        } else if (!this.form.newPwd || !this.pwd) {
          this.$vux.toast.show({
            type: 'text',
            width: '15em',
            position: 'bottom',
            text: '请输入新密码！',
            time: '1000'
          })
        } else if (this.form.newPwd !== this.pwd) {
          this.$vux.toast.show({
            type: 'text',
            width: '15em',
            position: 'bottom',
            text: '两次输入的密码不同！',
            time: '1000'
          })
        } else if (!reg.test(this.form.newPwd)) {
          this.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '请输入6-20位字母和数字的组合！',
            time: '1000'
          })
        } else {
          this.$http({
            method: 'jsonp',
            url: editLoginPwd,
            jsonp: 'callback',
            jsonpCallback: 'json',
            params: this.form,
            before: () => {
              this.loading = true
            }
          })
          .then(res => {
            this.loading = false
            console.log(res)
            if (res.body.status) {
              this.$vux.toast.show({
                type: 'text',
                width: '20em',
                position: 'bottom',
                text: '密码修改成功！',
                time: '1000'
              })
              setTimeout(() => {
                this.$router.replace('/login')
              }, 1000)
              this.$localStorage.set('logined', false)
              this.$localStorage.remove('userInfo')
            } else {
              this.$vux.toast.show({
                type: 'text',
                width: '15em',
                position: 'bottom',
                text: res.body.msg,
                time: '1000'
              })
            }
          })
        }
      }
    }
  }
</script>
<style scoped>
.form.has-btn .btn{padding:0.7rem 0;}
.iconfont{font-size:1.8rem;color:#959595;}
</style>
<style>
.form-panel .weui-cell__hd:before,.form-panel .weui-cell__hd:after{content:'';display:inline-block;width:1px;height:6rem;border-left:1px solid #D9D9D9;transform:scaleX(0.5);position:absolute;top:0;left:0;}
.form-panel .weui-cell__hd:after{left:auto;right:0;}
.form-panel .iconfont{padding:0;padding-right:0.5rem;}
.form-panel .weui-cell{padding:0.3rem 0.3rem 0.3rem 1rem;}
</style>
