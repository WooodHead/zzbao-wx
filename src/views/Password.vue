<template>
  <div class="page row gray login">
    <div class="col v-t t-c">
      <div class="form-panel">
        <div class="tips">请填写注册用的手机号码，验证码将发送到您的手机</div>
        <group gutter="10px">
          <XInput placeholder="请输入手机号" v-model="form.tel" ref="tel" is-type="china-number">
            <img style="width:2rem;margin:0.2rem 0;" src="static/img/phone.png" slot="label" alt="">
          </XInput>
        </group>
        <group gutter="10px" class="getcode">
          <ul class="row w">
            <li class="col v-m col-14">
              <XInput placeholder="验证码" v-model="form.captcha" :show-clear="false">
              <img style="width:2rem;margin:0.2rem 0;" src="static/img/code.png" slot="label" alt="">
            </XInput>
            </li>
            <li class="col v-m col-10" style="padding-left:0.5rem;background:#F7F7F7;">
              <x-button class="code" slot="right" type="warn" @click.native="handleSendSms" v-show="!show" :show-loading="getting">{{text}}</x-button>
              <x-button v-show="show" slot="right" class="count" style="margin-top:0;" @click.native="handleTips">
                <countdown v-model="time" @on-finish="handleTime" :start="start"></countdown>
                秒重新获取
              </x-button>
            </li>
          </ul>
        </group>
        <group gutter="10px">
          <XInput placeholder="请输入新密码" v-model="form.pwd">
            <img style="width:2rem;margin:0.2rem 0;" src="static/img/pwd.png" slot="label" alt="">
          </XInput>
        </group>
        <group gutter="10px">
          <XInput placeholder="请再次输入密码" v-model="pwd">
            <img style="width:2rem;margin:0.2rem 0;" src="static/img/pwd.png" slot="label" alt="">
          </XInput>
        </group>
        <group gutter="10px">
          <x-button type="warn" :show-loading="loading" @click.native="handleSubmit">确认修改</x-button>
        </group>
      </div>
    </div>
  </div>
</template>
<script>
  import {Group, XInput, XButton, Countdown} from 'vux'
  import {time} from '../config'
  import {mapMutations} from 'vuex'
  export default {
    name: 'password',
    head: {
      title: {
        inner: '忘记密码'
      }
    },
    components: {
      Group,
      XInput,
      XButton,
      Countdown
    },
    data () {
      return {
        loading: false, // 注册按钮显示加载
        getting: false, // 获取验证码显示加载
        show: false, // 倒计时
        start: false,
        time: time,
        smsType: 1,
        text: '发送验证码',
        pwd: '',
        form: {
          tel: '',
          pwd: '',
          captcha: ''
        }
      }
    },
    methods: {
      postSMS () {
        this.handleSms(this)
      },
      handleSubmit () {
        this.handleEditPassword(this)
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
        handleSms: 'postSMS',
        handleEditPassword: 'postEditPassword'
      })
    }
  }
</script>
<style>
.form-panel .weui-cell{padding:0.3rem 1rem !important;}
.form-panel .iconfont{color:#959595;font-size:1.8rem;padding-right:0.5rem;}
.form-panel .weui-cell__ft{position:absolute;right:0;top:50%;transform:translate(0,-50%);}
.weui-btn.code .weui-loading{position:absolute;left:0.5rem;top:50%;margin-top:-10px !important;}
.weui-btn.code.weui-btn_loading{padding-left:2rem !important;}
.code .weui-cell{padding-right:7rem !important;}
</style>
<style scoped>
.iconfont{padding:0 0.5rem 0 0;}
</style>

