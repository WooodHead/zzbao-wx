<template>
  <div class="page gray h">
    <div style="position:absolute;top:0;bottom:0;left:0;right:0;overflow:auto;">
        <ul class="safe-list white">
          <li class="row w"  v-for="(item, index) in list" :key="index">
            <span class="col v-m col-9 t-l p-5">
              <span class="img large">
                <img v-lazy="{src: item.listPic, error: 'static/img/err1.png', loading: 'static/img/loading1.gif'}" alt=""/>
              </span>
            </span>
            <span class="col v-m col-15" style="padding-left:1rem;padding-right:1rem;">
              <b class="name mb-10">{{item.name}}</b>
              <i style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{item.note}}</i>
              <span class="row w">
                <span class="col v-m t-l c-red"><span class="num">{{item.score}}</span>积分</span>
                <span class="col v-m t-r status">已兑换</span>
              </span>
            </span>
          </li>
        </ul>
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
        <p slot="text">没有兑换奖品记录哦！</p>
      </none>
    </div>
  </div>
</template>

<script>
  import {XImg} from 'vux'
  import {exchangeLog, timeout} from '../config'
  import InfiniteLoading from 'vue-infinite-loading'
  import none from '@/components/None'
  export default {
    name: 'exchange',
    head: {
      title: {
        inner: '积分兑换记录',
        separator: ' '
      }
    },
    data () {
      return {
        height: '',
        loading: false,
        timeout: timeout,
        noData: false,
        request: true,
        form: {
          userId: 0,
          limit: 5,
          pageIndex: 0
        },
        list: [], // 下拉更新数据存放数组
        more: []  // 上拉更多的数据存放数组
      }
    },
    components: {
      XImg,
      InfiniteLoading,
      none
    },
    mounted () {
      if (this.$route.params.userId === 'null') {
        this.$router.replace('/login')
      } else {
        this.form.userId = this.$route.params.userId
      }
    },
    methods: {
      getList (status) {
        const This = this
        this.$http({
          method: 'jsonp',
          url: exchangeLog,
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
          console.log(res)
          if (res.body.data.productList.length) {
            this.list = this.list.concat(res.body.data.productList)
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
            if (res.body.data.productList.length < this.form.limit) {
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
      onInfinite (done) {
        this.getList(0)
      }
    }
  }
</script>
<style>
.tip img{width:6rem;}
.tip p{font-size:1rem;color:#999;margin-top:1rem;}
</style>
