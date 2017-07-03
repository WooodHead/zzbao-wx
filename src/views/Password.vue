<template>
  <div class="page row gray login">
    <div class="col v-t t-c">
      <div class="form-panel">
        <div class="tips">请填写注册用的手机号码，验证码将发送到您的手机</div>
        <group gutter="10px">
          <XInput placeholder="请输入手机号" v-model="form.tel" ref="tel" is-type="china-number">
            <span class="iconfont icon-shouji" slot="label"></span>
          </XInput>
        </group>
        <group gutter="10px" class="code">
          <XInput placeholder="验证码" v-model="form.captcha" :show-clear="false">
            <span class="iconfont icon-yzm" slot="label"></span>
            <x-button class="code" slot="right" type="warn" :disabled="!form.tel" @click.native="handleSendSms" v-show="!show" :show-loading="getting">{{text}}</x-button>
            <x-button v-show="show" slot="right" class="count" style="margin-top:0;" @click.native="handleTips">
              <countdown v-model="time" @on-finish="handleTime" :start="start"></countdown>
              秒重新获取
            </x-button>
          </XInput>
        </group>
        <group gutter="10px">
          <XInput placeholder="请输入新密码" v-model="form.pwd">
            <span class="iconfont icon-mima" slot="label"></span>
          </XInput>
        </group>
        <group gutter="10px">
          <XInput placeholder="请再次输入密码" v-model="pwd">
            <span class="iconfont icon-mima" slot="label"></span>
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

