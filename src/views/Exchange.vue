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
      <div class="col v-m t-c">
        <img v-lazy="'static/img/sorry.png'" alt="">
        <p>没有兑换奖品记录哦！</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {XImg} from 'vux'
  import {exchangeLog} from '../config'
  import VScroll from '../components/VScroll'
  export default {
    name: 'exchange',
    head: {
      title: {
        inner: '兑换记录',
        separator: ' '
      }
    },
    data () {
      return {
        height: '',
        loading: false,
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
      VScroll
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
          before: () => {
            if (status) {
              this.list = []
            }
          }
        })
        .then(res => {
          res.body.data.productList.forEach(el => {
            This.list.push(el)
          })
          if (res.body.data.productList.length < This.form.limit) {
            this.statusNoMore()
          } else {
            this.statusLoad()
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
.tip img{width:8rem;}
.tip p{font-size:1.2rem;color:#3c3c3c;margin-top:2rem;}
</style>
