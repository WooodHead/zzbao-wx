<template>
  <div class="page gray h">
    <div>
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <ul class="safe-list white">
          <li class="row w"  v-for="(item, index) in list" :key="index">
            <span class="col v-m col-9 t-l p-5">
              <span class="img large">
                <img v-lazy="{src: item.listPic, error: 'static/img/err1.png', loading: 'static/img/loading1.gif'}" alt=""/>
              </span>
            </span>
            <span class="col v-m col-15" style="padding-left:1rem;">
              <b class="name mb-10">{{item.name}}</b>
              <i style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{item.note}}</i>
              <span class="row w">
                <span class="col v-m t-l c-red"><span class="num">{{item.score}}</span>积分</span>
                <span class="col v-m t-r status">已兑换</span>
              </span>
            </span>
          </li>
        </ul>
      </v-scroll>
    </div>
    <div class="row w h tip" v-if="list.length === 0">
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
  import VScroll from '../components/VScroll'
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
      VScroll,
      none
    },
    mounted () {
      if (this.$route.params.userId === 'null') {
        this.$router.replace('/login')
      } else {
        this.form.userId = this.$route.params.userId
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
      getList (done, status) {
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
            if (status) {
              this.list = []
            }
          }
        })
        .then(res => {
          console.log(res)
          res.body.data.productList.forEach(el => {
            This.list.push(el)
          })
          if (res.body.data.productList.length < This.form.limit) {
            this.statusNoMore()
          } else {
            this.statusLoad()
          }
          if (this.list.length < this.form.limit) {
            this.statusInit()
          }
          done()
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
<style>
.tip img{width:6rem;}
.tip p{font-size:1rem;color:#999;margin-top:1rem;}
</style>
