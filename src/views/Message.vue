<template>
  <div class="page gray">
    <group gutter="0px" v-if="list.length > 0">
      <cell value-align="left" v-for="(item, index) in list" :key="index">
        <h2 class="time">{{item.createTime}}<badge v-if="!item.status"></badge></h2>
        <p class="text">{{item.title}}</p>
      </cell>
    </group>
    <h2 class="tip" v-if="list.length === 0">您暂时没有任何消息！</h2>
  </div>
</template>
<script>
  import {Group, Cell, Badge, dateFormat} from 'vux'
  import {message, messageStatus} from '../config'
  export default {
    name: 'message',
    components: {
      Group,
      Cell,
      Badge
    },
    data () {
      return {
        list: []
      }
    },
    created () {
      if (this.$localStorage.get('logined') !== 'false') {
        this.getList()
      }
    },
    methods: {
      handleChange () {
        console.log(messageStatus)
      },
      getList () {
        this.$http({
          method: 'jsonp',
          url: message,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: {
            userId: JSON.parse(this.$localStorage.get('userInfo')).userId,
            // userId: '0e9236d6b4474f259cfd1d2f9bf8f3b0',
            limit: 10,
            pageIndex: 0
          }
        })
        .then(res => {
          console.log(res)
          res.body.data.messageList.forEach(el => {
            el.createTime = dateFormat(el.createTime)
          })
          if (res.body.status) {
            this.list = res.body.data.messageList
          } else {
            this.$vux.toast.show({
              type: 'text',
              width: '10em',
              position: 'bottom',
              text: res.body.msg,
              time: '1000'
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
.time{font-size:1rem;}
.text{font-size:1.1rem;color:#5B5B5B;line-height:1.6;word-break: break-all;display:-webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:2;overflow:hidden;}
.tip{font-size:1.2rem;color:#999;text-align:center;padding:3rem 0;}
.time .vux-badge{position:absolute;right:1rem;top:1rem;}
</style>
