<template>
  <div class="page gray has-footer">
    <div class="content">
      <div class="cover w">
        <img style="height:25vh" class="w" v-lazy="{src: company.bigPic, error: 'static/img/err1.png', loading: 'static/img/loading3.gif'}" alt=""/>
      </div>
      <selectCity title="投保城市" value="请选择投保城市"></selectCity>
      <group gutter="0">
        <x-input title="车牌号码" placeholder="请填写车牌号" placeholder-align="right" text-align="right" v-model="orderUser.license" required ref="license"></x-input>
      </group>
      <group gutter="0">
        <x-input title="车主姓名" placeholder="请填写车主姓名" placeholder-align="right" text-align="right" v-model="orderUser.name" required ref="name" :min="2"></x-input>
      </group>
      <group gutter="0">
        <x-input title="手机号" type="tel" is-type="china-mobile" placeholder="请填写真实手机号" placeholder-align="right" text-align="right" v-model="orderUser.tel" required ref="tel" :min="11" :max="11"></x-input>
      </group>
    </div>
    <div class="footer row w">
      <div class="col v-m t-c">
        <x-button type="warn" @click.native="handleSubmit" :show-loading="loading">下一步</x-button>
        <div class="checkbox mt-10">
          <input type="checkbox" v-model="agree" name="n" id="n1">
          <span class="iconfont icon-right1"></span>
          <label for="n1">我已阅读并同意</label><a href="javascript:;" @click="toggleTips(false)">《条款与免责申明》</a>
        </div>
      </div>
    </div>
    <popup v-model="tips" height="100%">
      <div class="pop-tip has-btn" style="padding-top:3rem;">
        <h1 style="height:3rem;margin-top:-3rem;">条款与免责声明</h1>
        <div class="h auto" style="padding-bottom:1rem;">
          <p>由于保险电商的普及程度不高，所以对很多人来说在线购买保险是非常陌生的一件事，另外由于保险产品是虚拟化的一个物品，如果没有代理人，将很难确立信任。基于此，很多人对保险电商持着一种观望的态度，那么网上买保险靠谱吗？网上买保险要注意什么？对于大型的保险平台而言，都是经过保监会批准搭建的，因此就平台来说是非常可靠的，推荐的平台有淘宝保险、网易保险和中民保险网，其中淘宝保险的购买流程比较符合用户到额习惯，但是淘宝保险和网易保险的售后服务较弱，理赔困难，中民保险网在线销售1300余款保险产品，在售后服务上提供了7×24小时服务，并且协助理赔，各方面建设都比较健全。</p>
          <p>由于保险电商的普及程度不高，所以对很多人来说在线购买保险是非常陌生的一件事，另外由于保险产品是虚拟化的一个物品，如果没有代理人，将很难确立信任。基于此，很多人对保险电商持着一种观望的态度，那么网上买保险靠谱吗？网上买保险要注意什么？对于大型的保险平台而言，都是经过保监会批准搭建的，因此就平台来说是非常可靠的，推荐的平台有淘宝保险、网易保险和中民保险网，其中淘宝保险的购买流程比较符合用户到额习惯，但是淘宝保险和网易保险的售后服务较弱，理赔困难，中民保险网在线销售1300余款保险产品，在售后服务上提供了7×24小时服务，并且协助理赔，各方面建设都比较健全。</p>
          <p>由于保险电商的普及程度不高，所以对很多人来说在线购买保险是非常陌生的一件事，另外由于保险产品是虚拟化的一个物品，如果没有代理人，将很难确立信任。基于此，很多人对保险电商持着一种观望的态度，那么网上买保险靠谱吗？网上买保险要注意什么？对于大型的保险平台而言，都是经过保监会批准搭建的，因此就平台来说是非常可靠的，推荐的平台有淘宝保险、网易保险和中民保险网，其中淘宝保险的购买流程比较符合用户到额习惯，但是淘宝保险和网易保险的售后服务较弱，理赔困难，中民保险网在线销售1300余款保险产品，在售后服务上提供了7×24小时服务，并且协助理赔，各方面建设都比较健全。</p>
        </div>
        <div class="btn-area row w">
          <div class="col v-m">
            <x-button @click.native="toggleTips(false)">取消</x-button>
          </div>
          <div class="col v-m">
            <x-button type="warn" @click.native="toggleTips(true)">同意</x-button>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Group, XAddress, Cell, XButton, XImg, XInput, Popup} from 'vux'
  import selectCity from '@/components/SelectCity'
  import {insuranceInfo} from '../config'
  export default {
    name: 'offerDetail',
    head: {
      title: {
        inner: '填写投保信息',
        separator: ' '
      }
    },
    data () {
      return {
        tips: false,
        loading: false,
        company: {},
        agree: false,
        customerId: '',
        orderUser: {
          license: '',
          name: '',
          tel: ''
        }
      }
    },
    components: {
      Group,
      XAddress,
      Cell,
      XButton,
      XImg,
      selectCity,
      XInput,
      Popup
    },
    created () {
      this.customerId = this.$route.query.customerId || ' '
      // 获取保险公司信息
      // this.company = JSON.parse(this.$localStorage.get('orderCompany'))
      this.getInfo()
      if (this.$route.params.userId === 'null') {
        this.$router.replace('/login')
      }
      // if (this.$localStorage.get('logined') !== 'true') {
      //   this.$vux.toast.show({
      //     type: 'text',
      //     width: '20em',
      //     position: 'bottom',
      //     text: '您尚未登录，请前往登录！',
      //     time: '1000'
      //   })
      //   this.$router.push('/login')
      // }
    },
    computed: {
      ...mapGetters({
        offer: 'getOffer',
        InsuranceArea: 'getInsuranceArea',
        checkAuthor: 'checkAuthor'
      })
    },
    methods: {
      toggleTips (agree) {
        this.tips = !this.tips
        if (agree) {
          this.agree = true
        }
      },
      getInfo () {
        this.$http({
          method: 'jsonp',
          url: insuranceInfo,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: {
            companyId: this.$route.params.id
          }
        })
        .then(res => {
          this.company = res.body.data.company
          this.$localStorage.set('orderCompany', JSON.stringify({
            companyId: this.company.id,
            banner: this.company.bigPic,
            companyName: this.company.name
          })) // 存储订单公司信息
        })
      },
      handleSubmit () {
        const reg = /^[\u4e00-\u9fa5]*$/
        console.log(reg.test(this.orderUser.name))
        this.loading = true
        if (this.$route.params.userId === 'null') {
          this.$vux.toast.show({
            type: 'text',
            width: '10em',
            position: 'bottom',
            text: '请登录！',
            time: '1000'
          })
        } else if (!this.InsuranceArea) {
          this.$vux.toast.show({
            type: 'text',
            width: '15em',
            position: 'bottom',
            text: '请填写所在地区！',
            time: '1000'
          })
        } else if (!this.$refs.license.valid) {
          this.$vux.toast.show({
            type: 'text',
            width: '18em',
            position: 'bottom',
            text: '填写车牌号有误！',
            time: '1000'
          })
        } else if (!reg.test(this.orderUser.name)) {
          this.$vux.toast.show({
            type: 'text',
            width: '18em',
            position: 'bottom',
            text: '姓名必须为中文！',
            time: '1000'
          })
        } else if (!this.$refs.name.valid) {
          this.$vux.toast.show({
            type: 'text',
            width: '18em',
            position: 'bottom',
            text: '姓名格式不正确！',
            time: '1000'
          })
        } else if (!this.$refs.tel.valid) {
          this.$vux.toast.show({
            type: 'text',
            width: '18em',
            position: 'bottom',
            text: '手机号码填写有误！',
            time: '1000'
          })
        } else if (!this.agree) {
          this.$vux.toast.show({
            type: 'text',
            width: '18em',
            position: 'bottom',
            text: '请阅读并同意免责申请！',
            time: '1000'
          })
        } else {
          // 存储用户订单信息到localstorage
          this.$localStorage.set('orderUser', JSON.stringify({
            insuranceArea: this.InsuranceArea,
            ownerName: this.orderUser.name,
            ownerLicense: this.orderUser.license,
            ownerTel: this.orderUser.tel,
            customerId: this.customerId
          }))
          this.$router.push('/offer/photograph/' + this.$route.params.id + '/' + this.$route.params.userId)
        }
        this.loading = false
      }
    }
  }
</script>
<style>
.pop-tip{height:100%;background:#fff;overflow:hidden;}
.pop-tip.has-btn{padding-bottom:5rem;}
.pop-tip h1{text-align:center;font-size:1.2rem;color:#333;border-bottom:1px solid #eee;padding:0.7rem 1rem;}
.pop-tip p{font-size:1rem;color:#666;line-height:1.8;padding:0 1rem;text-indent:2em;margin-top:1rem;}
</style>
