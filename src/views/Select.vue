<template>
  <div class="page gray has-btn">
    <span class="fix-btn" @click="toggleTips">购险说明</span>
    <div class="h auto content">
      <group title="强制保险" class="select" v-if="force">
        <Cell class="long" v-for="(item, index) in force" :key="index" v-if="index === 0">
          <div class="checkbox full" slot="icon">
            <input type="checkbox" checked name="force" :value="'缴纳'" :id="'force' + index" v-model="item.select" v-on:change="handlepull">
            <span class="iconfont icon-right1"></span>
            <label :for="'force' + index" class="hideletter">{{forceName}}</label>
          </div>
        </Cell>
      </group>
      <group title="基本险" class="select" v-if="basic">
        <Cell v-for="(item, index) in basic" :key="index">
          <div class="checkbox circle left" slot="icon">
            <input type="checkbox" name="basic" v-model="item.select" :id="'b' + index">
            <span class="iconfont icon-dot"></span>
            <label :for="'b' + index">{{item.name}}</label>
          </div>
          <div class="form select" slot="title" v-if="item.extra">
            <select v-model="item.value">
              <option v-for="(item, index) in item.extra.split(',')" v-bind:value="item.split(':')[0]" :key="index">{{item.split(':')[1]}}</option>
            </select>
          </div>
          <div class="checkbox circle right" slot="value" v-if="item.select && item.regardless !== 2">
            <input type="checkbox" checked name="basicReg" :id="'bg' + index" v-model="item.regardless">
            <span class="iconfont icon-dot"></span>
            <label :for="'bg' + index">不计免赔</label>
          </div>
        </Cell>
      </group>
      <group title="附加险" class="select" v-if="additional">
        <Cell v-for="(item, index) in additional" :key="index">
          <div class="checkbox circle left" slot="icon">
            <input type="checkbox" name="basic" v-model="item.select" :id="'a' + index">
            <span class="iconfont icon-dot"></span>
            <label :for="'a' + index">{{item.name}}</label>
          </div>
          <div class="form select" slot="title" v-if="item.extra">
            <select v-model="item.value">
              <option v-for="(item, index) in item.extra.split(',')" v-bind:value="item.split(':')[0]" :key="index">{{item.split(':')[1]}}</option>
            </select>
          </div>
          <div class="checkbox circle right" slot="value" v-if="item.select">
            <input type="checkbox" checked name="basicReg" :id="'ag' + index" v-model="item.regardless">
            <span class="iconfont icon-dot"></span>
            <label :for="'ag' + index">不计免赔</label>
          </div>
        </Cell>
      </group>
    </div>
    <div class="btn-area row w">
      <div class="col v-m">
        <x-button type="warn" @click.native="handleSubmit">提交报价</x-button>
      </div>
    </div>
    <popup v-model="tips" height="100%">
      <div class="pop-tip has-btn" style="padding-top:3rem;">
        <h1 style="height:3rem;margin-top:-3rem;">购险说明</h1>
        <div class="h auto" style="padding-bottom:1rem;">
          <p>由于保险电商的普及程度不高，所以对很多人来说在线购买保险是非常陌生的一件事，另外由于保险产品是虚拟化的一个物品，如果没有代理人，将很难确立信任。基于此，很多人对保险电商持着一种观望的态度，那么网上买保险靠谱吗？网上买保险要注意什么？对于大型的保险平台而言，都是经过保监会批准搭建的，因此就平台来说是非常可靠的，推荐的平台有淘宝保险、网易保险和中民保险网，其中淘宝保险的购买流程比较符合用户到额习惯，但是淘宝保险和网易保险的售后服务较弱，理赔困难，中民保险网在线销售1300余款保险产品，在售后服务上提供了7×24小时服务，并且协助理赔，各方面建设都比较健全。</p>
          <p>由于保险电商的普及程度不高，所以对很多人来说在线购买保险是非常陌生的一件事，另外由于保险产品是虚拟化的一个物品，如果没有代理人，将很难确立信任。基于此，很多人对保险电商持着一种观望的态度，那么网上买保险靠谱吗？网上买保险要注意什么？对于大型的保险平台而言，都是经过保监会批准搭建的，因此就平台来说是非常可靠的，推荐的平台有淘宝保险、网易保险和中民保险网，其中淘宝保险的购买流程比较符合用户到额习惯，但是淘宝保险和网易保险的售后服务较弱，理赔困难，中民保险网在线销售1300余款保险产品，在售后服务上提供了7×24小时服务，并且协助理赔，各方面建设都比较健全。</p>
          <p>由于保险电商的普及程度不高，所以对很多人来说在线购买保险是非常陌生的一件事，另外由于保险产品是虚拟化的一个物品，如果没有代理人，将很难确立信任。基于此，很多人对保险电商持着一种观望的态度，那么网上买保险靠谱吗？网上买保险要注意什么？对于大型的保险平台而言，都是经过保监会批准搭建的，因此就平台来说是非常可靠的，推荐的平台有淘宝保险、网易保险和中民保险网，其中淘宝保险的购买流程比较符合用户到额习惯，但是淘宝保险和网易保险的售后服务较弱，理赔困难，中民保险网在线销售1300余款保险产品，在售后服务上提供了7×24小时服务，并且协助理赔，各方面建设都比较健全。</p>
        </div>
        <div class="btn-area row w">
          <div class="col v-m">
            <x-button type="warn" @click.native="toggleTips">知道了</x-button>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
  import {Group, Cell, XButton, Popup} from 'vux'
  // import {insurance} from '../config'
  import {submitOrder, insurance} from '../config'
  export default {
    name: 'select',
    head: {
      title: {
        inner: '选择保障'
      }
    },
    data () {
      return {
        tips: false,
        force: [],
        basic: [],
        additional: [],
        forceName: '',
        forceValue: false,
        insurance: [],
        form: {
          userId: '',
          orderInfo: {}
        }
      }
    },
    components: {
      Group,
      Cell,
      XButton,
      Popup
    },
    mounted () {
    },
    created () {
      this.form.userId = this.$route.params.userId
      this.handleInsurance()
    },
    methods: {
      handleInsurance () {
        this.$http({
          method: 'jsonp',
          url: insurance,
          jsonp: 'callback',
          jsonpCallback: 'json'
        })
        .then(res => {
          const result = res.body.data.insuranceList
          // result.forEach(el => {
          //   console.log(el)
          //   if (el.regardless) {
          //     el.regardless = true
          //   } else {
          //     el.regardless = false
          //   }
          // })
          // result.forEach(el => {
          //   console.log(el.regardless)
          // })
          result.forEach(item => {
            item.select = false
            item.value = item.extra.split(',')[0].split(':')[0]
            switch (item.type) {
              case 0:
                this.force.push(item)
                break
              case 1:
                this.basic.push(item)
                break
              case 2:
                this.additional.push(item)
                break
            }
          })
          this.force.forEach(item => {
            this.forceName += '+' + item.name
          })
          this.forceName = this.forceName.substring(1, this.forceName.length)
          this.forceValue = this.force[0].value
        })
      },
      handleSubmit () {
        this.force.forEach(el => {
          if (el.select) {
            this.insurance.push(el)
          }
        })
        this.basic.forEach(el => {
          if (el.select) {
            this.insurance.push(el)
          }
        })
        this.additional.forEach(el => {
          if (el.select) {
            this.insurance.push(el)
          }
        })
        this.insurance.forEach(el => {
          if (el.regardless) {
            el.regardless = 1
          } else {
            el.regardless = 0
          }
        })
        this.$localStorage.set('insurance', JSON.stringify(this.insurance))
        this.form.orderInfo = {
          company: JSON.parse(this.$localStorage.get('orderCompany')),
          user: JSON.parse(this.$localStorage.get('orderUser')),
          card: JSON.parse(this.$localStorage.get('orderPic')),
          insurance: this.insurance
        }
        this.$localStorage.set('order', JSON.stringify(this.form))
        // this.form.orderInfo.insurance.forEach(el => {
        //   console.log(el.name, el.regardless, el)
        // })
        this.form.orderInfo = JSON.stringify(this.form.orderInfo)
        console.log(this.form)
        this.$http({
          method: 'jsonp',
          url: submitOrder,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form
        })
        .then(res => {
          console.log(res)
          if (res.body.status === 1) {
            this.$router.push('/offersuccess/' + res.body.data.orderId + '/' + this.form.userId)
          } else if (res.body.status === 3) {
            this.$vux.toast.show({
              type: 'text',
              width: '18em',
              position: 'bottom',
              text: '服务器出错，请稍后重试！',
              time: '3000'
            })
          } else {
            this.$vux.toast.show({
              type: 'text',
              width: '18em',
              position: 'bottom',
              text: '您尚未选择任何保障！',
              time: '3000'
            })
          }
        })
      },
      handlepull () {
        // 强制保险，联动选择
        for (const i in this.force) {
          if (i) {
            this.force[i].select = this.force[0].select
          }
        }
      },
      toggleTips () {
        this.tips = !this.tips
      }
    }
  }
</script>
<style>
.select .weui-cell__hd{width:45%;}
.select .long .weui-cell__hd{width:70%;}
.fix-btn{display:inline-block;font-size:1.2rem;background:#49BC2E;position:fixed;top:1rem;right:0;z-index:100;border-radius:2rem 0 0 2rem;color:#fff;padding:0.3rem 1rem;}
.pop-tip{height:100%;background:#fff;overflow:hidden;}
.pop-tip.has-btn{padding-bottom:5rem;}
.pop-tip h1{text-align:center;font-size:1.2rem;color:#333;border-bottom:1px solid #eee;padding:0.7rem 1rem;}
.pop-tip p{font-size:1rem;color:#666;line-height:1.8;padding:0 1rem;text-indent:2em;margin-top:1rem;}
.hideletter:first-letter{color:#f00;}
</style>
