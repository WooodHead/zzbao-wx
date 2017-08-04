<template>
  <div class="page gray auto has-tab">
    <tab :line-width=2 active-color='#EB3D00' v-model="index" style="position:fixed;top:0;left:0;width:100%;margin:0;z-index:100;">
      <tab-item class="vux-center" :selected="current === item.text" v-for="(item, index) in bar" @on-item-click="handleChange(item, index)" :key="index">{{item.text}}</tab-item>
    </tab>
    <!--<swiper v-model="index" :show-dots="false" class="h" :height="height" @on-index-change="handleSwiper" :min-moving-distance="100">
      <swiper-item v-for="(item, index) in bar" :key="index" class="h">-->
        <div>
          <no-data v-if="noData">
            <h2 slot="icon" class="iconfont icon-none"></h2>
            <p slot="title" class="text">没有相关订单！</p>
          </no-data>
          <order-item :list="list"></order-item>
          <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
            <p slot="no-results"></p>
            <p slot="no-more">没有更多！</p>
            <div slot="spinner" style="padding:1rem;">
              <img style="width:2rem;" class="v-m" src="static/img/331.svg" alt="">
              <span class="v-m" style="font-size:1rem;color:#666;">加载中</span>
            </div>
          </infinite-loading>
        </div>
      <!--</swiper-item>
    </swiper>-->
    <popup v-model="service" class="service" :hide-on-blur="false">
      <h2>客服工作时间：9:00~21:00</h2>
      <group gutter="10px">
        <div style="padding:0 1rem 1rem 1rem;">
          <x-button type="primary" @click.native="takeQQ">咨询在线客服</x-button>
          <x-button type="warn" @click.native="takeTel">拨打客服热线</x-button>
        </div>
      </group>
      <x-button @click.native="hideService(false)" plain type="primary" style="border-color:#ccc;color:#999;border-radius:0;border-left:none;border-right:none;">取消</x-button>
    </popup>
  </div>
</template>
<script>
  import {Tab, TabItem, Swiper, SwiperItem, Sticky, dateFormat, Popup, XButton, Group} from 'vux'
  import OrderItem from '@/components/OrderItem'
  import {orderList} from '../config'
  import InfiniteLoading from 'vue-infinite-loading'
  import noData from '@/components/Null'
  import {mapGetters, mapMutations} from 'vuex'
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
        noData: false,
        platform: '',
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
    computed: {
      ...mapGetters({
        service: 'getService'
      })
    },
    mounted () {
      // this.height = document.querySelector('.vux-slider').clientHeight + 'px'
      this.tag = this.$route.params.tag
      this.platform = this.$route.query.platform
    },
    created () {
      if (this.$route.params.userId !== 'null') {
        this.form.userId = this.$route.params.userId
        this.form.status = this.$route.params.id
        if (this.form.status === '-100') {
          this.getList(1)
        }
      } else {
        this.$router.replace('/login')
      }
      for (const i in this.bar) {
        if (this.bar[i].key === this.$route.params.id) {
          this.index = parseInt(i)
          this.current = this.bar[i].text
          console.log(this.index,'index')
        }
      }
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Group,
      Sticky,
      OrderItem,
      InfiniteLoading,
      Popup,
      noData,
      XButton
    },
    methods: {
      takeQQ () {
        console.log('QQ')
        // loadURL('tencent://message/?uin=979741120&Site=&menu=yes')
        window.location.href = 'http://wpa.qq.com/msgrd?v=3&uin=2306157540&site=qq&menu=yes'
      },
      takeTel () {
        window.location.href="tel:4006 128 070"
      },
      ...mapMutations({
        hideService: 'setService'
      }),
      serviceShow () {
        this.showService = false
      },
      onInfinite () {
        console.log(0)
        this.getList(0)
      },
      getList (status) {
        const This = this
        
        this.$http({
          method: 'jsonp',
          url: orderList,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form,
          _timeout: 10000,
          timeout: 10000,
          onTimeout: request => {
            this.statusInit()
            // this.$router.push('/net')
            // This.$vux.toast.show({
            //   type: 'text',
            //   width: '20em',
            //   position: 'bottom',
            //   text: '网络连接失败，请稍后重试！',
            //   time: '3000'
            // })
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
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
          // res.body.data.orderList.forEach(el => {
          //   This.list.push(el)
          // })
          // for (const i in this.list) {
          //   this.list[i].createTime = dateFormat(this.list[i].createTime)
          // }
          if (res.body.data.orderList.length) {
            this.list = this.list.concat(res.body.data.orderList)
            this.list.forEach(el => {
              el.createTime = dateFormat(el.createTime)
            })
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
            if (res.body.data.orderList.length < this.form.limit) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
            }
          } else {
            console.log('nomore')
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
            if (!this.list.length) {
              this.noData = true
            }
          }
        })
      },
      handleChange (item, index) {
        this.list = []
        this.noData = false
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        this.$router.replace('/order/' + this.bar[this.index].key + '/' + this.$route.params.userId + '/' + this.tag)
        this.form.status = this.bar[index].key
        this.getList(1)
      },
      handleSwiper (index) {
        this.form.pageIndex = 0
        this.$router.replace('/order/' + this.bar[this.index].key + '/' + this.$route.params.userId + '/' + this.tag)
        this.form.status = this.bar[index].key
        this.getList(1)
      }
    }
  }
</script>
<style scoped>
.page.has-tab{padding-top:44px;}
.has-tab .vux-tab{margin-top:-44px;}
</style>
