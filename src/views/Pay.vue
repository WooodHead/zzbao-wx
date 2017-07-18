<template>
  <div class="page gray has-btn">
    </loading>
    <div class="content h auto">
      <group title="订单信息">
        <cell title="投保公司" :value="info.companyName"></cell>
        <cell title="保单信息" value="保单详情" is-link :link="'/policy/' + userId + '/' + orderId"></cell>
        <cell title="商业险" :value="'￥' + info.extraAmount"></cell>
        <cell title="交强险（车船税）" :value="'￥' + info.baseAmount"></cell>
        <cell>
          <p slot="value">应付总额：<span class="num c-red">￥{{info.amount}}</span></p>
        </cell>
      </group>
      <group title="支付方式" class="pay">
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
  import {Group, Cell, XButton, Radio, Loading} from 'vux'
  import {pay} from '../config'
  import $ from 'jquery'
  export default {
    name: 'pay',
    head: {
      title: {
        inner: '支付',
        separator: ' '
      }
    },
    components: {
      Group,
      Cell,
      XButton,
      Radio,
      Loading
    },
    data () {
      return {
        paying: true,
        info: {},
        userId: this.$route.params.userId,
        orderId: this.$route.params.orderId,
        loading: false,
        paymodel: 2,
        // pay: [{
        //   icon: 'static/img/alipay.png',
        //   key: 1,
        //   value: '支付宝'
        // }, {
        //   icon: 'static/img/wechat.png',
        //   key: 2,
        //   value: '微信'
        // }]
        wx: this.$wechat,
        pay: [{
          icon: 'static/img/wechat.png',
          key: 2,
          value: '微信'
        }]
      }
    },
    created () {
      this.info = JSON.parse(this.$localStorage.get('orderDetail'))
      console.log(this.info)
    },
    methods: {
      handlePay () {
        this.$vux.loading.show({
          text: '支付中！'
        })
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.$vux.loading.hide()
          console.log(pay)
          $.ajax({
            type: 'post',
            url: pay,
            crossDomain: true,
            async: false,
            data: {
              userId: this.userId,
              orderId: this.orderId,
              payType: this.paymodel
            },
            dataType: 'json',
            before: function (req) {
            },
            complete: function (data) {
            },
            success: function (res) {
              this.loading = false
              if (res.body.status) {
                this.$vux.toast.show({
                  type: 'text',
                  width: '22em',
                  position: 'bottom',
                  text: '恭喜，支付成功！',
                  time: '3000'
                })
                setTimeout(() => {
                  this.$router.replace('/paysuccess/' + this.userId + '/' + this.orderId)
                }, 1000)
              } else {
                this.$vux.toast.show({
                  type: 'text',
                  width: '22em',
                  position: 'bottom',
                  text: res.body.msg,
                  time: '3000'
                })
              }
            }
          })
          // this.$http({
          //   method: 'jsonp',
          //   url: pay,
          //   jsonp: 'callback',
          //   jsonpCallback: 'json',
          //   params: {
          //     userId: this.userId,
          //     orderId: this.orderId,
          //     payType: this.paymodel
          //   }
          // })
          // .then(res => {
          //   this.loading = false
          //   if (res.body.status) {
          //     this.$vux.toast.show({
          //       type: 'text',
          //       width: '22em',
          //       position: 'bottom',
          //       text: '恭喜，支付成功！',
          //       time: '3000'
          //     })
          //     setTimeout(() => {
          //       this.$router.replace('/paysuccess/' + this.userId + '/' + this.orderId)
          //     }, 1000)
          //   } else {
          //     this.$vux.toast.show({
          //       type: 'text',
          //       width: '22em',
          //       position: 'bottom',
          //       text: res.body.msg,
          //       time: '3000'
          //     })
          //   }
          // })
        }, 2000)
      }
    }
  }
</script>
<style>
.num{font-size:1.8rem;}
.weui-cells_radio .weui-check:checked + .weui-icon-checked:before{content:"\e63f" !important;color:#fff !important;display:inline-block;width:2rem;height:2rem;line-height:2rem;text-align:center;background:#EB3D00;border-radius:50%;font-family:"iconfont"}
.weui-mask_transparent{background:rgba(17,17,17,0.7)}
</style>
