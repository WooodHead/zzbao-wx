<template>
  <div class="h" style="min-height:100%;">
    <div class="order-item mt-5" v-for="(item, index) in list" :key="index">
      <ul class="row w white status">
        <li class="col v-m time col-14">{{item.createTime}}</li>
        <li class="col v-m t-r col-10">{{changeStatus(item.orderStatus)}}</li>
      </ul>
      <router-link :to="'/orderdetail/' + userId + '/' + item.id + '/web'" class="row w good" @click.native="handleSaveData(item)">
        <span class="col v-m col-6">
          <span class="img">
            <img style="width:100%;height:100%;" v-lazy="{src: item.companyLogo}" alt="">
          </span>
        </span>
        <span class="col v-m col-18">
          <h2 class="card">车牌号：{{item.carNum}}</h2>
          <p>被保人：{{item.policyholder}}</p>
        </span>
      </router-link>
      <ul class="row w price">
        <li class="col v-m t-l">推广费：<span class="num">{{changeMaxFee(item) || '￥0.00'}}</span></li>
        <li class="col v-m t-r">合计保费：<span class="num">{{changePrice(item) || '￥0.00'}}</span></li>
      </ul>
      <ul class="row w price">
        <li class="col v-m t-r">
          <span v-if="tag !== 'web'" class="btn btn-light btn-small" @click="sendCustomer(item)">发送客户</span>
          <a class="btn btn-light btn-small" @click="showService(true)">联系客服</a>
          <router-link :to="'/pay/' + userId + '/' + item.id + '/' + tag" class="btn btn-danger btn-small" v-if="item.orderStatus === 3" @click.native="handleSaveData(item)">立即付款</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// mqqwpa://im/chat?chat_type=wpa&uin=979741120&version=1&src_type=web&web_src=oicqzone.com
  import {QQ, server} from '../config'
  import {mapMutations} from 'vuex'
  export default {
    name: 'orderItem',
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        server: server,
        userId: '',
        qq: QQ,
        tag: this.$route.params.tag
      }
    },
    created () {
      this.userId = this.$route.params.userId
    },
    methods: {
      ...mapMutations({
        showService: 'setService'
      }),
      sendCustomer (item) {
        if (this.$route.params.tag === 'ios') {
          loadURL(server + '/sendToCustomer?userId=' + this.userId + '&orderId=' + item.id)
        } else {
          jsToApp.androidShare(this.userId, item.id)
        }
      },
      changeStatus (num) {
        switch (num) {
          case -1:
            return '已撤单'
          case 0:
            return '待保险公司报价'
          case 1:
            return '核保中'
          case 2:
            return '核保失败'
          case 3:
            return '待付款'
          case 4:
            return '待承保'
          case 5:
            return '已承保'
        }
      },
      changePrice (item) {
        switch (item.orderStatus) {
          case -1:
            return '0.00'
          case 0:
            return '待报价'
          case 1:
            return '暂无保费'
          case 2:
            return '暂无保费'
          case 3:
            return '￥' + item.amount
          case 4:
            return '￥' + item.amount
          case 5:
            return '￥' + item.amount
        }
      },
      changeMaxFee (item) {
        switch (item.orderStatus) {
          case -1:
            return '待计算'
          case 0:
            return '待计算'
          case 1:
            return '待计算'
          case 2:
            return '待计算'
          case 3:
            return '待计算'
          case 4:
            return '待计算'
          case 5:
            return '￥' + item.maxFee / 10
        }
      },
      handleSaveData (item) {
        this.$router.push('/orderdetail/' + this.$route.params.userId + '/' + item.id + '/' + this.tag)
        if (this.$route.query.platform === 'app') {
          jsToApp.setTitle('订单详情')
        }
      }
    }
  }
</script>
<style scoped>
.order-item .status .col{padding:10px;color:#FFA500;font-size:1.1rem;}
.order-item .status .time{color:#2b2b2b;}
.order-item .good{background:#F6F6F6;}
.order-item .good .col{padding:10px;}
.order-item .img{display:inline-block;width:6rem;height:6rem;background:#fff;vertical-align:middle;text-align:center;border:1px solid #E5E5E5;}
.img:before{content:"";display:inline-block;vertical-align:middle;height:100%;}
.img img{vertical-align:middle;}
.order-item .card{font-size:1.2rem;margin-bottom:0.5rem;}
.order-item p{font-size:1rem;color:#858585;}
.order-item .price{background:#fff;border-bottom:1px solid #E7E7E7;}
.order-item .price .col{padding:0.6rem 1rem;}
.order-item .price .num{font-size:1.2rem;}
.good{color:#666;}
</style>
