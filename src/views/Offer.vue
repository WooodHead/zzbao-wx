<template>
  <div class="page h auto">
    <div class="safe-list" v-if="list.length > 0">
      <router-link :to="'/offer/' + item.id + '/' + userId" :class="item.isMarketing ? 'row w rec' : 'row w'" v-for="(item, index) in list" :key="index" @click.native="handleSaveData(item)">
          <span class="col v-m col-7 t-l ptb-10" style="padding-left:1rem;">
            <span class="img">
              <img v-lazy="{src: item.listPic, error: 'static/img/err1.png', loading: 'static/img/loading2.gif'}" alt=""/>
            </span>
          </span>
          <span class="col v-m col-17">
            <b class="name">{{item.name}}</b>
            <i>承保地区：{{item.insureArea}}</i>
            <i>承保车辆：{{item.insureCar}}</i>
          </span>
          <img class="mark" src="static/img/rec.png" alt="">
        </router-link>
    </div>
    <div class="addressNull" v-if="loading">
      <img style="width:3rem;" src="static/img/pageload.svg" alt="">
      <p>正在努力获取保险公司！</p>
    </div>
    <div class="addressNull" v-if="!request">
      <img style="width:6rem;" src="static/img/500.png" alt="">
      <p>服务器故障，请稍后重试！</p>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import {XImg, Loading} from 'vux'
import VScroll from '../components/VScroll'
import {company, timeout} from '../config'
export default {
  name: 'offer',
  head: {
    title: {
      inner: '车险报价',
      separator: ' '
    }
  },
  components: {
    XImg,
    VScroll,
    Loading
  },
  created () {
    this.getOfferList()
    if (this.$localStorage.get('logined') !== 'false') {
      this.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
    }
  },
  methods: {
    getOfferList () {
      this.$http({
        method: 'jsonp',
        url: company,
        jsonp: 'callback',
        jsonpCallback: 'json',
        _timeout: timeout,
        timeout: timeout,
        onTimeout: request => {
          // this.$router.push('/net')
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
          this.loading = true
        }
      })
      .then(res => {
        console.log(res)
        this.loading = false
        this.list = res.body.data.companyList
      })
    },
    handleSaveData (item) {
      this.$localStorage.set('orderCompany', JSON.stringify({
        companyId: item.id,
        banner: item.bigPic,
        companyName: item.name
      })) // 存储订单公司信息
    },
    ...mapMutations({
      showLoading: 'updateLoadingStatus'
    })
  },
  data () {
    return {
      list: [],
      userId: 'null',
      loading: false,
      timeout: timeout,
      request: true
    }
  }
}
</script>
<style>
.addressNull{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:1rem;color:#999;text-align:center;}
.addressNull p{margin-top:1rem;}
</style>
