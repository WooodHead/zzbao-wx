<template>
  <div class="page gray has-btn">
    <div class="content h auto">
      <group title="订单信息">
        <cell title="投保公司" value="太平洋保险"></cell>
        <cell title="保单信息" value="保单详情" is-link :link="'/policy/' + userId + '/' + orderId"></cell>
        <cell title="商业险" value="￥2837.50"></cell>
        <cell title="交强险" value="￥760.00"></cell>
        <cell title="车船税" value="￥360.00"></cell>
        <cell>
          <p slot="value">应付总额：<span class="num c-red">￥4832.00</span></p>
        </cell>
      </group>
      <group title="支付方式">
        <radio :options="pay" v-model="paymodel"></radio>
      </group>
    </div>
    <div class="btn-area row w">
      <div class="col v-m">
        <x-button type="warn" :show-loading="loading" @click.native="handlePay">立即支付</x-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {Group, Cell, XButton, Radio} from 'vux'
  export default {
    name: 'pay',
    head: {
      title: {
        inner: '支付'
      }
    },
    components: {
      Group,
      Cell,
      XButton,
      Radio
    },
    data () {
      return {
        userId: this.$route.params.userId,
        orderId: this.$route.params.orderId,
        loading: false,
        paymodel: 1,
        pay: [{
          icon: 'static/img/alipay.png',
          key: 1,
          value: '支付宝'
        }, {
          icon: 'static/img/wechat.png',
          key: 2,
          value: '微信'
        }]
      }
    },
    methods: {
      handlePay () {
        this.loading = true
        const This = this
        setTimeout(() => {
          This.loading = false
          This.$router.push('/paysuccess/' + this.userId + '/' + this.orderId)
        }, 2000)
      }
    }
  }
</script>
<style>
.num{font-size:1.8rem;}
</style>
