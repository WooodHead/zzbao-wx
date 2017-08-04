<template>
  <div class="page gray auto">
    <group gutter="0px" v-if="list.length > 0">
      <cell value-align="left" v-for="(item, index) in list" :key="index" @click.native="handleRead(item)">
        <h2 class="time">{{item.createTime}}<badge v-if="!item.status"></badge></h2>
        <p class="text">{{item.title}}</p>
      </cell>
    </group>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
      <p slot="no-more">没有更多！</p>
      <div slot="spinner" style="padding:1rem;">
        <img style="width:2rem;" class="v-m" src="static/img/331.svg" alt="">
        <span class="v-m" style="font-size:1rem;color:#666;">加载中</span>
      </div>
    </infinite-loading>
    <h2 class="tip" v-if="list.length === 0">您暂时没有任何消息！</h2>
  </div>
</template>
<script>
  import {Group, Cell, Badge, dateFormat} from 'vux'
  import InfiniteLoading from 'vue-infinite-loading'
  import {message, messageStatus} from '../config' // messageStatus
  export default {
    name: 'message',
    head: {
      title: {
        inner: '消息中心',
        separator: ' '
      }
    },
    components: {
      Group,
      Cell,
      Badge,
      InfiniteLoading
    },
    data () {
      return {
        list: [],
        form: {
          userId: JSON.parse(this.$localStorage.get('userInfo')).userId,
          // userId: '0e9236d6b4474f259cfd1d2f9bf8f3b0',
          limit: 10,
          pageIndex: 0
        }
      }
    },
    created () {
    },
    methods: {
      handleRead (item) {
        if (!item.status) {
          this.$http({
            method: 'jsonp',
            url: messageStatus,
            jsonp: 'callback',
            jsonpCallback: 'json',
            params: {
              userId: JSON.parse(this.$localStorage.get('userInfo')).userId,
              messageId: item.id
            }
          })
          .then(res => {
            console.log(res)
            if (res.body.status) {
              this.$vux.toast.show({
                type: 'text',
                width: '10em',
                position: 'bottom',
                text: '消息已读',
                time: '1000'
              })
              this.list.forEach(el => {
                if (el.id === item.id) {
                  el.status = !el.status
                }
              })
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
      },
      getList (status) {
        const This = this
        this.$http({
          method: 'jsonp',
          url: message,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form,
          before: () => {
            this.form.pageIndex = Math.ceil(this.list.length / this.form.limit)
            console.log('请求第' + this.form.pageIndex + '页')
            if (status) {
              this.list = []
            }
          }
        })
        .then(res => {
          console.log(res)
          res.body.data.messageList.forEach(el => {
            el.createTime = dateFormat(el.createTime)
          })
          if (res.body.data.messageList.length) {
            this.list = this.list.concat(res.body.data.messageList)
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
            if (res.body.data.messageList.length < this.form.limit) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
            }
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
            if (!this.list.length) {
              this.noData = true
            }
          }
        })
      },
      onRefresh (done) {
        this.form.pageIndex = 0
        this.statusInit()
        this.getList(done, 1)
      },
      onInfinite (done) {
        this.form.pageIndex ++
        if (this.list.length % this.form.limit) {
          this.statusNoMore()
        } else {
          this.$el.querySelectorAll('.load').forEach(el => {
            el.style.display = 'block'
          })
          this.getList(done, 0)
        }
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
