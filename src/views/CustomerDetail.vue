<template>
  <div class="customer">
    <header class="row w cus-head">
      <span class="col v-m t-c iconfont icon-back" @click="goback"></span>
      <h2 class="col v-m t-c cus-tit">客户详情</h2>
      <span class="col v-m t-c cus-edit" @click="handleSave">{{text}}</span>
    </header>
    <section class="cus-main">
      <group gutter="0">
        <x-input :readonly="!edit" title="姓名" text-align="right" v-model="form.customer.name"  ref="name" :min="2" required></x-input>
        <x-input :readonly="!edit" title="电话" text-align="right" v-model="form.customer.phone" type="number" ref="tel" required  is-type="china-mobile"></x-input>
      </group>
      <group gutter="5px">
        <city :readonly="!edit" title="城市" :value="form.customer.areaFullName"></city>
        <x-input :readonly="!edit" title="车牌号" text-align="right" v-model="form.customer.carNo" ref="license" required></x-input>
        <x-input :readonly="!edit" title="车辆识别代号" text-align="right" v-model="form.customer.vin"></x-input>
        <x-input :readonly="!edit" title="发动机号" text-align="right" v-model="form.customer.engine"></x-input>
        <datetime :readonly="!edit" title="注册登记日期" text-align="right" v-model="form.customer.registTime" :display-format="formatValueFunction" confirm-text="确认" cancel-text="取消"></datetime>
        <datetime :readonly="!edit" title="保险到期日期" text-align="right" v-model="form.customer.expireTime" :display-format="formatValueFunction" confirm-text="确认" cancel-text="取消"></datetime>
        <x-textarea :readonly="!edit" title="备注" text-align="right" v-model="form.customer.note"></x-textarea>
      </group>
    </section>
    <footer class="cus-footer row w">
      <div class="col v-m" style="padding:0 1rem;">
        <x-button type="warn" v-if="!edit" @click.native="handleJump">立即报价</x-button>
        <x-button type="warn" v-if="edit" :show-loading="loading" @click.native="handleDel">删除</x-button>
      </div>
    </footer>
  </div>
</template>
<script>
  import { dateFormat, Group, Cell, XInput, XButton, XTextarea, Datetime } from 'vux'
  import {customer, customerEdit, customerDel, server} from '../config'
  import city from '@/components/SelectCity'
  import {mapGetters} from 'vuex'
  export default {
    name: 'customerDetail',
    components: {
      dateFormat,
      Group,
      Cell,
      XInput,
      XButton,
      city,
      XTextarea,
      Datetime
    },
    data () {
      return {
        edit: false,
        loading: false,
        server: server,
        info: {},
        data: [],
        userId: 'da738f8b730b4b62be0333cec2b9dd1b',
        form: {
          userId: this.$route.params.userId,
          customerId: this.$route.params.customerId,
          customer: {}
        },
        formatValueFunction (val) {
          return val.substring(0, 10)
        }
      }
    },
    computed: {
      ...mapGetters({
        area: 'getInsuranceArea'
      }),
      text () {
        if (this.edit) {
          return '完成'
        } else {
          return '编辑'
        }
      }
    },
    created () {
      setTimeout(() => {
        this.handleInfo()
      }, 100)
    },
    methods: {
      handleJump () {
        const customerInfo = {
          name: this.form.customer.name,
          phone: this.form.customer.phone,
          area: this.form.customer.areaFullName,
          license: this.form.customer.carNo,
          areaId: this.form.customer.areaId
        }
        console.log(customerInfo)
        if (this.$route.query.platform === 'ios') {
          loadURL(server + '/offerApp?customerId=' + this.$route.params.customerId + '&customerInfo=' + JSON.stringify(customerInfo))
        } else {
          jsToApp.intent(JSON.stringify(customerInfo))
        }
      },
      goback () {
        if (this.$route.query.platform === 'ios') {
          this.$router.replace('/backCustomerAdd?click=true')
        } else {
          jsToApp.back()
        }
      },
      handleDel () {
        this.loading = true
        this.$http({
          method: 'jsonp',
          url: customerDel,
          jsonp: 'callback',
          params: {
            userId: this.form.userId,
            customerId: this.form.customerId
          },
          jsonpCallback: 'json'
        })
        .then(res => {
          console.log(res)
          this.loading = false
          if (res.body.status) {
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: '删除成功！',
              time: '1000'
            })
            setTimeout(() => {
              if (this.$route.query.platform === 'ios') {
                loadURL(server + '/delCustomerSucess?back=true')
              } else {
                jsToApp.back()
              }
            }, 1000)
          } else {
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: '删除失败，请稍后重试！',
              time: '1000'
            })
          }
        })
      },
      handleSave () {
        const reg = /^[\u4e00-\u9fa5]*$/
        this.edit = !this.edit
        if (!this.edit) {
          if (!this.$refs.name.valid) {
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: '姓名为必填项！',
              time: '3000'
            })
            this.edit = true
          } else if (!reg.test(this.form.customer.name)) {
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: '姓名必须为中文！',
              time: '3000'
            })
            this.edit = true
          } else if (!this.$refs.tel.valid) {
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: '请填写正确的手机号码！',
              time: '3000'
            })
            this.edit = true
          } else if (!this.$refs.license.valid) {
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: '请填写车牌号！',
              time: '3000'
            })
            this.edit = true
          } else {
            this.form.customer.areaId = this.area || this.info.areaId
            // this.form.customer = JSON.stringify(this.form.customer)
            this.handleEdit()
          }
        }
      },
      handleEdit () {
        if (!this.form.areaId) {
          this.form.areaId = this.info.areaId
        }
        this.$http({
          method: 'jsonp',
          url: customerEdit,
          jsonp: 'callback',
          params: {
            userId: this.form.userId,
            customerId: this.form.customerId,
            customer: JSON.stringify(this.form.customer)
          },
          jsonpCallback: 'json',
          before: (req) => {
            console.log(req)
          }
        })
        .then(res => {
          console.log(res)
          if (res.body.status === 1) {
            // this.form.customer = JSON.parse(this.form.customer)
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: '用户资料修改成功！',
              time: '1000'
            })
            setTimeout(() => {
              if (this.$route.query.platform === 'ios') {
                loadURL(server + '/editCustomerSucess?back=true')
              } else {
                jsToApp.back()
              }
            }, 1000)
          } else {
            this.edit = true
            this.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: '系统错误，请稍后重试！',
              time: '1000'
            })
          }
        })
      },
      handleInfo () {
        this.$http({
          method: 'jsonp',
          url: customer,
          jsonp: 'callback',
          params: this.form,
          jsonpCallback: 'json'
        })
        .then(res => {
          console.log(res)
          this.form.customer = res.body.data.customer
          this.form.customer.registTime = dateFormat(this.form.customer.registTime)
          this.form.customer.expireTime = dateFormat(this.form.customer.expireTime)
          this.info = res.body.data.customer
        })
      },
      formatDate (date) {
        return dateFormat(date, 'YYYY-MM-DD')
      }
    }
  }
</script>
<style>
.vux-datetime{color:#666 !important;}
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

/*.cus-main li{border-bottom:1px solid #E9E9E9;background:#fff;}
.cus-main li p{padding:1rem;font-size:1.2rem;color:#646464;box-sizing:border-box;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}
.cus-main .t-l{width:35%;}
.cus-main li p.note{border-bottom:1px solid #DFDFDF;margin-left:1rem;padding-left:0;}
.cus-main li input,.cus-main li textarea{display:inline-block;width:100%;border:none;text-align:right;font-size:1.2rem;color:#2b2b2b;}
.cus-main li textarea{text-align:left;background:none;line-height:2;font-family:microsoft yahei;resize:none;}*/

.cus-footer a{display:inline-block;font-size:1.2rem;color:#fff;background:#FFA500;border-radius:0.4rem;width:100%;text-align:center;padding: 0.5rem 0;}
.cus-footer a:hover{opacity:0.8;filter:alpha(opacity=80);}
</style>

