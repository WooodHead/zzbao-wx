<template>
  <div class="page gray">
    <group class="mt0" v-if="login">
      <cell title="我的资料" link="/information"></cell>
      <cell title="修改支付密码" link="edit/passwordBypay"></cell>
      <cell title="修改登录密码" link="edit/passwordBylogin"></cell>
      <cell title="更换绑定手机" link="edit/phone" :value="tel"></cell>
    </group>
    <group :class="login ? 'mt10' : ''" gutter="0">
      <cell title="客服热线" is-link value="4008 458 458" @click.native="handleCall('4008 458 458')"></cell>
      <cell title="常见问题" link="/question"></cell>
      <cell title="意见反馈" link="/feedback"></cell>
      <cell title="关于我们" link="/aboutUs"></cell>
    </group>
  </div>
</template>
<script>
  import {Group, Cell} from 'vux'
  export default {
    name: 'setting',
    head: {
      title: {
        inner: '设置'
      }
    },
    components: {
      Group,
      Cell
    },
    data () {
      return {
        login: false,
        tel: ''
      }
    },
    mounted () {
      this.login = this.$localStorage.get('logined') === 'true'
      if (this.login) {
        this.tel = JSON.parse(this.$localStorage.get('userInfo')).userTel
      }
    },
    methods: {
      handleCall (tel) {
        window.location.href = 'tel:' + tel
      }
    }
  }
</script>
<style>
.mt0 .weui-cells{margin-top:0 !important;}
.mt10 .weui-cells{margin-top:0.5rem !important;}
</style>
