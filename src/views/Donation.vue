<template>
  <div class="page gray fix-banner has-btn">
    <div class="banner">
      <div class="row w h">
        <div class="col v-m t-c">
          <h2>{{balance}}</h2>
          <p>现有积分（分）</p>
        </div>
      </div>
    </div>
    <div class="h auto content">
      <scroller :height="height" lock-x>
        <group gutter="0px">
          <x-input title="获赠用户" placeholder="请输入获赠人的手机号码" novalidate :show-clear="false" placeholder-align="right" text-align="right" v-model="form.target" type="number"></x-input>
          <x-input title="赠与积分" placeholder="请输入要赠与的积分数额" novalidate :show-clear="false" placeholder-align="right" text-align="right" v-model="form.score" type="number" :min="0"></x-input>
          <x-input title="支付密码" placeholder="请输入支付密码" novalidate :show-clear="false" placeholder-align="right" text-align="right" v-model="form.payPwd" type="password"></x-input>
        </group>
        <p class="text" v-if="!hadPayPwd">您的支付密码还未设置，<router-link to="" class="c-red">立即设置</router-link></p>
      </scroller>
    </div>
    <div class="btn-area row w" style="border:none;">
      <div class="col v-m">
        <x-button type="warn" @click.native="handleSubmit">确认转赠</x-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {Group, Cell, XInput, XButton, Scroller} from 'vux'
  import {donation} from '../config'
  export default {
    name: 'donation',
    head: {
      title: {
        inner: '积分转赠'
      }
    },
    components: {
      Group,
      Cell,
      XInput,
      XButton,
      Scroller
    },
    data () {
      return {
        height: '',
        balance: 0,
        hadPayPwd: false,
        form: {
          userId: '',
          score: '',
          target: '',
          payPwd: ''
        }
      }
    },
    created () {
      this.balance = this.$localStorage.get('balance')
      this.form.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
      this.hadPayPwd = JSON.parse(this.$localStorage.get('userInfo')).hadPayPwd
    },
    mounted () {
      this.height = document.querySelector('.content').clientHeight + 'px'
    },
    methods: {
      handleSubmit () {
        if (!this.form.target) {
          this.$vux.toast.show({
            type: 'text',
            width: '15em',
            position: 'bottom',
            text: '请填写获赠用户！',
            time: '1000'
          })
        } else if (this.form.score <= 0 || !this.form.score) {
          this.$vux.toast.show({
            type: 'text',
            width: '15em',
            position: 'bottom',
            text: '赠予积分必须大于0！',
            time: '1000'
          })
        } else if (!this.form.payPwd) {
          this.$vux.toast.show({
            type: 'text',
            width: '15em',
            position: 'bottom',
            text: '支付密码不得为空！',
            time: '1000'
          })
        } else if (this.form.score > parseInt(this.balance)) {
          this.$vux.toast.show({
            type: 'text',
            width: '17em',
            position: 'bottom',
            text: '赠与的积分不得大于现有积分！',
            time: '1000'
          })
        } else {
          this.$http({
            method: 'jsonp',
            url: donation,
            jsonp: 'callback',
            jsonpCallback: 'json',
            params: this.form,
            before: () => {
            }
          })
          .then(res => {
            console.log(res)
            let balance = this.balance - this.form.score
            const userInfo = JSON.parse(this.$localStorage.get('userInfo'))
            userInfo.userBalance = balance
            this.$localStorage.set('userInfo', JSON.stringify(userInfo))
            this.$vux.toast.show({
              type: 'text',
              width: '20em',
              position: 'bottom',
              text: res.body.msg,
              time: '1000'
            })
          })
        }
      }
    }
  }
</script>
<style scoped>
.fix-banner{padding-top:18vh;}
.banner{height:18vh;margin-top:-18vh;background:#EB3D00;color:#fff;}
.banner p{font-size:1rem;color:rgba(255,255,255,0.8);}
.text{font-size:1.2rem;padding:0.5rem 1rem;color:#444;}
.text a{text-decoration:underline;}
.has-btn{padding-bottom:5rem;}
</style>
