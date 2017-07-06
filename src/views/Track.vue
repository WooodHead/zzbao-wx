<template>
  <div class="page gray">
    <timeline style="background:#fff;padding:1rem 1rem 0 2rem;">
      <timeline-item v-for="(item, index) in list" :key="index">
          <div class="row w">
            <span class="col v-m col-12">{{item.text}}</span><span class="col v-m t-r col-12">{{item.time}}</span>
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
.vux-timeline-item .vux-timeline-item-content{padding-top:0.5rem !important;}
.vux-timeline-item-content{padding:0 1rem 3rem 2rem !important;}
.vux-timeline-item-content .col{font-size:1rem;color:#707070;}
.vux-timeline-item-content .col:first-child{color:#333;}
.vux-timeline-item-tail{background:#E6E6E6 !important;}
.weui-icon-success-no-circle{display:inline-block !important;}
.vux-timeline-item-head{width:20px !important;height:20px !important;left:-4px !important;top:5px !important;}
.vux-timeline-item:last-child .vux-timeline-item-checked.weui-icon-success-no-circle{font-family: "iconfont";background:#fff;border:1px solid #E1E1E1;border-radius:50%;}
.vux-timeline-item:Last-child .vux-timeline-item-color{background:#fff !important;}
.vux-timeline-item:last-child .vux-timeline-item-checked.weui-icon-success-no-circle::before{content:"\e61a";color:#E1E1E1;top:50%;left:50%;transform:translate(-52%,-52%);font-size:1.5rem;}
</style>

