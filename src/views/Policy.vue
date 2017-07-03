<template>
  <div class="page gray auto">
    <group gutter="0px" v-if="order.user">
      <cell>
        <p slot="title">保单城市：</p>
        <p slot="default">{{order.user.insuranceArea}}</p>
      </cell>
    </group>
    <group gutter="10px">
      <cell title="商业险"></cell>
      <cell-form-preview :list="insurance"></cell-form-preview>
    </group>
    <group gutter="10px">
      <cell>
        <p slot="title">交强险<span class="c-9">（含车船费）</span></p>
      </cell>
      <cell-form-preview :list="force"></cell-form-preview>
    </group>
  </div>
</template>
<script>
  import {Group, Cell, CellFormPreview} from 'vux'
  import {orderDetail} from '../config'
  export default {
    name: 'policy',
    head: {
      title: {
        inner: '保单信息'
      }
    },
    components: {
      Group,
      Cell,
      CellFormPreview
    },
    data () {
      return {
        order: {},
        force: [],
        insurance: [],
        regard: [],
        form: {
          userId: '',
          orderId: ''
        }
      }
    },
    created () {
      this.form.orderId = this.$route.params.orderId
      this.form.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
      this.getDetail()
    },
    methods: {
      getDetail () {
        this.$http({
          method: 'jsonp',
          url: orderDetail,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form
        })
        .then(res => {
          console.log(res)
          this.order = res.body.data.order
          // this.order = res.body.data.order
          // this.$localStorage.set('order', JSON.stringify(this.order))
          const insurances = res.body.data.order.insurance
          for (const key in insurances) {
            if (parseInt(insurances[key].type) === 1 || parseInt(insurances[key].type) === 2) {
              this.insurance.push({
                label: insurances[key].name,
                value: insurances[key].value
              })
              if (insurances[key].regardless) {
                this.regard.push({
                  label: '不计免赔(' + insurances[key].name + ')',
                  value: '投保'
                })
              }
            } else {
              this.force.push({
                label: insurances[key].name,
                value: insurances[key].value
              })
            }
            // switch (parseInt(insurances[key].type)) {
            //   case 0:
            //     this.force.push({
            //       label: insurances[key].name,
            //       value: insurances[key].value
            //     })
            //     break
            //   case 1:
            //     this.insurance.push({
            //       label: insurances[key].name,
            //       value: insurances[key].name
            //     })
            //     if (insurances[key].regardless) {
            //       this.regard.push({
            //         label: '不计免赔（' + insurances[key].name + '）',
            //         value: '投保'
            //       })
            //     }
            //     break
            //   case 2:
            //     this.insurance.push({
            //       label: insurances[key].name,
            //       value: insurances[key].value
            //     })
            //     if (insurances[key].regardless) {
            //       this.regard.push({
            //         label: '不计免赔（' + insurances[key].name + '）',
            //         value: '投保'
            //       })
            //     }
            //     break
            // }
          }
          // this.insurance.forEach(el => {
          //   if (el.value) {
          //     el.value = el.value.split(':')[1]
          //   }
          // })
          for (const i in this.regard) {
            this.insurance.push(this.regard[i])
          }
        })
      }
    }
  }
</script>
<style scoped>
.c-9{color:#999;font-size:1rem;}
</style>
