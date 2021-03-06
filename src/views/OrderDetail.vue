<template>
  <div class="page gray auto">
    <group gutter="0" v-if="order">
      <cell :value="order.companyName" value-align="right">
        <p slot="title" style="color:#2b2b2b;">{{order.carNum}}-{{order.policyholder}}</p>
      </cell>
      <cell style="padding-bottom:0;">
        <div slot="title" v-if="order">
          <h2 class="tip t-l"><span style="margin-right:0;padding-left:0;padding-right:0.5rem;" :class="'iconfont ' + changeStatus(order.orderStatus).icon"></span>{{changeStatus(order.orderStatus).status}}</h2>
          <p style="padding:0.5rem 0;font-size:1.2rem;color:#8B8B8B;margin-bottom:0.5rem;" v-html="changeStatus(order.orderStatus).text"></p>
        </div>
      </cell>
      <cell class="noline">
        <div slot="inline-desc" style="width:33.3%;overflow:hidden;">
          <x-button v-if="order.orderStatus === 0" type="warn" @click.native="handleBack">撤销报价</x-button>
          <x-button v-if="order.orderStatus === 5 || order.orderStatus === 4" type="warn" @click.native="handlePayInfo">支付详情</x-button>
          <x-button v-if="order.orderStatus === 3" type="warn" @click.native="handlePaying">立即付款</x-button>
          <x-button v-if="order.orderStatus === 2" type="warn" @click.native="handleRetry()">重新下单</x-button>
        </div>
      </cell>
      <cell class="noline" style="margin-top:1rem;">
        <ul class="row w" slot="inline-desc">
          <li class="col v-m col-12 t-c">
            <router-link :to="'/track/'+ form.userId + '/' + form.orderId" @click.native="setTitle('订单跟踪')"><img style="width:2rem;vertical-align:middle" src="static/img/order.png" alt=""><span class="v-m">订单跟踪</span></router-link>
          </li>
          <li class="col v-m col-12 t-c">
            <a @click="setService(true)"><img style="width:2rem;vertical-align:middle" src="static/img/kefu.png" alt=""><span class="v-m">联系客服</span></a>
          </li>
        </ul>
      </cell>
    </group>
    <group gutter="5px" v-if="order" class="orderDetail">
      <cell title="保单信息" is-link :link="'/policy/' + form.userId + '/' + form.orderId" @click.native="setTitle('保单信息')">
        <span style="color:#FFA500;">查看详情</span>
      </cell>
      <cell title="商业险"  v-if="order.extraAmount"></cell>
      <cell v-if="order.baseAmount">
        <p slot="title">交强险<span>（含车船税）</span></p>
      </cell>
    </group>
    <group gutter="5px" v-if="order" class="orderDetail">
      <cell title="车辆信息"></cell>
      <cell title="车牌号" :value="order.carNum"></cell>
      <cell title="车主姓名" :value="order.policyholder"></cell>
    </group>
    <group gutter="5px" v-if="order" class="orderDetail">
      <cell title="订单信息"></cell>
      <cell title="订单号" :value="order.orderSn"></cell>
      <cell title="下单时间" :value="order.createTime"></cell>
    </group>
    <popup v-model="service" class="service" :hide-on-blur="false">
      <h2>客服工作时间：9:00~21:00</h2>
      <group gutter="10px">
        <div style="padding:0 1rem 1rem 1rem;">
          <x-button type="primary" @click.native="takeQQ">咨询在线客服</x-button>
          <x-button type="warn" @click.native="takeTel">拨打客服热线</x-button>
        </div>
      </group>
      <x-button @click.native="setService(false)" plain type="primary" style="border-color:#ccc;color:#999;border-radius:0;border-left:none;border-right:none;">取消</x-button>
    </popup>
  </div>
</template>
<script>
  import {Group, Cell, XButton, Flexbox, FlexboxItem, Divider, dateFormat, Popup} from 'vux'
  import {orderInfo, backOrder, QQ} from '../config'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'orderDetail',
    head: {
      title: {
        inner: '订单详情',
        separator: ' '
      }
    },
    components: {
      Group,
      Cell,
      Flexbox,
      FlexboxItem,
      XButton,
      Popup,
      Divider
    },
    data () {
      return {
        id: 0,
        order: null,
        qq: QQ,
        hasInsurance: false,
        hasForce: false,
        tag: this.$route.params.tag,
        form: {
          userId: '',
          orderId: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        service: 'getService'
      })
    },
    created () {
      this.setTitle('订单详情')
      this.form.orderId = this.$route.params.orderId
      this.form.userId = this.$route.params.userId
      this.getDetail()
    },
    methods: {
      takeQQ () {
        console.log('QQ')
        window.location.href = 'http://wpa.qq.com/msgrd?v=3&uin=2306157540&site=qq&menu=yes'
      },
      takeTel () {
        window.location.href="tel:4006 128 070"
      },
      ...mapMutations({
        setService: 'setService'
      }),
      setTitle (title) {
        console.log(title)
        if (this.$route.query.platform === 'app') {
          jsToApp.setTitle(title)
        }
      },
      handlePaying () {
        this.setTitle('订单支付')
        this.jump('/pay/' + this.form.userId + '/' + this.form.orderId + '/' + this.tag)
      },
      handlePayInfo () {
        this.setTitle('支付详情')
        this.jump('/payinfo/' + this.form.userId + '/' + this.form.orderId)
      },
      handleRetry () {
        this.$router.replace('/offer/' + this.order.companyId + '/' + this.order.userId + '?customerId=' + this.order.userId)
      },
      handleBack () {
        this.$http({
          method: 'jsonp',
          url: backOrder,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form
        })
        .then(res => {
          if (res.body.status) {
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: '订单撤销成功！',
              time: '1000'
            })
          }
          setTimeout(() => {
            this.$router.replace('/order/-100/' + this.form.userId + '/' + this.$route.params.tag)
          }, 1000)
        })
      },
      changeStatus (num) {
        console.log(num)
        switch (num) {
          case 0:
            return {
              icon: 'icon-tishi',
              status: '待报价',
              text: '报价结果将在<span style="color:#FFA500;padding:0 5px;">1</span>个工作日之内反馈'
            }
          case -1:
            return {
              icon: 'icon-faild',
              status: '已撤单',
              text: '您已主动撤销订单，给您带来不便敬请谅解'
            }
          case 1:
            return {
              icon: 'icon-time',
              status: '核保中',
              text: '您的保单已提交申请，请耐心等待审核通过！'
            }
          case 2:
            return {
              icon: 'icon-faild',
              status: '核保失败',
              text: '您的保单信息未通过审核，请核对信息后重试'
            }
          case 3:
            return {
              icon: 'icon-pay',
              status: '待付款',
              text: '订单报价成功，请尽快付款'
            }
          case 4:
            return {
              icon: 'icon-time',
              status: '待承保',
              text: '付款成功，请耐心等待保险出单！'
            }
          case 5:
            return {
              icon: 'icon-success',
              status: '已承保',
              text: '车险投保成功！'
            }
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
          params: this.form
        })
        .then(res => {
          console.log(res)
          this.order = res.body.data.order
          this.order.createTime = dateFormat(this.order.createTime)
          this.$localStorage.set('orderDetail', JSON.stringify(this.order))
          for (const i in this.order) {
            if (i === 'insurance') {
              this.order[i].forEach(el => {
                if (el.type === '0') {
                  this.hasForce = true
                } else {
                  this.hasInsurance = true
                }
              })
            }
          }
        })
      }
    }
  }
</script>
<style scoped>
.num{font-size:1.6rem;}
.tip{font-size:1.4rem;color:#333;}
.tip .iconfont{font-size:2.2rem;margin-right:0;vertical-align: middle;color:#FFA500;}
.vux-label-desc img{margin-right:0.5rem;}
.vux-label-desc .row{border-top:1px solid #ECECEC;}
.vux-label-desc .row .col{padding:1rem 0;position:relative;}
.vux-label-desc .row .col:first-child:after{content:"";display:inline-block;width:1px;height:1.4rem;background:#ECECEC;position:absolute;right:0;top:50%;transform:translateY(-50%);}
.vux-label-desc a{font-size:1.2rem;color:#2b2b2b;}
.vux-label-desc a span{display:inline-block;}
</style>
<style>
.noline:before{display:none;}
.noline{padding-top:0 !important;padding-bottom:0 !important;}
.orderDetail .weui-cells .weui-cell:first-child .vux-label{color:#2b2b2b;}
</style>

