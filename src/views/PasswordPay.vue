<template>
  <div class="page gray form-panel">
    <group gutter="0">
      <x-input placeholder="请输入支付密码" ref="pay" v-model="form.payPwd" type="password" :min="6" :max="6">
        <img style="width:2rem;margin:0.2rem 0;" src="static/img/pwd.png" slot="label" alt="">
      </x-input>
    </group>
    <group gutter="10px">
      <x-input placeholder="请再次输入支付密码" ref="pays" v-model="payPwd" type="password" :min="6" :max="6">
        <img style="width:2rem;margin:0.2rem 0;" src="static/img/pwd.png" slot="label" alt="">
      </x-input>
    </group>
    <group gutter="10px">
      <x-input placeholder="请输入您注册的手机号" ref="tel" v-model="form.tel" is-type="china-mobile">
        <img style="width:2rem;margin:0.2rem 0;" src="static/img/phone.png" slot="label" alt="">
      </x-input>
    </group>
    <group gutter="10px" class="getcode">
      <ul class="row w">
        <li class="col v-m col-14" style="position:relative;">
          <x-input placeholder="验证码" ref="code" v-model="form.captcha":show-clear="false">
            <img style="width:2rem;margin:0.2rem 0;" src="static/img/code.png" slot="label" alt="">
          </x-input>
        </li>
        <li class="col v-m col-10" style="padding-left:0.5rem;background:#F7F7F7;">
          <x-button class="code" slot="right" type="warn" @click.native="handleSendSms" v-show="!show" :show-loading="getting">{{text}}</x-button>
          <x-button v-show="show" slot="right" type="warn" class="code" style="margin-top:0;" @click.native="handleTips">
            <countdown v-model="time" @on-finish="handleTime" :start="start"></countdown>
            s获取
          </x-button>
        </li>
      </ul>
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
        } else if (!this.form.captcha) {
          this.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '请先获取验证码！',
            time: '1000'
          })
        } else if (!parseInt(this.form.payPwd)) {
          this.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '请输入6位数字密码！',
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
            if (res.body.status) {
              this.$vux.toast.show({
                type: 'text',
                width: '15em',
                position: 'bottom',
                text: '支付密码设置成功！',
                time: '1000'
              })
              let userInfo = JSON.parse(this.$localStorage.get('userInfo'))
              userInfo.hadPayPwd = true
              this.$localStorage.set('userInfo', JSON.stringify(userInfo))
              setTimeout(() => {
                this.$router.replace('/personer')
              }, 1000)
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
.form-panel .weui-cell__hd:before,.form-panel .weui-cell__hd:after{content:"";display:inline-block;width:1px;height:5rem;position:absolute;top:0;left:0;border-left:1px solid #d9d9d9;transform:scaleX(0.5);-webkit-transform:scaleX(0.5);}
.form-panel .weui-cell__hd:after{left:auto;right:0;border-left:none;border-right:1px solid #D9D9D9;}
.form-panel .iconfont{padding:0;padding-right:0.5rem;}
.form-panel .weui-cell{padding:0.3rem 0.3rem 0.3rem 1rem;}
.getcode .weui-cells .col:last-child:after{content:"";display:inline-block;width:100%;height:1px;background:#f7f7f7;position:absolute;left:0;bottom:0;z-index:1000;}
.getcode .weui-btn_warn{background:#DDDDDD;border-radius:0;height:3rem;color:#414141;}
.getcode .weui-btn_warn:active{background:#ccc;color:#666;}
.getcode .weui-btn_warn:after{display:none;}
</style>

