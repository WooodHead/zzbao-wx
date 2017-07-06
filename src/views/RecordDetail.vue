<template>
  <div class="page gray">
    <div class="row w">
      <div class="col v-m t-c info">
        <h2>-{{info.money / 10}}</h2>
        <p>提现（元）</p>
      </div>
    </div>
    <group gutter="0px">
      <cell title="开户银行" :value="info.bank_name"></cell>
      <cell title="收款卡号" :value="info.card_num"></cell>
      <cell title="积分余额" :value="info.balance"></cell>
      <cell title="创建时间" :value="info.createTime"></cell>
      <cell title="提现状态" :value="select(info.status)"></cell>
    </group>
  </div>
</template>
<script>
  import {Group, Cell} from 'vux'
  export default {
    name: 'recordDetail',
    head: {
      title: {
        inner: '提现详情'
      }
    },
    components: {
      Group,
      Cell
    },
    data () {
      return {
        info: {}
      }
    },
    mounted () {
      this.info = JSON.parse(this.$localStorage.get('record'))
    },
    methods: {
      select (num) {
        if (num === 0) {
          return '审核中'
        } else if (num === 1) {
          return '审核通过'
        } else {
          return '审核失败'
        }
      }
    }
  }
</script>
<style scoped>
.info{padding:2rem;}
.info h2{font-size:1.8rem;color:#434343;}
.info p{font-size:1rem;color:#999;}
</style>
