<template>
  <div class="page gray">
    <group gutter="0" v-if="order.companyName">
      <cell title="投保公司" :value="order.companyName"></cell>
      <cell title="保单信息" value="保单详情" is-link :link="'/policy/' + form.userId + '/' + form.orderId"></cell>
      <cell title="商业险" :value="'￥' + order.samount"></cell>
      <cell title="交强险" :value="'￥' + order.jamount"></cell>
      <cell title="车船费" :value="'￥' + order.camount"></cell>
      <cell>
        <p slot="value">应付总额：<span class="num c-red">￥{{order.amount}}</span></p>
      </cell>
    </group>
    <group gutter="10px">
      <cell title="订单号：" :value="order.orderSn" value-align="left"></cell>
      <cell title="支付方式：" :value="payType" value-align="left"></cell>
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
        payType: '',
        order: {
          amount: 0
        },
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
          console.log(res)
          this.order = res.body.data.order
          this.order.jqamount = parseFloat(this.order.jamount) + parseFloat(this.order.camount)
          switch (this.order.payType) {
            case 0:
              this.payType = '未知'
              break
            case 1:
              this.payType = '支付宝APP'
              break
            case 2 :
              this.payType = '微信APP'
              break
            case 3 :
              this.payType = '微信公众号'
              break
          }
        })
      }
    }
  }
</script>
