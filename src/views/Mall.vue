<template>
  <div class="page gray">
    <swiper class="w" :aspect-ratio="315/712" dots-position="center" auto>
      <swiper-item class="swiper-demo-img" v-for="(item, index) in recommend" :key="index" @click.native="jump(item.target)">
        <img class="w h" v-lazy="item.url"/>
      </swiper-item>
    </swiper>
    <div class="p-1 white sub-line">
      <div class="row w d-line fs-1">
        <router-link :to="'/detail/' + userId" class="col v-m t-c c-6">
          <img class="v-m" style="width:2rem;" v-lazy="'static/img/score.png'" alt=""/>
          <span class="v-m">积分：</span>
          <span class="c-red v-m">{{score}}</span>
        </router-link>
        <router-link :to="'/exchange/' + userId" class="col v-m t-c c-6">
          <img class="v-m " style="width:2rem;" v-lazy="'static/img/jilu.png'" alt=""/>
          <span class="v-m">兑换记录</span>
        </router-link>
      </div>
    </div>
    <div class="grid t-l white mt-5 click top-line sub-line quick">
      <router-link :to="'/mall/0/?init=time'" class="col col-6 t-c">
        <img class="icon" v-lazy="'static/img/index1.png'" alt=""/>
        <b class="block fs-1 c-n">新品上市</b>
      </router-link>
      <router-link :to="'/mall/0?init=price'" class="col col-6 t-c">
        <img class="icon" v-lazy="'static/img/index2.png'" alt=""/>
        <b class="block fs-1 c-n">超值兑换</b>
      </router-link>
      <router-link :to="'/mall/' + item.id" class="col col-6 t-c" v-for="(item, index) in nav" :key="index">
        <img class="icon" v-lazy="item.logo" alt=""/>
        <b class="block fs-1 c-n">{{item.name}}</b>
      </router-link>
      <router-link :to="'/mall/0'" class="col col-6 t-c">
        <img class="icon" v-lazy="'static/img/index8.png'" alt=""/>
        <b class="block fs-1 c-n">全部</b>
      </router-link>
    </div>
    <swiper class="w" :aspect-ratio="83/360" dots-position="center" auto v-if="advert.length > 0">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in advert" :key="index" @click.native="jump(item.target)">
        <img class="w" v-lazy="item.url">
      </swiper-item>
    </swiper>
    <h2 class="title">新品推荐</h2>
    <ul class="grid goods-list">
      <li class="col col-12" v-for="(item, index) in list" :key="index">
        <span class="goods" @click="handleSaveData(item)">
          <span class="cover">
            <img v-lazy="{src: item.listPic, error: 'static/img/err1.png', loading: 'static/img/loading1.gif'}"/>
          </span>
          <b class="name">{{item.name}}</b>
          <span class="c-red">积分<b class="score">{{item.score}}</b></span>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {Swiper, SwiperItem, XImg} from 'vux'
  import {mapGetters, mapMutations} from 'vuex'
  // import {adver} from '../config'
  export default {
    name: 'mall',
    head: {
      title: {
        inner: '积分商城',
        separator: ' '
      }
    },
    data () {
      return {
        score: 0,
        userId: 'null',
        list: [],
        recommend: [],
        advert: [],
        form: {
          type: 0,
          timeOrder: 1,
          priceOrder: 0,
          defaultOrder: 0,
          limit: 10,
          pageIndex: 0
        }
      }
    },
    created () {
      this.getProduct(this)
      if (this.$localStorage.get('logined') === 'true') {
        this.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
      }
    },
    computed: {
      ...mapGetters({
        nav: 'getMallNav'
      })
    },
    methods: {
      // handleUrl (item) {
      //   console.log(item)
      //   switch (item.name) {
      //     case '新品上市':
      //       this.$localStorage.set('sort', 'timeOrder')
      //       return '/mall/' + 0
      //     default:
      //       return '/mall/' + item.id
      //   }
      // },
      // getrecommend () {
      //   this.$http({
      //     method: 'jsonp',
      //     url: adver,
      //     jsonp: 'callback',
      //     jsonpCallback: 'json',
      //     params: {
      //       position: 1
      //     }
      //   })
      //   .then(res => {
      //   })
      // },
      ...mapMutations({
        getProduct: 'getProduct'
      }),
      jump (url) {
        window.location.href = url
      },
      handleSaveData (item) {
        this.$localStorage.set('goods', JSON.stringify(item))
        this.$router.push('/goods/' + item.id)
      }
    },
    components: {
      Swiper,
      SwiperItem,
      XImg
    }
  }
</script>
<style scoped>
.icon{width:3rem;}
.quick{padding:0.5rem 0;}
.quick a{padding:0.5rem 0;line-height:2;}
</style>
