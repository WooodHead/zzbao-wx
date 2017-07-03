<template>
  <div class="page gray has-btn">
    <div class="content h auto">
      <img style="height:30vh" class="w" v-lazy="{src: goods.infoPic, error: 'static/img/err2.png', loading: 'static/img/loading1.gif'}">
      <group class="info" gutter="0px">
        <h2>{{goods.name}}</h2>
        <p class="c-red"><span class="num">{{goods.score}}</span>积分</p>
      </group>
      <group gutter="10px">
        <div class="detail">
          <h3 class="title">详细说明：</h3>
          <h4 class="sub-title">商品详情</h4>
          <p class="text">{{goods.content}}</p>
          <h4 class="sub-title">商品详情</h4>
          <div class="text" v-html="goods.spec"></div>
        </div>
      </group>
    </div>
    <div class="row w btn-area white">
      <div class="col v-m">
        <x-button type="warn" @click.native="handleOrder">立即兑换</x-button>
      </div>
    </div>
    <x-dialog v-model="order" class="dialog-demo">
      <div class="form-wrap">
        <h2>请填写收货地址</h2>
        <group gutter="10px" class="bor">
          <x-input type="tel" label-width="5rem" style="text-align:right" placeholder="请输入姓名" required v-model="form.consignee">
            <span slot="label" class="label">收货人</span>
          </x-input>
        </group>
        <group gutter="10px" class="bor">
          <x-input type="tel" label-width="5rem" style="text-align:right" placeholder="请输入手机号码" required v-model="form.phone">
            <span slot="label" class="label">手机号码</span>
          </x-input>
        </group>
        <group gutter="10px">
          <city title="地址" class="bor address"></city>
        </group>
        <group gutter="10px" class="bor">
          <x-input type="tel" label-width="5rem" style="text-align:right" placeholder="请输入街道等详细信息" required v-model="form.address">
            <span slot="label" class="label">详细地址</span>
          </x-input>
        </group>
        <ul class="row w do">
          <li class="col v-m col-12">
            <x-button @click.native="order = false">取消</x-button>
          </li>
          <li class="col v-m col-12">
            <x-button type="warn" @click.native="handleSubmit">确认兑换</x-button>
          </li>
        </ul>
      </div>
    </x-dialog>
    <x-dialog v-model="tips" class="dialog-tip">
      <div class="form-wrap">
        <ul class="row w msg">
          <li class="col v-m col-6 t-c">
            <icon type="success"></icon>
          </li>
          <li class="col v-m col-18 t-l">
            <h2>兑换成功</h2>
            <p>您可以在兑换记录中查看如有疑问，请联系平台客服。</p>
          </li>
        </ul>
        <group>
          <x-button type="warn" @click.native="handleJump('/exchange')" :show-loading="loading">确定</x-button>
        </group>
      </div>
    </x-dialog>
    <toast v-model="toast" :time="1000">发送成功</toast>
  </div>
</template>
<script>
  import {Group, XImg, XButton, XDialog, XInput, XAddress, ChinaAddressV3Data, Icon, Toast} from 'vux'
  import city from '@/components/SelectCity'
  import {exchange} from '../config'
  import {mapGetters} from 'vuex'
  export default {
    name: 'goods',
    components: {
      Group,
      XImg,
      XButton,
      XDialog,
      XInput,
      XAddress,
      ChinaAddressV3Data,
      Icon,
      Toast,
      city
    },
    data () {
      return {
        loading: false,
        id: 0,
        order: false,
        tips: false,
        address: ChinaAddressV3Data,
        toast: false,
        place: [],
        goods: {},
        form: {
          userId: '',
          productId: '',
          consignee: '',
          phone: '',
          address: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        area: 'getInsuranceArea'
      })
    },
    created () {
      this.id = this.$route.params.id
      // 获取商品详情
      this.goods = JSON.parse(this.$localStorage.get('goods'))
    },
    methods: {
      handleJump (url) {
        this.tips = false
        this.$router.push(url)
      },
      handleOrder () {
        if (this.$localStorage.get('logined') === 'false') {
          this.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '当前未登录，无法进行兑换！',
            time: '1000'
          })
        } else {
          this.order = true
        }
      },
      handleSubmit () {
        this.form.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
        this.form.productId = this.$route.params.id
        this.form.address = this.area + ',' + this.form.address
        console.log(exchange, this.form)
        this.$http({
          method: 'jsonp',
          url: exchange,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form,
          before: () => {
            this.loading = true
            this.order = false
          }
        })
        .then(res => {
          console.log(res)
          this.loading = false
          if (res.body.status) {
            this.tips = true
          } else {
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: res.body.msg,
              time: '1000'
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .form-wrap{padding:1rem;}
  .info h2{font-size:1.4rem;color:#666;padding:1rem;}
  .info p{font-size:1.2rem;padding:0 1rem 1rem 1rem;}
  .info p .num{font-size:1.8rem;margin-right:0.5rem;}
  .detail{padding:0.5rem 1rem;}
  .detail .title{padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #eee;padding-left:0;}
  .detail .title:before{display:none;}
  .sub-title{font-size:1.4rem;color:#333;}
  .text{font-size:1rem;color:#666;text-indent:2em;line-height:1.8;}
  .text img{width:100%;}
  /*.label{display:inline-block;width:5rem;padding-right:0.5rem;text-align:left;font-size:1rem;color:#666;}*/
  .do .col{padding:1rem 0.5rem;}
  .form-wrap h2{font-size:1.4rem;color:#666;}
  .msg p{color:#999;font-size:1rem;}
  .msg h2{font-size:1.4rem;color:#666;}
</style>
<style>
.bor .weui-cells{border:1px solid #EBEBEB;border-top:none;border-bottom:0;background:#F9F9F9;border-radius:0.5rem;font-size:1rem;}
.bor .weui-cell__hd{width:5rem;text-align:left;color:#666;}
.address .weui-cell__hd{width:0;}
.address .vux-cell-bd{text-align:left;}
.vux-popup-dialog{z-index:5001 !important;}
.dialog-tip .weui-icon{font-size:3rem;}
.text img{width:100%;}
</style>
