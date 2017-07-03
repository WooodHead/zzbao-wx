<template>
  <div class="page gray login form-panel">
    <group gutter="0">
      <x-input placeholder="请输入原始密码！" ref="old" v-model="form.oldPwd">
        <span class="iconfont icon-mima" slot="label"></span>
      </x-input>
    </group>
    <group gutter="10px">
      <x-input placeholder="请输入新密码！" ref="new1" v-model="form.newPwd">
        <span class="iconfont icon-mima" slot="label"></span>
      </x-input>
    </group>
    <group gutter="10px">
      <x-input placeholder="请再次输入新密码！" ref="new2" v-model="pwd">
        <span class="iconfont icon-mima" slot="label"></span>
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
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: res.body.msg,
              time: '1000'
            })
            setTimeout(() => {
              this.$router.replace('/login')
            }, 1000)
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
