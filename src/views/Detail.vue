<template>
  <div class="page gray fix-banner">
    <div class="banner">
      <div class="row w h">
        <div class="col v-m t-c">
          <h2>{{balance}}</h2>
          <p>现有积分（分）</p>
        </div>
      </div>
    </div>
    <div class="h content">
      <h2 class="title"><span class="iconfont icon-jilu"></span>收入记录</h2>
      <v-scroll style="top:21vh;bottom:0;" :on-refresh="onRefresh" :on-infinite="onInfinite">
        <group gutter="0px">
          <cell v-for="(item, index) in list" :key="index">
            <ul class="row w">
              <li class="col v-m col-4 t-c green">+{{item.score}}</li>
              <li class="col v-m col-20">
                <p class="time">{{item.createTime}}</p>
                <p class="text">{{item.source.split(':')[0]}}</p>
              </li>
            </ul>
          </cell>
        </group>
      </v-scroll>
    </div>
  </div>
</template>
<script>
  import {Scroller, Group, Cell, dateFormat} from 'vux'
  import {detail, wallet} from '../config'
  import VScroll from '../components/VScroll'
  export default {
    name: 'detail',
    head: {
      title: {
        inner: '累计积分'
      }
    },
    components: {
      Scroller,
      Group,
      Cell,
      VScroll
    },
    data () {
      return {
        balance: 0,
        form: {
          userId: '',
          type: 1,
          limit: 10,
          pageIndex: 0
        },
        list: []
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
      onRefresh (done) {
        this.form.pageIndex = 0
        this.getList(done, 1)
      },
      onInfinite (done) {
        this.form.pageIndex ++
        this.getList(done, 0)
      },
      getList (done, status) {
        const This = this
        this.$http({
          method: 'jsonp',
          url: detail,
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
          console.log(res)
          res.body.data.scoreList.forEach(el => {
            This.list.push(el)
          })
          if (res.body.data.scoreList.length < This.form.limit) {
            this.$el.querySelector('.load-more').innerHTML = '我是有底线的！'
          }
          done()
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
            console.log(res)
            this.balance = res.body.data.wallet.balance
          })
        })
      }
    }
  }
</script>
<style scoped>
.green{font-size:1.6rem;color:#49BC2E;}
.time{font-size:1rem;color:#9D9D9D;}
.text{font-size:1.1rem;line-height:1.8;color:#565656;}
.fix-banner{padding-top:15vh !important;}
.banner{height:15vh !important;margin-top:-15vh !important;background:#EB3D00;color:#fff;}
.banner p{font-size:1rem;color:rgba(255,255,255,0.8);}
.title:before{display:none;}
.title{padding:0.3rem 1rem;border-bottom:1px solid #ECECEC;margin-top:0;}
.title .iconfont{font-size:1.4rem;margin-right:0.5rem;vertical-align:middle;}
</style>
