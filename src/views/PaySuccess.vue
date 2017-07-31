<template>
  <div class="page gray">
    <group gutter="0">
      <div style="padding:2rem 0;">
        <h2 class="tip"><span class="iconfont icon-correct"></span>订单支付成功</h2>
        <ul class="row w" style="margin-top:1rem;">
          <li class="col v-m col-12" style="padding:0 0.5rem 0 4rem;">
            <x-button plain type="primary" class="custom-primary-red" @click.native="seeOrder">查看订单</x-button>
          </li>
          <li class="col v-m col-12" style="padding:0 4rem 0 0.5rem;">
            <x-button plain type="primary" class="custom-primary-red" @click.native="backHome">返回首页</x-button>
          </li>
        </ul>
      </div>
    </group>
    <group gutter="10px">
      <cell title="订单号：" :value="info.orderSn" value-align="left"></cell>
      <cell title="支付方式：" :value="payType" value-align="left"></cell>
      <cell title="支付金额：" :value="'￥' + info.amount" value-align="left"></cell>
    </group>
  </div>
</template>
<script>
  import {Group, Cell, XButton} from 'vux'
  import {orderInfo, server} from '../config'
  export default {
    head: {
      title: {
        inner: '个人中心',
        separator: ' '
      }
    },
    name: 'paySuccess',
    components: {
      Group,
      Cell,
      XButton
    },
    data () {
      return {
        userId: this.$route.params.userId,
        orderId: this.$route.params.orderId,
        info: {}
      }
    },
    mounted () {
      this.id = this.$route.params.id
    },
    created () {
      this.getDetail()
    },
    methods: {
      seeOrder () {
        if (this.$route.query.platform === 'ios') {
          loadURL(server + '/?showOrder=click')
        } else if (this.$route.query.platform === 'android') {
          jsToApp.back()
        } else {
          this.jump('/orderdetail/' + this.userId + '/' + this.orderId + '/web')
        }
      },
      backHome () {
        if (this.$route.query.platform === 'ios') {
          loadURL(server + '/?back=home')
        } else if (this.$route.query.platform === 'android') {
          jsToApp.back()
        } else {
          this.jump('/')
        }
      },
      jump (url) {
        this.$router.push(url)
      },
      getDetail () {
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
          switch (this.info.payType) {
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
<style scoped>
.tip{font-size:1.6rem;text-align:center;color:#3D3D3D;}
.tip .iconfont{font-size:2.4rem;margin-right:1rem;color:#49BC2E;vertical-align: middle;}
</style>
<style lang="less">
.custom-primary-red {
  border-radius: 99px!important;
  border-color: #CE3C39!important;
  color: #CE3C39!important;
  &:active {
    border-color: rgba(206, 60, 57, 0.6)!important;
    color: rgba(206, 60, 57, 0.6)!important;
    background-color: transparent;
  }
}
