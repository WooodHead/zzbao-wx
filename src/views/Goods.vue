<template>
  <div class="page gray has-btn">
    <div class="content h auto">
      <div class="banner">
        <img ref="banner" class="w" v-lazy="{src: goods.infoPic, error: 'static/img/err2.png', loading: 'static/img/loading3.gif'}">
      </div>
      <group class="info" gutter="0px">
        <h2>{{goods.name}}</h2>
        <p class="c-red"><span class="num">{{goods.score}}</span>积分</p>
      </group>
      <group gutter="10px">
        <div class="detail">
          <h3 class="title">详细说明：</h3>
          <!-- <h4 class="sub-title">商品详情</h4>
          <p class="text">{{goods.content}}</p> -->
          <!-- <h4 class="sub-title">商品详情</h4> -->
          <div class="text" v-html="goods.spec"></div>
        </div>
      </group>
    </div>
    <div class="row w btn-area white">
      <div class="col v-m">
        <x-button type="warn" @click.native="handleOrder">立即兑换</x-button>
      </div>
    </div>
    <x-dialog v-model="order" class="dialog-exchange">
      <div class="form-wrap">
        <h2>请填写收货地址</h2>
        <group gutter="10px" class="bor">
          <x-input is-type="china-name" ref="name" label-width="5rem" style="text-align:right" placeholder="请输入姓名" required v-model="form.consignee">
            <span slot="label" class="label">收货人</span>
          </x-input>
        </group>
        <group gutter="10px" class="bor">
          <x-input type="tel" is-type="china-mobile" label-width="5rem" ref="tel" style="text-align:right" placeholder="请输入手机号码" required v-model="form.phone">
            <span slot="label" class="label">手机号码</span>
          </x-input>
        </group>
        <city title="地址" class="bor address exchange" style="margin-top:10px;"></city>
        <group gutter="10px" class="bor">
          <x-input type="text" label-width="5rem" ref="place" style="text-align:right" placeholder="请输入街道等详细信息" required v-model="form.address">
            <span slot="label" class="label">详细地址</span>
          </x-input>
        </group>
        <group gutter="10px" class="bor">
          <x-input type="text" label-width="5rem" ref="place" style="text-align:right" placeholder="请输入备注！" required v-model="form.note">
            <span slot="label" class="label">备注</span>
          </x-input>
        </group>
        <ul class="row w do">
          <li class="col v-m col-12" style="padding-left:0;">
            <x-button @click.native="order = false">取消</x-button>
          </li>
          <li class="col v-m col-12" style="padding-right:0;">
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
          <x-button type="warn" @click.native="handleJump('/exchange/' + form.userId)" :show-loading="loading">确定</x-button>
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
    head: {
      title: {
        inner: '商品详情',
        separator: ' '
      }
    },
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
          address: '',
          note: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        area: 'getInsuranceArea'
      })
    },
    mounted () {
      this.resize(this.goods.infoPic)
    },
    created () {
      this.id = this.$route.params.id
      // 获取商品详情
      this.goods = JSON.parse(this.$localStorage.get('goods'))
    },
    methods: {
      resize (url) {
        console.log(url)
        const img = new Image()
        let bili = 1
        img.src = url
        img.onload = () => {
          console.log(img.width, img.height)
          bili = img.width / img.height
          console.log(bili)
          if (bili < 2) {
            this.$refs.banner.style.width = '100%'
            this.$refs.banner.style.height = 'auto'
          } else {
            this.$refs.banner.style.width = 'auto'
            this.$refs.banner.style.height = '100%'
          }
          // this.$refs.banner.style.height = 100 + 'px'
        }
      },
      handleJump (url) {
        this.tips = false
        this.$router.push(url)
      },
      handleOrder () {
        if (this.$localStorage.get('logined') === 'false') {
          this.$router.replace('/login')
        } else {
          this.order = true
        }
      },
      handleSubmit () {
        const reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/
        this.form.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
        this.form.productId = this.$route.params.id
        if (!this.$refs.name.valid || !this.form.consignee || !reg.test(this.form.consignee)) {
          this.$vux.toast.show({
            type: 'text',
            width: '15em',
            position: 'bottom',
            text: '请填写正确的收货人姓名！',
            time: '1000'
          })
        } else if (!this.$refs.tel.valid || !this.form.phone) {
          this.$vux.toast.show({
            type: 'text',
            width: '15em',
            position: 'bottom',
            text: '请填写正确的手机号码！',
            time: '1000'
          })
        } else if (!this.area || !this.form.address) {
          this.$vux.toast.show({
            type: 'text',
            width: '15em',
            position: 'bottom',
            text: '请填写收货地址！',
            time: '1000'
          })
        } else {
          this.form.address = this.area + ',' + this.form.address
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
  .text{font-size:1rem;color:#666;line-height:1.8;}
  .text img{width:100%;height:auto;visibility: visible;}
  /*.label{display:inline-block;width:5rem;padding-right:0.5rem;text-align:left;font-size:1rem;color:#666;}*/
  .do .col{padding:1rem 0.5rem;}
  .form-wrap h2{font-size:1rem;color:#666;}
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
.text img{width:100%;height:auto !important;}
.exchange .vux-label{font-size:1rem;color:#444;}
.dialog-exchange .label{color:#444;}
.exchange .weui-cell__ft{font-size:1rem;}
.dialog-exchange .weui-input{font-size:1rem;}
.dialog-exchange .weui-input::-webkit-input-placeholder{font-size:1rem;}
.dialog-exchange .weui-btn{font-size:1rem !important;height:3rem;}
.banner{position:relative;}
.banner img{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);}
</style>
