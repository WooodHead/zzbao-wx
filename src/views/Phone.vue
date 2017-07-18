<template>
  <div class="page row gray login">
    <div class="col v-t t-c form-panel">
      <group gutter="0px">
        <x-input placeholder="请输入新手机号" v-model="form.tel" is-type="china-mobile" ref="tel">
          <img style="width:2rem;margin:0.2rem 0;" src="static/img/phone.png" slot="label" alt="">
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
            <x-button v-show="show" slot="right" type="warn" class="code" style="margin-top:0;" @click.native="handleTips">
              <countdown v-model="time" @on-finish="handleTime" :start="start"></countdown>
              s重新获取
            </x-button>
          </li>
        </ul>
      </group>
      <group gutter="10px">
        <x-button type="warn" :show-loading="loading" @click.native="handleSubmit">确认修改</x-button>
      </group>
    </div>
  </div>
</template>
<script>
  import {Group, Cell, XInput, XButton, Countdown} from 'vux'
  import {mapMutations} from 'vuex'
  import {time, phone} from '../config'
  export default {
    name: 'phone',
    head: {
      title: {
        inner: '修改手机号码',
        separator: ' '
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
          userId: '',
          captcha: ''
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
    created () {
      if (JSON.parse(this.$localStorage.get('userInfo'))) {
        this.form.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
      } else {
        this.$router.replace('/login')
      }
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
      handleSubmit () {
        this.loading = true
        this.$http({
          method: 'jsonp',
          url: phone,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: {
            phone: this.form.tel,
            captcha: this.form.captcha,
            userId: this.form.userId
          }
        })
        .then(res => {
          this.loading = false
          if (res.body.status) {
            this.$vux.toast.show({
              type: 'text',
              width: '20em',
              position: 'bottom',
              text: '手机号修改成功！',
              time: '1000'
            })
            setTimeout(() => {
              this.$localStorage.remove('userInfo')
              this.$localStorage.set('logined', false)
              this.$router.replace('/login')
            }, 1000)
          } else {
            this.$vux.toast.show({
              type: 'text',
              width: '20em',
              position: 'bottom',
              text: res.body.msg,
              time: '1000'
            })
          }
        })
      },
      ...mapMutations({
        postSMS: 'postSMS'
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
.form-panel .weui-cell__hd:before,.form-panel .weui-cell__hd:after{content:"";display:inline-block;width:1px;height:5rem;position:absolute;top:0;left:0;border-left:1px solid #d9d9d9;transform:scaleX(0.5);-webkit-transform:scaleX(0.5);}
.form-panel .weui-cell__hd:after{left:auto;right:-1px;}
.form-panel .iconfont{color:#959595;font-size:1.8rem;padding-right:0.5rem;}
.getcode .weui-cells .col:last-child:after{content:"";display:inline-block;width:100%;height:1px;background:#f7f7f7;position:absolute;left:0;bottom:0;z-index:1000;}
.getcode .weui-btn_warn{background:#DDDDDD;border-radius:0;height:3rem;color:#414141;}
.getcode .weui-btn_warn:active{background:#ccc;color:#666;}
.getcode .weui-btn_warn:after{display:none;}
</style>
<style scoped>
.tips{padding:0.5rem;}
.tips a{color:#F8B918;padding:0 0.5rem;text-decoration:underline;}
</style>
