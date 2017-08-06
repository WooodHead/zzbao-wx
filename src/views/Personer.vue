<template>
  <div class="page gray fix-blur">
    <!--<blur :blur-amount=0 :url="selectBlur()" class="head-bar">
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
    </blur>-->
    <div class="head-bar" style="background:#FFA500;height:200px;">
      <ul class="row w h" style="position:relative;z-index:1;">
        <li class="col v-b col-18">
          <!-- <img v-lazy="userInfo.userSex > 1 ? 'static/img/female.png' : 'static/img/male.png'" alt="" class="circle v-m" v-if="userInfo"> -->
          <img v-lazy="'static/img/default-face.png'" alt="" class="circle v-m" v-if="userInfo">
          <img v-lazy="'static/img/face.png'" alt="" class="circle v-m" v-if="!userInfo">
          <span style="display:inline-block;width:5em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" class="v-m" v-if="userInfo">{{userInfo.userName}}</span>
          <a :href="loginUrl" v-if="!userInfo">登录/注册</a>
        </li>
        <li class="col v-t t-r col-6">
          <p>
            <router-link to="/setting" class="v-m"><img style="width:1.7rem;" src="static/img/setting.png" alt=""></router-link>
            <router-link to="/message" class="v-m" style="margin-left:0.5rem;position:relative;"><img style="width:1.7rem;" src="static/img/message.png" alt=""><img v-if="message.length" src="static/img/dot.png" style="width:0.6rem;position:absolute;left:1.3rem;top:-0.4rem;" alt=""></router-link>
          </p>
        </li>
      </ul>
    </div>
    <div class="p-1 white sub-line fix-info">
      <div class="row w default">
        <router-link :to="'/detail/' + userId" class="col v-m col-12 t-c">
          <h2 class="num">{{cumulative}}<span style="font-size:1.2rem;margin-left:0.2rem;">分</span></h2>
          <p class="text">累计积分收入</p>
        </router-link>
        <router-link :to="'/balanceDetail/' + userId" class="col v-m col-12 t-c">
          <h2 class="num">{{balance}}<span style="font-size:1.2rem;margin-left:0.2rem;">分</span></h2>
          <p class="text">账户积分余额</p>
        </router-link>
      </div>
    </div>
    <div class="h auto view" style="padding-top:3rem;">
      <group class="mt-5 mb-5" title="订单管理">
        <div class="row w order">
          <router-link :to="'/order/3/' + userId + '/web'" class="col v-m col-8">
            <span class="iconfont icon-money red"></span>
            <b>待支付</b>
            <i v-if="false" class="num">2</i>
          </router-link>
          <router-link :to="'/order/5/' + userId + '/web'" class="col v-m col-8">
            <span class="iconfont icon-finish yellow"></span>
            <b>已承保</b>
          </router-link>
          <router-link :to="'/order/-100/' + userId + '/web'" class="col v-m col-8">
            <span class="iconfont icon-order blue"></span>
            <b>我的订单</b>
          </router-link>
        </div>
      </group>
      <group title="其他管理">
        <cell is-link :link="'/wallet/' + userId">
          <span class="iconfont icon-wallet c-yellow" slot="icon"></span>
          <span slot="title" style="font-size:1rem;color:#2b2b2b;">我的钱包</span>
        </cell>
        <cell is-link :link="'/exchange/' + userId">
          <span class="iconfont icon-exchange c-blue" slot="icon"></span>
          <span slot="title" style="font-size:1rem;color:#2b2b2b;">兑换记录</span>
        </cell>
      </group>
      <group gutter="10px" style="margin-bottom:10px;" v-if="userInfo">
        <x-button @click.native="logout = true" plain type='primary' style="border-left:none;border-right:none;border-radius:0;border-color:#ECECEC;color:#FFA500;">注销/登录</x-button>
      </group>
    </div>
    <confirm class="logout" v-model="logout" @on-confirm="handleLogout">
      <p class="confirm-text" style="padding:1.5rem 0;">确定要切换登录吗？</p>
    </confirm>
  </div>
</template>
<script>
  import {Blur, XImg, Group, Cell, XButton, Confirm} from 'vux'
  import ScoreItem from '@/components/ScoreItem'
  import {mapGetters, mapMutations} from 'vuex'
  import {wallet, message, loginUrl} from '../config'
  export default {
    name: 'personer',
    head: {
      title: {
        inner: '个人中心',
        separator: ' '
      }
    },
    data () {
      return {
        message: [],
        logout: false,
        balance: 0,
        cumulative: 0,
        withdraw: 0,
        userId: 'null',
        loginUrl: loginUrl,
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
          console.log(res)
          this.$http({
            method: 'jsonp',
            url: message,
            jsonp: 'callback',
            jsonpCallback: 'json',
            params: {
              userId: JSON.parse(this.$localStorage.get('userInfo')).userId,
              limit: 10,
              pageIndex: 0
            }
          })
          .then(res => {
            res.body.data.messageList.forEach(el => {
              if (!el.status) {
                this.message.push(el)
              }
            })
          })
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
.weui-dialog__btn_primary{color:#FFA500 !important;}
.fix-blur{padding-top:200px;}
.fix-blur .head-bar{margin-top:-200px;}
.head-bar a{font-size:1.2rem;color:#fff;padding:0;}
.default .num{color:#FFA500;font-size:1.4rem;}
.default .text{color:#3a3a3a;font-size:1rem;}
.default a:first-child:after{content:"";display:inline-block;width:1px;height:40px;background:#E0E0E0;position:absolute;right:0;top:50%;transform:translateY(-50%)}
.fix-info{position:fixed;top:160px;left:50%;width:90%;transform:translateX(-50%);border-radius:1rem;z-index:100;box-shadow:0 5px 20px #ccc;padding:0.5rem 0.8rem;}
.logout .weui-dialog__btn_primary{background:#FFA500;color:#fff !important;border-radius:0.5rem;margin:0 2rem 2rem 1rem;height:3rem;line-height:3rem;font-size:1.2rem;}
.logout .weui-dialog__btn_default{background:#fff;color:#989898 !important;border-radius:0.5rem;margin:0 1rem 2rem 2rem;height:3rem;line-height:3rem;font-size:1.2rem;border:1px solid #989898;}
.logout .weui-dialog__ft:after{display:none;}
</style>
<style scoped>
.red{background:#FF4C42;}
.yellow{background:#FFA500;}
.blue{background:#52C5FE;}
</style>

