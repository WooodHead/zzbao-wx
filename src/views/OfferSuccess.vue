<template>
  <div class="page gray has-btn">
    <div class="h auto content">
      <group gutter="0px" v-if="order">
        <cell :title="order.orderInfo.user.ownerName" :value="order.orderInfo.user.ownerLicense"></cell>
        <cell title="保险公司" :value="order.orderInfo.company.companyName"></cell>
        <cell title="订单号" :value="orderSn"></cell>
      </group>
      <div class="row w msg">
        <div class="col v-m col-7 t-r">
          <span class="iconfont icon-correct"></span>
        </div>
        <div class="col v-m col-17">
          <h2>订单已提交！</h2>
          <p>至尊惠保正在与保险公司确定价格中……</p>
        </div>
      </div>
      <group class="tip" gutter="0px">
        <p><b>提示：</b>1.工作时间内，30分钟为您提供报价；2.非工作时间内，下个工作时间开始后的30分钟内为您提供报价；3.我们将为您提最优惠的价格。</p>
      </group>
    </div>
    <div class="btn-area row w">
      <div class="col v-m">
        <x-button type="warn" @click.native="handleSubmit">查看订单详情</x-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {Group, Cell, XButton} from 'vux'
  import {orderDetail} from '../config'
  export default {
    name: 'offerSuccess',
    head: {
      title: {
        inner: '报价结果',
        separator: ' '
      }
    },
    components: {
      Group,
      Cell,
      XButton
    },
    data () {
      return {
        form: {
          orderId: this.$route.params.orderId,
          userId: this.$route.params.userId
        },
        orderSn: '',
        order: {
          user: {
            ownerName: '',
            ownerLicense: ''
          },
          company: {
            companyName: ''
          }
        }
      }
    },
    created () {
      // this.setTitle('报价结果')
      this.order = JSON.parse(this.$localStorage.get('order'))
      this.orderSn = this.$route.params.orderSn
      // this.getOrder()
    },
    methods: {
      setTitle (title) {
        if (this.$route.query.platform === 'app') {
          jsToApp.setTitle(title)
        }
      },
      handleSubmit () {
        this.$router.push('/policy/' + this.form.userId + '/' + this.$route.params.orderId)
      },
      getOrder () {
        this.$http({
          method: 'jsonp',
          url: orderDetail,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form
        })
        .then(res => {
          console.log(this.order)
          this.orderSn = res.body.data.orderSn
          console.log(this.orderSn)
        })
      }
    }
  }
</script>
<style scoped>
.msg{margin-top:2rem;}
.msg .iconfont{font-size:4rem;color:#49BC2E;margin-right:0.5rem;}
.msg h2{font-size:1.2rem;color:#3B3B3B;}
.msg p{font-size:1rem;color:#AEAEAE;}
.tip{padding:2rem;}
.tip p{font-size:1rem;color:#767676;line-height:1.6;}
.tip p b{font-weight:bold;color:#2b2b2b;}
</style>
<style>
.tip .weui-cells{padding:1rem;border:1px solid #eee;border-radius:0.5rem;}
.tip .weui-cells:before,.tip .weui-cells:after{display:none;}
</style>
