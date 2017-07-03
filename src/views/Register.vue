<template>
  <div class="page row gray login">
    <div class="col v-t t-c form-panel">
      <p class="tips" v-if="isReg">该号码已经注册，请前往<router-link to="/login">登录</router-link></p>
      <group gutter="0px">
        <x-input placeholder="请输入真实手机号" v-model="form.tel" is-type="china-mobile" ref="tel">
          <span class="iconfont icon-shouji" slot="label"></span>
        </x-input>
      </group>
      <group gutter="10px">
        <x-input placeholder="请输入您的姓名" v-model="form.name">
          <span class="iconfont icon-user" slot="label"></span>
        </x-input>
      </group>
      <group gutter="10px">
        <x-input placeholder="请输入登录密码" v-model="pwd" :min="6" ref="pwd" @on-blur="checkPwd" type="password">
          <span class="iconfont icon-mima" slot="label"></span>
        </x-input>
      </group>
      <group gutter="10px">
        <x-input placeholder="请再次输入密码" v-model="form.pwd" :min="6" @on-blur="reCheckPwd" ref="pwd1" type="password">
          <span class="iconfont icon-mima" slot="label"></span>
        </x-input>
      </group>
      <group gutter="10px">
        <x-input placeholder="请输入验证码" v-model="form.captcha" :show-clear="false">
          <span class="iconfont icon-yzm" slot="label"></span>
          <x-button class="code" slot="right" type="warn" @click.native="handleSendSms" v-show="!show" :show-loading="getting">{{text}}</x-button>
          <x-button v-show="show" slot="right" class="count" style="margin-top:0;" @click.native="handleTips">
            <countdown v-model="time" @on-finish="handleTime" :start="start"></countdown>
            秒重新获取
          </x-button>
        </x-input>
      </group>
      <group gutter="10px">
        <x-button type="warn" :show-loading="loading" @click.native="handleRegister">注册</x-button>
      </group>
    </div>
  </div>
</template>
<script>
  import {Group, Cell, XInput, XButton, Countdown} from 'vux'
  import {mapMutations} from 'vuex'
  import {time} from '../config'
  export default {
    name: 'register',
    data () {
      return {
        isReg: false,
        loading: false, // 注册按钮显示加载
        getting: false, // 获取验证码显示加载
        show: false, // 倒计时
        start: false,
        time: time,
        smsType: 2,
        text: '发送验证码',
        pwd: '',
        form: {
          tel: '',
          name: '',
          captcha: '',
          pwd: ''
        }
      }
    },
    components: {
      Group,
      Cell,
      XInput,
      XButton,
      Countdown
    },
    methods: {
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
      handleRegister () {
        this.postRegister(this)
      },
      checkPwd () {
        if (!this.$refs.pwd.valid) {
          this.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '密码必须大于6位！',
            time: '1000'
          })
        }
      },
      reCheckPwd () {
        if (this.pwd !== this.form.pwd) {
          this.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '两次输入密码不同！',
            time: '1000'
          })
        }
      },
      ...mapMutations({
        postRegister: 'postRegister',
        postSMS: 'postSMS'
      })
    }
  }
</script>
<style>
.form-panel .weui-cell{padding:0.3rem 1rem !important;}
.form-panel .weui-cell__hd:before,.form-panel .weui-cell__hd:after{content:"";display:inline-block;width:0;height:5rem;position:absolute;top:0;left:0;border-left:1px solid #d9d9d9;transform:scaleX(0.5);}
.form-panel .weui-cell__hd:after{left:auto;right:0;}
.form-panel .iconfont{color:#959595;font-size:1.8rem;padding-right:0.5rem;}
.form-panel .weui-cell__ft{position:absolute;right:0;top:50%;transform:translate(0,-50%);}
.weui-btn.code .weui-loading{position:absolute;left:0.5rem;top:50%;margin-top:-10px !important;}
.weui-btn.code.weui-btn_loading{padding-left:2rem !important;}
.form-panel .iconfont{color:#959595;font-size:1.8rem;padding-right:0.5rem;}
</style>
<style scoped>
.tips{padding:0.5rem;}
.tips a{color:#F8B918;padding:0 0.5rem;text-decoration:underline;}
</style>
