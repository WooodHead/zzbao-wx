<template>
  <div class="customer gray">
    <header class="row w cus-head">
      <span class="col v-m t-c iconfont icon-back"></span>
      <h2 class="col v-m t-c cus-tit">添加客户</h2>
      <span class="col v-m t-c cus-edit" @click="submit">完成</span>
    </header>
      <group gutter="0">
        <x-input title="姓名" placeholder="请输入真实姓名" placeholder-align="right" text-align="right" v-model="form.customer.name" required ref="name">
          <span class="iconfont icon-tongxunlu" slot="right" style="font-size:1.6rem;vertical-align:middle;color:#76CD62;"></span>
        </x-input>
        <x-input title="电话" placeholder="请输入真实手机号" placeholder-align="right" text-align="right" v-model="form.customer.phone" required ref="phone">
        </x-input>
      </group>
      <group gutter="10px">
        <selectCity title="城市" :value="form.customer.areaFullName"></selectCity>
        <x-input title="车牌号" placeholder="请输入车牌号" placeholder-align="right" text-align="right" v-model="form.customer.carNo" required ref="carNo"></x-input>
        <x-input title="车辆识别代号" placeholder="请输入车辆识别代号" placeholder-align="right" text-align="right" v-model="form.customer.vin" required ref="vin"></x-input>
        <x-input title="发动机号" placeholder="请输入发动机号" placeholder-align="right" text-align="right" v-model="form.customer.engine" required ref="engine"></x-input>
        <datetime title="注册登记日期" confirm-text="确认" cancel-text="取消" v-model="form.customer.registTime" required ref="regist"></datetime>
        <datetime title="保险到期日期" confirm-text="确认" cancel-text="取消" v-model="form.customer.expireTime" required ref="expire"></datetime>
        <x-textarea title="备注" text-align="right" v-model="form.customer.note"></x-textarea>
      </group>
  </div>
</template>
<script>
  import { Group, Cell, XInput, XButton, XTextarea, Datetime } from 'vux'
  import selectCity from '@/components/SelectCity'
  import {mapGetters} from 'vuex'
  export default {
    name: 'customerAdd',
    components: {
      Group,
      Cell,
      XInput,
      XButton,
      XTextarea,
      selectCity,
      Datetime
    },
    data () {
      return {
        form: {
          userId: '',
          customer: {
            name: '',
            phone: '',
            areaFullName: '',
            carNo: '',
            vin: '',
            engine: '',
            registTime: '',
            expireTime: '',
            note: '',
            driverCard: '',
            idCard: '',
            areaId: '',
            subDriverCard: ''
          }
        }
      }
    },
    created () {
      this.form.userId = this.$route.params.userId
    },
    computed: {
      ...mapGetters({
        areaId: 'getInsuranceArea'
      })
    },
    methods: {
      submit () {
        if (!this.$refs.name.valid || !this.$refs.phone.valid || !this.$refs.carNo.valid || !this.$refs.vin.valid || !this.$refs.engine.valid || !this.$refs.regist.valid || !this.$refs.expire.valid) {
          this.$vux.toast.show({
            type: 'text',
            width: '15em',
            position: 'bottom',
            text: '请完整填写以上信息！',
            time: '3000'
          })
        } else {
          this.form.customer.areaId = this.areaId
          this.form.customer = JSON.stringify(this.form.customer)
          // console.log(this.form.customer)
          this.$http({
            method: 'jsonp',
            url: 'http://liuwbox.com/zzbao/app/customer/submit.htm',
            jsonp: 'callback',
            params: this.form,
            jsonpCallback: 'json'
          })
          .then(res => {
            console.log(res)
            if (res.body.status) {
              this.$vux.toast.show({
                type: 'text',
                width: '15em',
                position: 'bottom',
                text: '客户添加成功！',
                time: '3000'
              })
            }
          })
        }
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

