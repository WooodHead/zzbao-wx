<template>
  <div class="page gray">
    <timeline>
      <timeline-item>
          <h4 class="recent">待付款</h4>
      </timeline-item>
      <timeline-item>
          <h4>报价成功</h4>
      </timeline-item>
      <timeline-item>
          <h4>提交报价</h4>
      </timeline-item>
    </timeline>
  </div>
</template>
<script>
  import {Timeline, TimelineItem} from 'vux'
  export default {
    name: 'track',
    components: {
      Timeline,
      TimelineItem
    },
    data () {
      return {
        list: [{
          status: 0,
          text: '提交报价'
        }, {
          status: 1,
          text: '报价成功'
        }, {
          status: 1,
          text: '待付款'
        }, {
          status: 1,
          text: '已付款'
        }, {
          status: 1,
          text: '待出单'
        }, {
          status: 1,
          text: '已出单'
        }],
        status: JSON.parse(this.$localStorage.get('orderDetail')).orderStatus
      }
    },
    created () {
      console.log(this.status)
    }
  }
</script>
