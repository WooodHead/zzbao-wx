<template>
  <div class="page gray has-tab">
    <tab class="sort" :line-width=2 active-color='#EB3D00' v-model="index">
      <tab-item class="vux-center select" :class="{sort: item.sort}" v-for="(item, index) in bar" :key="index" @on-item-click="handleChange">
        <span v-if="index > 0">{{item.text}}</span>
        <span v-if="index === 0" :class="select ? 'active' : ''">{{option}}</span>
      </tab-item>
    </tab>
    <div class="h auto">
      <no-data v-if="noData">
        <h2 slot="icon" class="iconfont icon-none"></h2>
        <p slot="title" class="text">没有相关订单！</p>
      </no-data>
      <div class="tab-swiper vux-center">
        <ul class="grid goods-list">
          <li class="col col-12" v-for="(item, index) in list" :key="index">
            <router-link :to="'/goods/' + item.id" class="goods" @click.native="handleSaveData(item)">
              <span class="cover">
                <img class="w h" v-lazy="{src: item.listPic, error: 'static/img/err1.png', loading: 'static/img/loading1.gif'}"/>
              </span>
              <b class="name">{{item.name}}</b>
              <span class="c-red">积分<b class="score">{{item.score}}</b></span>
            </router-link>
          </li>
        </ul>
      </div>
      <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
        <p slot="no-more">没有更多！</p>
        <p slot="no-results">没有更多！</p>
        <div slot="spinner" style="padding:1rem;">
          <img style="width:2rem;" class="v-m" src="static/img/331.svg" alt="">
          <span class="v-m" style="font-size:1rem;color:#666;">加载中</span>
        </div>
      </infinite-loading>
    </div>
    <popup position="top" v-model="select" class="popUp">
      <div class="sub-nav">
        <router-link v-for="(item, index) in options" :key="index" :to="'/mall/' + item.id" replace @click.native="handleSelect(item)">{{item.name}}</router-link>
      </div>
    </popup>
  </div>
</template>
<script>
  import {Tab, TabItem, Popup, Swiper, SwiperItem, XImg, Group, Cell} from 'vux'
  import {mapMutations} from 'vuex'
  import InfiniteLoading from 'vue-infinite-loading'
  import noData from '@/components/Null'
  import {product} from '../config'
  export default {
    name: 'goodsList',
    head: {
      title: {
        inner: '商品列表',
        separator: ' '
      }
    },
    computed: {
      type () {
        return this.$route.params.type
      }
    },
    data () {
      return {
        done: false,
        busy: false,
        height: '',
        class: '',
        sort: false,
        index: 0,
        current: '全部',
        typeList: [],
        list: [],
        typeId: 0,
        showLoading: false,
        select: false,
        score: false,
        noData:false,
        bar: [{
          text: '全部',
          key: 'all'
        }, {
          text: '默认',
          key: 'default'
        }, {
          text: '最新',
          key: 'news',
          sort: false
        }, {
          text: '积分',
          key: 'score',
          sort: false
        }],
        options: [],
        option: '全部',
        // 请求的初始参数
        form: {
          type: 0,
          timeOrder: 0,
          priceOrder: 0,
          defaultOrder: 0,
          limit: 4,
          pageIndex: 0
        },
        activeList: [] // 分类商品列表
      }
    },
    mounted () {
      // this.height = document.querySelector('.content').clientHeight + 'px'
    },
    components: {
      Tab,
      TabItem,
      Popup,
      Swiper,
      SwiperItem,
      XImg,
      Group,
      noData,
      Cell,
      InfiniteLoading
    },
    created () {
      const query = this.$route.query.init
      if (query === 'time') {
        this.bar[2].sort = true
        this.index = 2
        this.form.timeOrder = 2
      } else if (query === 'price') {
        this.index = 3
        this.form.priceOrder = 1
      }
      this.options = JSON.parse(this.$localStorage.get('goodsType'))
      this.options.unshift({
        id: 0,
        name: '全部'
      })
      this.form.type = this.$route.params.type
      for (const i in this.options) {
        if (this.options[i].id === this.form.type) {
          this.option = this.options[i].name
        }
      }
    },
    methods: {
      handleChange (index) {
        this.current = this.bar[index].text
        this.index = index
        if (!this.index) {
          this.select = true
        } else {
          this.select = false
          switch (this.index) {
            case 1:
              this.form.timeOrder = 0
              this.form.priceOrder = 0
              this.form.defaultOrder = 1
              break
            case 2:
              if (!this.bar[this.index].sort) {
                this.form.timeOrder = 2
                this.form.priceOrder = 0
                this.form.defaultOrder = 0
              } else {
                this.form.timeOrder = 1
                this.form.priceOrder = 0
                this.form.defaultOrder = 0
              }
              this.bar[this.index].sort = !this.bar[this.index].sort
              this.form.pageIndex = 0
              this.getList(1)
              break
            case 3:
              if (!this.bar[this.index].sort) {
                this.form.timeOrder = 0
                this.form.priceOrder = 2
                this.form.defaultOrder = 0
              } else {
                this.form.timeOrder = 0
                this.form.priceOrder = 1
                this.form.defaultOrder = 0
              }
              this.bar[this.index].sort = !this.bar[this.index].sort
              this.form.pageIndex = 0
              this.getList(1)
              break
          }
        }
        this.noData = false
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      },
      handleSelect (item) {
        this.option = item.name
        this.form.type = item.id
        this.select = false
        this.noData = false
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        this.getList(1)
      },
      handleSaveData (item) {
        this.$localStorage.set('goods', JSON.stringify(item))
      },
      onInfinite () {
        this.getList(0)
      },
      getList (status) {
        console.log(this.form)
        this.$http({
          method: 'jsonp',
          url: product,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form,
          before: (req) => {
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
            console.log('nomore')
            this.statusNoMore()
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
            if (!this.list.length) {
              this.noData = true
            }
          }
        })
      },
      statusNoMore () {
        this.$el.querySelectorAll('.infinite-status-prompt').forEach(el => {
          el.style.display = 'none'
        })
      },
      ...mapMutations({
        getProduct: 'getProduct'
      })
    }
  }
</script>
<style>
.sort .select .weui-cell{padding:0;}
.sort.vux-tab{z-index:10001;}
.sort .weui-cell__ft{color:#666;width:100%;text-align:center;}
.vux-tab-item span{position:relative;display:inline-block;padding-right:0.5rem;}
.vux-tab .vux-tab-item:first-child span:after{content:"";display:inline-block;width:1rem;height:1rem;background:url(../assets/img/down.png) no-repeat;background-size:1rem;position:absolute;right:-1rem;top:50%;transform:translate(0,-50%);transition:0.3s;}
.vux-tab .vux-tab-item:first-child span.active:after{transform:translate(0,-50%) rotate(180deg);}
.sort .weui-cell__ft:after{display:none;}
.sort .vux-tab-selected .weui-cell__ft{color:#EB3D00;}
.vux-popup-dialog.vux-popup-top{top:44px !important;}
.vux-tab-item.select:nth-child(3):after,.vux-tab-item.select:nth-child(4):after{content:"";display:inline-block;width:1rem;height:1rem;background:url(../assets/img/default.png) no-repeat right center;background-size:1.4rem;vertical-align:middle;}
.vux-tab-item.select.vux-tab-selected:nth-child(3):after,.vux-tab-item.select.vux-tab-selected:nth-child(4):after{content:"";display:inline-block;width:1rem;height:1rem;background:url(../assets/img/asc.png) no-repeat right center;background-size:1.4rem;vertical-align:middle;}
.vux-tab-item.sort.vux-tab-selected:nth-child(3):after,.vux-tab-item.sort.vux-tab-selected:nth-child(4):after{content:"";display:inline-block;width:1rem;height:1rem;background:url(../assets/img/dec.png) no-repeat right center;background-size:1.4rem;vertical-align:middle;}
.page.has-tab{padding-top:44px;}
.has-tab .vux-tab{margin-top:-44px;}
.popUp a{display:block;font-size:1rem;color:#666;padding:0.6rem 1rem;background:#fff;border-top:1px solid #eee;}
.popUp a:active{background:rgba(0,0,0,0.1)}
.addressNull{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:1rem;color:#999;text-align:center;}
.addressNull p{margin-top:1rem;}
</style>
