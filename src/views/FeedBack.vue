<template>
  <div class="page gray row w feedback">
    <div class="col v-t t-l p-1" style="padding-top:0;">
      <group title="反馈意见">
        <x-textarea v-model="form.content" placeholder="请填写反馈意见！"></x-textarea>
      </group>
      <group title="联系方式">
        <x-input is-type="china-mobile" v-model="form.phone" ref="tel" type="tel"  placeholder="请填写联系方式！"></x-input>
      </group>
      <x-button type="warn" style="margin-top:2rem;" :show-loading="loading" @click.native="handleSubmit">提交</x-button>
    </div>
  </div>
</template>
<script>
  import {Group, Cell, XInput, XTextarea, XButton} from 'vux'
  import {feedback} from '../config'
  export default {
    name: 'feedback',
    head: {
      title: {
        inner: '意见反馈',
        separator: ' '
      }
    },
    components: {
      Group,
      Cell,
      XInput,
      XTextarea,
      XButton
    },
    data () {
      return {
        loading: false,
        form: {
          userId: '',
          content: '',
          phone: ''
        }
      }
    },
    mounted () {
      if (this.$localStorage.get('logined') !== 'false') {
        this.form.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
      } else {
        this.$router.replace('/login')
      }
    },
    methods: {
      handleSubmit () {
        if (this.form.content.length < 20) {
          this.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '反馈内容必须大于20个字符！',
            time: '1000'
          })
        } else if (!this.form.phone) {
          this.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '手机号码不能为空！',
            time: '1000'
          })
        } else if (!this.$refs.tel.valid) {
          this.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '手机号码有误！',
            time: '1000'
          })
        } else {
          this.$http({
            method: 'jsonp',
            url: feedback,
            jsonp: 'callback',
            jsonpCallback: 'json',
            params: this.form,
            before: () => {
              this.loading = true
            }
          })
          .then(res => {
            this.loading = false
            this.form.content = this.form.phone = ''
            if (res.body.status) {
              this.$vux.toast.show({
                type: 'text',
                width: '12em',
                position: 'bottom',
                text: '已收到您的反馈！',
                time: '1000'
              })
              this.$router.replace('/personer')
            } else {
              this.$vux.toast.show({
                type: 'text',
                width: '12em',
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
<style>
.feedback .weui-cells{border-left:1px solid #eee;border-right:1px solid #eee;}
.feedback .weui-cells__title{color:#2f2f2f;font-size:1.1rem;padding:0.2rem 0;}
.feedback .weui-textarea,.feedback .weui-input{font-size:1.1rem;}
.feedback .weui-cell{padding:0.7rem 1rem;}
</style>
