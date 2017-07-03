<template>
  <div class="page gray has-btn">
    <div class="h auto content">
      <group title="强制保险" class="select" v-if="force">
        <Cell class="long" v-for="(item, index) in force" :key="index" v-if="index === 0">
          <div class="checkbox full" slot="icon">
            <input type="checkbox" checked name="force" :value="'缴纳'" :id="'force' + index" v-model="item.select" v-on:change="handlepull">
            <span class="iconfont icon-right1"></span>
            <label :for="'force' + index">{{forceName}}</label>
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
          <div class="checkbox circle right" slot="value" v-if="item.select">
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
  </div>
</template>
<script>
  import {Group, Cell, XButton} from 'vux'
  // import {insurance} from '../config'
  import {submitOrder, insurance} from '../config'
  export default {
    name: 'select',
    data () {
      return {
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
      XButton
    },
    mounted () {
      this.form.userId = this.$route.params.userId || JSON.parse(this.$localStorage.get('userInfo')).userId
      this.handleInsurance()
    },
    created () {
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
          console.log(result)
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
        this.$localStorage.set('insurance', JSON.stringify(this.insurance))
        this.form.orderInfo = {
          company: JSON.parse(this.$localStorage.get('orderCompany')),
          user: JSON.parse(this.$localStorage.get('orderUser')),
          card: JSON.parse(this.$localStorage.get('orderPic')),
          insurance: this.insurance
        }
        console.log(this.form, submitOrder)
        this.$localStorage.set('order', JSON.stringify(this.form))
        this.form.orderInfo = JSON.stringify(this.form.orderInfo)
        this.$http({
          method: 'jsonp',
          url: submitOrder,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form
        })
        .then(res => {
          console.log(res)
          if (res.status) {
            this.$router.replace('/offersuccess/' + res.body.data.orderId + '/' + this.form.userId)
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
      }
    }
  }
</script>
<style>
.select .weui-cell__hd{width:45%;}
.select .long .weui-cell__hd{width:70%;}
</style>
