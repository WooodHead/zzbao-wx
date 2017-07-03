<template>
  <div class="page gray form-panel">
    <group gutter="0">
      <x-input placeholder="请输入支付密码" ref="pay" v-model="form.payPwd">
        <span class="iconfont icon-mima" slot="label"></span>
      </x-input>
    </group>
    <group gutter="10px">
      <x-input placeholder="请再次输入支付密码" ref="pays" v-model="payPwd">
        <span class="iconfont icon-mima" slot="label"></span>
      </x-input>
    </group>
    <group gutter="10px">
      <x-input placeholder="请输入您注册的手机号" ref="tel" v-model="form.tel" is-type="china-mobile">
        <span class="iconfont icon-shouji" slot="label"></span>
      </x-input>
    </group>
    <group gutter="10px">
      <x-input placeholder="验证码" ref="code" v-model="form.captcha":show-clear="false">
        <span class="iconfont icon-yzm" slot="label"></span>
        <x-button class="code" slot="right" type="warn" @click.native="handleSendSms" v-show="!show" :show-loading="getting">{{text}}</x-button>
        <x-button v-show="show" slot="right" class="count" style="margin-top:0;" @click.native="handleTips">
          <countdown v-model="time" @on-finish="handleTime" :start="start"></countdown>
          秒重新获取
        </x-button>
      </x-input>
    </group>
    <group>
      <x-button type="warn" @click.native="handleSubmit" :show-loading="loading">确认修改</x-button>
    </group>
  </div>
</template>
<script>
  import {Group, XInput, XButton, Countdown} from 'vux'
  import {time, resetPayPwd} from '../config'
  import {mapMutations} from 'vuex'
  export default {
    name: 'passwordPay',
    head: {
      title: {
        inner: '修改支付密码'
      }
    },
    data () {
      return {
        show: false,
        loading: false,
        getting: false,
        text: '获取验证码',
        start: false,
        time: time,
        payPwd: '',
        smsType: 1,
        form: {
          tel: '',
          userId: '',
          payPwd: '',
          captcha: ''
        }
      }
    },
    created () {
      this.form.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
    },
    components: {
      Group,
      XInput,
      XButton,
      Countdown
    },
    methods: {
      handleSubmit () {
        if (!this.form.payPwd || !this.payPwd) {
          this.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '请输入支付密码！',
            time: '1000'
          })
        } else if (this.form.payPwd !== this.payPwd) {
          this.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '两次输入的密码不同！',
            time: '1000'
          })
        } else {
          this.$http({
            method: 'jsonp',
            url: resetPayPwd,
            jsonp: 'callback',
            jsonpCallback: 'json',
            params: this.form,
            before: () => {
              this.loading = true
            }
          })
          .then(res => {
            this.loading = false
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: res.body.msg,
              time: '1000'
            })
            setTimeout(() => {
              this.$router.replace('/personer')
            }, 1000)
          })
        }
      },
      handleTips () {
        this.$vux.toast.show({
          type: 'text',
          width: '20em',
          position: 'bottom',
          text: this.time + '秒后才能重新获取！',
          time: '1000'
        })
      },
      handleTime () {
        this.show = false
        this.start = false
        this.time = time
      },
      handleSendSms () {
        this.postSMS(this)
      },
      ...mapMutations({
        postSMS: 'postSMS'
      })
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

