<template>
  <div class="page row gray login">
    <div class="col v-t t-c form-panel">
      <p class="tips" v-if="isReg">该号码已经注册，请前往<router-link to="/login">登录</router-link></p>
      <group gutter="0px">
        <x-input placeholder="请输入真实手机号" v-model="form.tel" is-type="china-mobile" ref="tel">
          <img style="width:2rem;margin:0.2rem 0;" src="static/img/phone.png" slot="label" alt="">
        </x-input>
      </group>
      <group gutter="10px">
        <x-input placeholder="请输入您的姓名" v-model="form.name">
          <img style="width:2rem;margin:0.2rem 0;" src="static/img/user.png" slot="label" alt="">
        </x-input>
      </group>
      <group gutter="10px">
        <x-input placeholder="请输入登录密码" v-model="pwd" :min="6" ref="pwd" @on-blur="checkPwd" type="password">
          <img style="width:2rem;margin:0.2rem 0;" src="static/img/pwd.png" slot="label" alt="">
        </x-input>
      </group>
      <group gutter="10px">
        <x-input placeholder="请再次输入密码" v-model="form.pwd" :min="6" @on-blur="reCheckPwd" ref="pwd1" type="password">
          <img style="width:2rem;margin:0.2rem 0;" src="static/img/pwd.png" slot="label" alt="">
        </x-input>
      </group>
      <group gutter="10px" class="getcode">
        <ul class="row w">
          <li class="col v-m col-14">
            <x-input placeholder="请输入验证码" v-model="form.captcha" :show-clear="false">
              <img style="width:2rem;margin:0.2rem 0;" src="static/img/code.png" slot="label" alt="">
            </x-input>
          </li>
          <li class="col v-m col-10" style="padding-left:0.5rem;background:#F7F7F7;">
            <x-button class="code" slot="right" type="warn" @click.native="handleSendSms" v-show="!show" :show-loading="getting">{{text}}</x-button>
            <x-button v-show="show" slot="right" class="code" type="warn" style="margin-top:0;" @click.native="handleTips">
              <countdown v-model="time" @on-finish="handleTime" :start="start"></countdown>
              s重新获取
            </x-button>
          </li>
        </ul>
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
    head: {
      title: {
        inner: '用户注册'
      }
    },
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
.getcode .weui-cells .col:last-child:after{content:"";display:inline-block;width:100%;height:1px;background:#f7f7f7;position:absolute;left:0;bottom:0;z-index:1000;}
.getcode .weui-btn_warn{background:#DDDDDD;border-radius:0;height:3rem;color:#414141;}
.getcode .weui-btn_warn:active{background:#ccc !important;color:#666;}
.getcode .weui-btn_warn:after{display:none;}
</style>
<style scoped>
.tips{padding:0.5rem;}
.tips a{color:#F8B918;padding:0 0.5rem;text-decoration:underline;}
</style>
