<template>
  <div class="page gray">
    <group gutter="0" v-if="order.companyName">
      <cell title="投保公司" :value="order.companyName"></cell>
      <cell title="保单信息" value="保单详情" is-link :link="'/policy/' + form.userId + '/' + form.orderId"></cell>
      <cell title="商业险" :value="'￥' + order.extraAmount"></cell>
      <cell title="交强险（车船费）" :value="'￥' + order.baseAmount"></cell>
      <cell>
        <p slot="value">应付总额：<span class="num c-red">￥{{order.amount}}</span></p>
      </cell>
    </group>
    <group gutter="10px">
      <cell title="订单号：" :value="order.orderSn" value-align="left"></cell>
      <cell title="支付方式：" value="微信" value-align="left"></cell>
      <cell title="支付金额：" :value="'￥' + order.amount" value-align="left"></cell>
    </group>
  </div>
</template>
<script>
  import {Group, Cell} from 'vux'
  import {orderInfo} from '../config'
  export default {
    name: 'payInfo',
    head: {
      title: {
        inner: '支付详情',
        separator: ' '
      }
    },
    components: {
      Group,
      Cell
    },
    data () {
      return {
        order: {},
        form: {
          userId: this.$route.params.userId,
          orderId: this.$route.params.orderId
        }
      }
    },
    created () {
      this.getDetail()
    },
    methods: {
      getDetail () {
        this.$http({
          method: 'jsonp',
          url: orderInfo,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form
        })
        .then(res => {
          this.order = res.body.data.order
        })
      }
    }
  }
</script>
