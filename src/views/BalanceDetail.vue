<template>
  <div class="page gray" style="display:flex;display:-webkit-flex;flex-direction:column;">
    <div class="banner">
      <div class="row w h">
        <div class="col v-m t-c">
          <h2>{{balance}}</h2>
          <p>账户积分余额（分）</p>
        </div>
      </div>
    </div>
    <h2 class="title"><span class="iconfont icon-iconfont"></span>积分明细</h2>
    <div class="auto" style="flex:1;-webkit-flex:1;">
      <group gutter="0px" v-for="(item, index) in list" :key="index">
        <cell>
          <ul class="row w">
            <li class="col v-m col-4 t-l " :class="item.type === 1 ? 'green' : ''" style="font-size:1.6rem;">{{item.type === 1 ? '+' : '-'}}{{item.score}}</li>
            <li class="col v-m col-20">
              <p class="time">{{item.createTime}}</p>
              <p class="text t-r">{{item.source.split(':')[0]}}</p>
            </li>
          </ul>
        </cell>
      </group>
      <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
        <p slot="no-results"></p>
        <p slot="no-more">没有更多！</p>
        <div slot="spinner" style="padding:1rem;">
          <img style="width:2rem;" class="v-m" src="static/img/331.svg" alt="">
          <span class="v-m" style="font-size:1rem;color:#666;">加载中</span>
        </div>
      </infinite-loading>
    </div>
    <div class="row w h tip" v-if="noData">
      <none>
        <img slot="img" src="static/img/sorry.png" alt="">
        <p slot="text">没有积分记录哦！</p>
      </none>
    </div>
  </div>
</template>
<script>
  import {Group, Cell, dateFormat} from 'vux'
  import {detail, wallet, timeout} from '../config'
  import InfiniteLoading from 'vue-infinite-loading'
  import none from '@/components/None'
  export default {
    name: 'balanceDetail',
    head: {
      title: {
        inner: '账户余额明细',
        separator: ' '
      }
    },
    components: {
      Group,
      InfiniteLoading,
      Cell,
      none
    },
    data () {
      return {
        balance: 0,
        list: [],
        timeout: timeout,
        request: true,
        noData: false,
        form: {
          userId: '',
          type: 2,
          limit: 10,
          pageIndex: 0
        }
      }
    },
    mounted () {
      this.form.userId = this.$route.params.userId
      if (this.form.userId === 'null') {
        this.$router.replace('/login')
      } else {
        this.getList(() => {}, null)
      }
    },
    methods: {
      statusNoMore () {
        this.$el.querySelectorAll('.load').forEach(el => {
          el.style.display = 'none'
        })
        this.$el.querySelectorAll('.no-more').forEach(el => {
          el.style.display = 'block'
        })
      },
      statusLoad () {
        this.$el.querySelectorAll('.load').forEach(el => {
          el.style.display = 'block'
        })
        this.$el.querySelectorAll('.no-more').forEach(el => {
          el.style.display = 'none'
        })
      },
      statusInit () {
        this.$el.querySelectorAll('.load').forEach(el => {
          el.style.display = 'none'
        })
        this.$el.querySelectorAll('.no-more').forEach(el => {
          el.style.display = 'none'
        })
      },
      onInfinite (done) {
        this.getList(0)
      },
      getList (status) {
        const This = this
        this.$http({
          method: 'jsonp',
          url: detail,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form,
          _timeout: timeout,
          timeout: timeout,
          onTimeout: request => {
            // this.$router.push('/net')
            this.statusInit()
            this.request = false
            this.loading = false
            this.$vux.toast.show({
              type: 'text',
              width: '20em',
              position: 'bottom',
              text: '网络连接失败，请稍后重试！',
              time: '3000'
            })
            console.log('timeout')
          },
          before: () => {
            this.form.pageIndex = Math.ceil(this.list.length / this.form.limit)
            console.log('请求第' + this.form.pageIndex + '页')
            if (status) {
              this.list = []
            }
          }
        })
        .then(res => {
          if (res.body.data.scoreList.length) {
            this.list = this.list.concat(res.body.data.scoreList)
            this.list.forEach(el => {
              el.createTime = dateFormat(el.createTime)
            })
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
            if (res.body.data.scoreList.length < this.form.limit) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
            }
          } else {
            console.log('nomore')
            this.statusNoMore()
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
            if (!this.list.length) {
              this.noData = true
            }
          }
          for (const i in this.list) {
            this.list[i].createTime = dateFormat(this.list[i].createTime)
          }
          this.$http({
            method: 'jsonp',
            url: wallet,
            jsonp: 'callback',
            jsonpCallback: 'json',
            params: {
              userId: this.form.userId
            }
          })
          .then(res => {
            this.balance = res.body.data.wallet.balance
          })
        })
      }
    }
  }
</script>
<style scoped>
.green{color:#49BC2E;}
.time{font-size:1rem;color:#9D9D9D;}
.text{font-size:1.1rem;line-height:1.8;color:#565656;}
.fix-banner{padding-top:15vh;}
.banner{height:15vh;background:#FFA500;color:#fff;}
.banner p{font-size:1rem;color:rgba(255,255,255,0.8);}
.title:before{display:none;}
.title{padding:0.3rem 1rem;border-bottom:1px solid #ECECEC;margin-top:0;}
.title .iconfont{font-size:1.4rem;margin-right:0;vertical-align:middle;padding:0 0.5rem 0 0;}
</style>
