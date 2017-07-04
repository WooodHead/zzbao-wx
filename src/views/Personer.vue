<template>
  <div class="page gray fix-blur">
    <blur :blur-amount=20 :url="selectBlur()" class="head-bar">
      <ul class="row w h" style="position:relative;z-index:1;">
        <li class="col v-b col-18">
          <img v-lazy="userInfo.userSex > 1 ? 'static/img/female.png' : 'static/img/male.png'" alt="" class="circle v-m" v-if="userInfo">
          <img v-lazy="'static/img/face.png'" alt="" class="circle v-m" v-if="!userInfo">
          <span style="display:inline-block;width:5em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" class="v-m" v-if="userInfo">{{userInfo.userName}}</span>
          <router-link to="/login" v-if="!userInfo">登录/注册</router-link>
        </li>
        <li class="col v-t t-r col-6">
          <p>
            <router-link to="/setting" class="iconfont icon-shezhi v-m"></router-link>
            <router-link to="/message" class="iconfont icon-xiaoxi v-m" style="margin-left:0.5rem;"></router-link>
          </p>
        </li>
      </ul>
    </blur>
    <div class="p-1 white sub-line fix-info">
      <div class="row w default">
        <router-link :to="'/detail/' + userId" class="col v-m col-12 t-c">
          <h2 class="num">{{cumulative}}分</h2>
          <p class="text">累计积分收入</p>
        </router-link>
        <router-link :to="'/balanceDetail/' + userId" class="col v-m col-12 t-c">
          <h2 class="num">{{balance}}分</h2>
          <p class="text">积分余额</p>
        </router-link>
      </div>
    </div>
    <div class="h auto view" style="padding-top:3rem;">
      <group class="mt-5 mb-5" title="订单管理">
        <div class="row w order">
          <router-link :to="'/order/3/' + userId" class="col v-m col-8">
            <span class="iconfont icon-money red"></span>
            <b>待付款</b>
            <i v-if="false" class="num">2</i>
          </router-link>
          <router-link :to="'/order/4/' + userId" class="col v-m col-8">
            <span class="iconfont icon-finish yellow"></span>
            <b>已承保</b>
          </router-link>
          <router-link :to="'/order/-1/' + userId" class="col v-m col-8">
            <span class="iconfont icon-order blue"></span>
            <b>我的订单</b>
          </router-link>
        </div>
      </group>
      <group title="其他管理">
        <cell is-link :link="'/wallet/' + userId">
          <span class="iconfont icon-wallet c-yellow" slot="icon"></span>
          <span slot="title">我的钱包</span>
        </cell>
        <cell is-link :link="'/exchange/' + userId">
          <span class="iconfont icon-exchange c-blue" slot="icon"></span>
          <span slot="title">兑换记录</span>
        </cell>
      </group>
      <group gutter="10px" style="margin-bottom:10px;" v-if="userInfo">
        <x-button @click.native="logout = true" plain type='primary' style="border-left:none;border-right:none;border-radius:0;border-color:#ECECEC;color:#EB3D00;">注销/登录</x-button>
      </group>
    </div>
    <confirm v-model="logout" @on-confirm="handleLogout">
      <p class="confirm-text">确定要切换登录吗？</p>
    </confirm>
  </div>
</template>
<script>
  import {Blur, XImg, Group, Cell, XButton, Confirm} from 'vux'
  import ScoreItem from '@/components/ScoreItem'
  import {mapGetters, mapMutations} from 'vuex'
  import {wallet} from '../config'
  export default {
    name: 'personer',
    head: {
      title: {
        inner: '个人中心'
      }
    },
    data () {
      return {
        logout: false,
        balance: 0,
        cumulative: 0,
        withdraw: 0,
        userId: 'null',
        id: ''
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo',
        checkAuthor: 'checkAuthor'
      })
    },
    created () {
      if (this.$localStorage.get('logined') === 'true') {
        this.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
        this.$http({
          method: 'jsonp',
          url: wallet,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: {
            userId: this.userId
          }
        })
        .then(res => {
          if (res.body.status) {
            this.balance = res.body.data.wallet.balance
            this.cumulative = res.body.data.wallet.cumulative
            this.withdraw = res.body.data.wallet.withdraw
            this.$localStorage.set('balance', this.balance)
          } else {
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: '登录过期，请重新登录！',
              time: '1000'
            })
          }
        })
      }
    },
    components: {
      Blur,
      XImg,
      ScoreItem,
      Group,
      Cell,
      XButton,
      Confirm
    },
    methods: {
      checkAuthor () {
        if (this.userId === 'null') {
          console.log('jj')
        }
      },
      selectBlur () {
        if (!this.userInfo) {
          return 'static/img/blur.jpg'
        } else {
          if (this.userInfo.userSex > 1) {
            return 'static/img/blur2.jpg'
          } else {
            return 'static/img/blur1.jpg'
          }
        }
      },
      handleLogout () {
        this.$vux.toast.show({
          type: 'text',
          width: '20em',
          text: '成功退出，即将跳到登录页！',
          time: '1000'
        })
        this.postLogout(this)
      },
      ...mapMutations({
        postLogout: 'postLogout'
      })
    }
  }
</script>
<style>
.vux-bg-blur{z-index:0 !important;}
.iconfont{font-size:1.6rem;padding:0 1rem;}
.weui-dialog__btn_primary{color:#EB3D00 !important;}
.fix-blur{padding-top:200px;}
.fix-blur .head-bar{margin-top:-200px;}
.head-bar a{font-size:1.2rem;color:#fff;padding:0;}
.default .num{color:#eb3d00;font-size:1.6rem;}
.default .text{color:#3a3a3a;font-size:1.1rem;}
.default a:first-child:after{content:"";display:inline-block;width:1px;height:40px;background:#E0E0E0;position:absolute;right:0;top:50%;transform:translateY(-50%)}
.fix-info{position:fixed;top:150px;left:50%;width:90%;transform:translateX(-50%);border-radius:2rem;z-index:100;box-shadow:0 5px 20px #ccc;padding:0.8rem;}
</style>
<style scoped>
.red{background:#FF4C42;}
.yellow{background:#FFA500;}
.blue{background:#52C5FE;}
</style>

