<template>
  <div class="page gray has-btn">
    </loading>
    <div class="content h auto">
      <group title="订单信息">
        <cell title="投保公司" :value="info.companyName"></cell>
        <cell title="保单信息" value="保单详情" is-link :link="'/policy/' + userId + '/' + orderId"></cell>
        <cell title="商业险" :value="'￥' + info.samount"></cell>
        <cell title="交强险" :value="'￥' + info.jamount"></cell>
        <cell title="车船费" :value="'￥' + info.camount"></cell>
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
  import {pay, orderInfo} from '../config'
  import $ from 'jquery'
  export default {
    name: 'pay',
    head: {
      title: {
        inner: '支付订单',
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
        info: {
          samount: 0,
          jamount: 0,
          camount: 0,
          amount: 0
        },
        userId: this.$route.params.userId,
        orderId: this.$route.params.orderId,
        loading: false,
        paymodel: 2,
        tag: '',
        pay: []
      }
    },
    created () {
      this.setTitle('支付订单')
      this.tag = this.$route.params.tag
      if (this.tag === 'web') {
        this.pay = [{
          icon: 'static/img/wechat.png',
          key: 2,
          value: '微信'
        }]
      } else {
        this.pay = [{
          icon: 'static/img/alipay.png',
          key: 1,
          value: '支付宝'
        }, {
          icon: 'static/img/wechat.png',
          key: 2,
          value: '微信'
        }]
      }
      // this.info = JSON.parse(this.$localStorage.get('orderDetail'))
      // console.log(this.info)
      this.getInfo()
    },
    methods: {
      setTitle (title) {
        if (this.$route.query.platform === 'app') {
          jsToApp.setTitle(title)
        }
      },
      handlePay () {
        if (this.tag === 'web') {
          window.location.href = pay + '?userId=' + this.userId + '&orderId=' + this.orderId
        } else if (this.tag === 'app') {
          if (this.paymodel === 2) {
            jsToApp.wxPay(this.orderId)
            wxPay(this.orderId)
          } else if (this.paymodel === 1) {
            jsToApp.zfbPay(this.orderId)
            zfbPay(this.orderId)
          }
        } else {
          this.$router.replace('/payIos?userId=' + this.userId + '&orderId=' + this.orderId)
        }
      },
      getInfo () {
        this.$http({
          method: 'jsonp',
          url: orderInfo,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: {
            userId: this.userId,
            orderId: this.orderId
          }
        })
        .then(res => {
          console.log(res)
          this.info = res.body.data.order
          this.info.jqamount = parseFloat(this.info.jamount) + parseFloat(this.info.camount)
        })
      },
      handlePay1 () {
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
            dataType: 'html',
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
.weui-cells_radio .weui-check:checked + .weui-icon-checked:before{content:"\e63f" !important;color:#fff !important;display:inline-block;width:2rem;height:2rem;line-height:2rem;text-align:center;background:#FFA500;border-radius:50%;font-family:"iconfont"}
.weui-mask_transparent{background:rgba(17,17,17,0.7)}
</style>
