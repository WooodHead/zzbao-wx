<template>
  <div class="page gray auto has-tab">
    <tab :line-width=2 active-color='#EB3D00' v-model="index">
      <tab-item class="vux-center" :selected="current === item.text" v-for="(item, index) in bar" @on-item-click="handleChange(item, index)" :key="index">{{item.text}}</tab-item>
    </tab>
    <swiper v-model="index" :show-dots="false" class="h" :height="height" @on-index-change="handleSwiper" :min-moving-distance="100">
      <swiper-item v-for="(item, index) in bar" :key="index" class="h">
        <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
          <no-data v-if="list.length === 0">
            <h2 slot="icon" class="iconfont icon-none"></h2>
            <p slot="title" class="text">没有相关订单！</p>
          </no-data>
          <div class="tab-swiper vux-center h auto">
            <order-item :list="list"></order-item>
          </div>
        </v-scroll>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import {Tab, TabItem, Swiper, SwiperItem, Sticky, dateFormat} from 'vux'
  import OrderItem from '@/components/OrderItem'
  import {orderList} from '../config'
  import VScroll from '../components/VScroll'
  import noData from '@/components/Null'
  export default {
    name: 'order',
    head: {
      title: {
        inner: '我的订单',
        separator: ' '
      }
    },
    data () {
      return {
        loading: false,
        tag: '',
        form: {
          userId: '',
          status: -1,
          limit: 5,
          pageIndex: 0
        },
        height: '0px',
        list: [],
        bar: [{
          text: '全部',
          key: '-100'
        }, {
          text: '待报价',
          key: '0'
        }, {
          text: '待支付',
          key: '3'
        }, {
          text: '待承保',
          key: '4'
        }, {
          text: '已承保',
          key: '5'
        }],
        current: '全部',
        index: 0
      }
    },
    mounted () {
      this.height = document.querySelector('.vux-slider').clientHeight + 'px'
    },
    created () {
      this.tag = this.$route.params.tag
      if (this.$route.params.userId !== 'null') {
        this.form.userId = this.$route.params.userId
        this.form.status = this.$route.params.id
        this.getList(() => {}, 1)
      } else {
        this.$router.replace('/login')
      }
      for (const i in this.bar) {
        if (this.bar[i].key === this.$route.params.id) {
          this.index = parseInt(i)
        }
      }
      // this.form.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Sticky,
      OrderItem,
      VScroll,
      noData
    },
    methods: {
      onRefresh (done) {
        this.form.pageIndex = 0
        this.statusInit()
        this.getList(done, 1)
      },
      onInfinite (done) {
        this.form.pageIndex = this.list.length / this.form.limit
        if (this.list.length % this.form.limit) {
          this.statusNoMore()
        } else {
          this.$el.querySelectorAll('.load').forEach(el => {
            el.style.display = 'block'
          })
          this.getList(done, 0)
        }
      },
      getList (done, status) {
        const This = this
        this.$http({
          method: 'jsonp',
          url: orderList,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form,
          _timeout: 5000,
          timeout: 5000,
          onTimeout: request => {
            this.statusInit()
            // this.$router.push('/net')
            This.$vux.toast.show({
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
          res.body.data.orderList.forEach(el => {
            This.list.push(el)
          })
          if (this.list.length < this.form.limit) {
            this.statusNull()
          } else if (res.body.data.orderList.length < This.form.limit) {
            this.statusNoMore()
          } else {
            this.statusLoad()
          }
          done()
          for (const i in this.list) {
            this.list[i].createTime = dateFormat(this.list[i].createTime)
          }
          this.list.forEach(el => {
            el.createTime = dateFormat(el.createTime)
          })
        })
      },
      handleChange (item, index) {
        this.form.pageIndex = 0
        this.index = index
        // this.$router.replace('/order/' + this.bar[this.index].key + '/' + this.$route.params.userId)
        this.form.status = this.bar[index].key
      },
      handleSwiper (index) {
        this.form.pageIndex = 0
        this.$router.replace('/order/' + this.bar[this.index].key + '/' + this.$route.params.userId + '/' + this.tag)
        this.form.status = this.bar[index].key
        this.getList(() => {}, 1)
      },
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
      statusNull () {
        this.$el.querySelectorAll('.load').forEach(el => {
          el.style.display = 'none'
        })
        this.$el.querySelectorAll('.no-more').forEach(el => {
          el.style.display = 'none'
        })
      }
    }
  }
</script>
<style scoped>
.page.has-tab{padding-top:44px;}
.has-tab .vux-tab{margin-top:-44px;}
</style>
