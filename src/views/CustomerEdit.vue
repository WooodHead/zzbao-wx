<template>
  <div class="customer">
    <header class="row w cus-head">
      <span class="col v-m t-c iconfont icon-back"></span>
      <h2 class="col v-m t-c cus-tit">删除客户</h2>
      <span class="col v-m t-c cus-edit" @click="change">完成</span>
    </header>
    <section class="cus-main">
      <ul>
        <li class="row w">
          <p class="col v-m t-l">姓名</p>
          <p class="col v-m t-r">
            <input type="text" v-model="form.customer.name">
          </p>
        </li>
        <li class="row w">
          <p class="col v-m t-l">电话</p>
          <p class="col v-m t-r">
            <input type="text" v-model="form.customer.phone">
          </p>
        </li>
        <li class="row w">
          <selectCity title="城市" value="value" :txt="txt"></selectCity>
        </li>
        <li class="row w">
          <p class="col v-m t-l">车牌号</p>
          <p class="col v-m t-r">
            <input type="text" v-model="form.customer.carNo">
          </p>
        </li>
        <li class="row w">
          <p class="col v-m t-l">车辆识别代号</p>
          <p class="col v-m t-r">
            <input type="text" v-model="form.customer.vin">
          </p>
        </li>
        <li class="row w">
          <p class="col v-m t-l">发动机号</p>
          <p class="col v-m t-r">
            <input type="text" v-model="form.customer.engine">
          </p>
        </li>
        <li class="row w">
          <p class="col v-m t-l">注册登记日期</p>
          <p class="col v-m t-r">
            <input type="text" v-model="registTime">
          </p>
        </li>
        <li class="row w">
          <p class="col v-m t-l">保险到期日期</p>
          <p class="col v-m t-r">
            <input type="text" v-model="expireTime">
          </p>
        </li>
        <li>
          <p class="note">备注</p>
          <p>
            <textarea type="text" v-model="form.customer.note"></textarea>
          </p>
        </li>
      </ul>
    </section>
    <footer class="cus-footer middle">
      <a href="#" @click="del">删除</a>
    </footer>
  </div>
</template>
<script>
  import selectCity from '@/components/SelectCity'
  import { dateFormat } from 'vux'
  export default {
    name: 'customerEdit',
    components: {
      dateFormat,
      selectCity
    },
    computed: {
      registTime () {
        return this.formatDate(this.form.customer.registTime)
      },
      expireTime () {
        return this.formatDate(this.form.customer.expireTime)
      }
    },
    data () {
      return {
        txt: '',
        form: {
          userId: '',
          customerId: '',
          customer: {
            areaFullName: '110010',
            carNo: '',
            driverCard: '',
            engine: '',
            expireTime: '',
            id: '',
            idCard: '',
            name: '',
            note: '',
            phone: '',
            registTime: '',
            subDriverCard: '',
            vin: ''
          }
        }
      }
    },
    created () {
      const This = this
      console.log(this.$route.params)
      this.form.customerId = this.$route.params.customerId
      this.form.userId = this.$route.params.userId
      setTimeout(() => {
        This.customerInfo()
      }, 200)
    },
    methods: {
      customerInfo () {
        this.$http({
          method: 'jsonp',
          url: 'http://liuwbox.com/zzbao/app/customer/detail.htm',
          jsonp: 'callback',
          params: {
            customerId: this.form.customerId
          },
          jsonpCallback: 'json'
        })
        .then(res => {
          this.form.customer = res.body.data.customer
          this.txt = res.body.data.customer.areaFullName
          console.log(this.form.customer, this.txt)
        })
      },
      change () {
        this.form.customer = JSON.stringify(this.form.customer)
        console.log(this.form)
        this.$http({
          method: 'jsonp',
          url: 'http://liuwbox.com/zzbao/app/customer/submit.htm',
          jsonp: 'callback',
          params: this.form,
          jsonpCallback: 'json'
        })
        .then(res => {
          console.log(res)
        })
      },
      del () {
        this.form.customer = JSON.stringify(this.form.customer)
        this.$http({
          method: 'jsonp',
          url: 'http://liuwbox.com/zzbao/app/customer/del.htm',
          jsonp: 'callback',
          params: {
            userId: this.form.userId,
            customerId: this.form.customerId
          },
          jsonpCallback: 'json'
        })
        .then(res => {
          console.log(res)
        })
      },
      formatDate (date) {
        return dateFormat(date, 'YYYY-MM-DD')
      }
    }
  }
</script>
<style>
@import '../assets/css/style.css';
</style>
<style scoped>
input,select:focus{outline:none;}
.middle:before{content:"";display:inline-block;width:0;height:100%;vertical-align:middle;}
.customer{height:100%;overflow:hidden;padding-top:4rem;padding-bottom:5rem;box-sizing:border-box;}
.cus-head{height:4rem;margin-top:-4rem;background:#FBFBFB;border-bottom:1px solid #DFDFDF;}
.cus-main{height:100%;overflow:auto;background:#F7F7F7;}
.cus-footer{height:5rem;background:#F7F7F7;padding:0 1rem;}

.cus-head .col:first-child,.cus-head .col:last-child{width:4rem;}
.cus-head .iconfont{font-size:1.2rem;color:#3b3b3b;}
.cus-head h2{font-size:1.2rem;color:#3b3b3b;}
.cus-head .cus-edit{font-size:1.2rem;color:#43b5e4;}

.cus-main li{border-bottom:1px solid #E9E9E9;background:#fff;}
.cus-main li p{padding:1rem;font-size:1.2rem;color:#646464;box-sizing:border-box;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}
.cus-main .t-l{width:35%;}
.cus-main li p.note{border-bottom:1px solid #DFDFDF;margin-left:1rem;padding-left:0;}
.cus-main li input,.cus-main li textarea{display:inline-block;width:100%;border:none;text-align:right;font-size:1.2rem;color:#2b2b2b;}
.cus-main li textarea{text-align:left;background:none;line-height:2;font-family:microsoft yahei;resize:none;}

.cus-footer a{display:inline-block;font-size:1.2rem;color:#fff;background:#EB3D00;border-radius:0.4rem;width:100%;text-align:center;padding: 0.5rem 0;}
.cus-footer a:hover{opacity:0.8;filter:alpha(opacity=80);}
</style>

