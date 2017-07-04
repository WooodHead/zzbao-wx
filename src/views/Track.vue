<template>
  <div class="page gray">
    <timeline style="background:#fff;">
      <timeline-item v-for="(item, index) in list" :key="index">
          <div class="row w">
            <span class="col v-m">{{item.text}}</span><span class="col v-m t-r">{{item.time}}</span>
          </div>
      </timeline-item>
    </timeline>
  </div>
</template>
<script>
  import {Timeline, TimelineItem} from 'vux'
  export default {
    name: 'track',
    head: {
      title: {
        inner: '订单跟踪'
      }
    },
    components: {
      Timeline,
      TimelineItem
    },
    data () {
      return {
        list: [{
          status: 0,
          text: '提交报价',
          time: '2017-06-12 12:40:32'
        }, {
          status: 1,
          text: '报价成功',
          time: '2017-06-12 12:40:32'
        }, {
          status: 1,
          text: '待付款',
          time: '2017-06-12 12:40:32'
        }, {
          status: 1,
          text: '已付款',
          time: '2017-06-12 12:40:32'
        }, {
          status: 1,
          text: '待出单',
          time: '2017-06-12 12:40:32'
        }, {
          status: 1,
          text: '已出单',
          time: '2017-06-12 12:40:32'
        }],
        status: JSON.parse(this.$localStorage.get('orderDetail')).orderStatus
      }
    },
    created () {
      this.list = this.list.reverse()
    }
  }
</script>
<style>
.vux-timeline-item:first-child .vux-timeline-item-content{padding-top:0.5rem !important;}
.vux-timeline-item-content{padding:0 1rem 3rem 2rem !important;}
.vux-timeline-item-content .col{font-size:1rem;color:#707070;}
.vux-timeline-item-content .col:first-child{color:#333;}
</style>

