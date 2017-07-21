<template>
  <div class="page gray has-tab">
    <tab class="sort" :line-width=2 active-color='#EB3D00' v-model="index">
      <tab-item class="vux-center select" :class="{sort: item.sort}" v-for="(item, index) in bar" :key="index" @on-item-click="handleChange">
        <span v-if="index > 0">{{item.text}}</span>
        <span v-if="index === 0" :class="select ? 'active' : ''">{{option}}</span>
      </tab-item>
    </tab>
    <div class="h content">
      <!--<v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" style="top:44px;">-->
        <div class="tab-swiper vux-center h auto">
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
      <!--</v-scroll>-->
      <div class="addressNull" v-if="showLoading">
        <img style="width:4rem;" src="static/img/pageLoad.svg" alt="">
        <p slot="text">正在努力加载商品列表！</p>
      </div>
    </div>
    <popup position="top" v-model="select" class="popUp">
      <!--<group gutter="0">
        <cell v-for="(item, index) in options" :key="index" :title="item.name" is-link :link="'/mall/' + item.id" @click.native="handleSelect(item)"></cell>
      </group>-->
      <div class="sub-nav">
        <router-link v-for="(item, index) in options" :key="index" :to="'/mall/' + item.id" replace @click.native="handleSelect(item)">{{item.name}}</router-link>
      </div>
    </popup>
  </div>
</template>
<script>
  import {Tab, TabItem, Popup, Swiper, SwiperItem, XImg, Group, Cell} from 'vux'
  import {mapMutations} from 'vuex'
  import Loading from '@/components/Loading'
  import VScroll from '../components/VScroll'
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
        product: {
          type: 0,
          timeOrder: 0,
          priceOrder: 0,
          defaultOrder: 0,
          limit: 8,
          pageIndex: 0
        },
        activeList: [] // 分类商品列表
      }
    },
    mounted () {
      this.height = document.querySelector('.content').clientHeight + 'px'
    },
    components: {
      Tab,
      TabItem,
      Popup,
      Swiper,
      SwiperItem,
      XImg,
      Group,
      Cell,
      Loading,
      VScroll
    },
    created () {
      const query = this.$route.query.init
      if (query === 'time') {
        this.index = 2
        this.product.timeOrder = 1
      } else if (query === 'price') {
        this.index = 3
        this.product.priceOrder = 1
      }
      this.options = JSON.parse(this.$localStorage.get('goodsType'))
      this.options.unshift({
        id: 0,
        name: '全部'
      })
      this.product.type = this.$route.params.type
      for (const i in this.options) {
        if (this.options[i].id === this.product.type) {
          this.option = this.options[i].name
        }
      }
      this.getProduct(this)
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
              this.product.timeOrder = 0
              this.product.priceOrder = 0
              this.product.defaultOrder = 1
              break
            case 2:
              if (!this.bar[this.index].sort) {
                this.product.timeOrder = 2
                this.product.priceOrder = 0
                this.product.defaultOrder = 0
              } else {
                this.product.timeOrder = 1
                this.product.priceOrder = 0
                this.product.defaultOrder = 0
              }
              this.bar[this.index].sort = !this.bar[this.index].sort
              this.getProduct(this, null)
              break
            case 3:
              if (!this.bar[this.index].sort) {
                this.product.timeOrder = 0
                this.product.priceOrder = 2
                this.product.defaultOrder = 0
              } else {
                this.product.timeOrder = 0
                this.product.priceOrder = 1
                this.product.defaultOrder = 0
              }
              this.bar[this.index].sort = !this.bar[this.index].sort
              this.getProduct(this, null)
              break
          }
        }
      },
      // handleSwiper (index) {
      //   switch (index) {
      //     case 0:
      //       this.product.timeOrder = 0
      //       this.product.priceOrder = 0
      //       this.product.defaultOrder = 0
      //       break
      //     case 1:
      //       this.product.timeOrder = 0
      //       this.product.priceOrder = 0
      //       this.product.defaultOrder = 1
      //       break
      //     case 2:
      //       this.product.priceOrder = 0
      //       this.product.defaultOrder = 0
      //       if (this.bar[index]) {
      //         this.product.timeOrder = 2
      //       } else {
      //         this.product.timeOrder = 1
      //       }
      //       break
      //     case 3:
      //       this.product.timeOrder = 0
      //       this.product.defaultOrder = 0
      //       if (this.bar[index]) {
      //         this.product.priceOrder = 2
      //       } else {
      //         this.product.priceOrder = 1
      //       }
      //       break
      //   }
      //   this.getProduct(this, null)
      // },
      handleSelect (item) {
        this.option = item.name
        this.product.type = item.id
        this.select = false
        this.getProduct(this)
      },
      handleSaveData (item) {
        this.$localStorage.set('goods', JSON.stringify(item))
      },
      onRefresh (done) {
        this.product.pageIndex = 0
        this.statusInit()
        // this.getList(done, 1)
      },
      onInfinite (done) {
        this.form.pageIndex = this.list.length / this.form.limit
        if (this.list.length % this.form.limit) {
          this.statusNoMore()
        } else {
          this.$el.querySelectorAll('.load').forEach(el => {
            el.style.display = 'block'
          })
          // this.getList(done, 0)
        }
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
