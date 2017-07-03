<template>
  <div class="page h auto">
    <div class="safe-list">
      <router-link :to="'/offer/' + item.id + '/' + userId" :class="item.recommend ? 'row w rec' : 'row w'" v-for="(item, index) in list" :key="index" @click.native="handleSaveData(item)">
          <span class="col v-m col-8 t-c ptb-10">
            <span class="img">
              <img v-lazy="{src: item.listPic, error: 'static/img/err1.png', loading: 'static/img/loading2.gif'}" alt=""/>
            </span>
          </span>
          <span class="col v-m col-16">
            <b class="name">{{item.name}}</b>
            <i>承保地区：{{item.insureArea}}</i>
            <i>承保车辆：{{item.insureCar}}</i>
          </span>
        </router-link>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import {XImg, Loading} from 'vux'
import VScroll from '../components/VScroll'
import {company} from '../config'
export default {
  name: 'offer',
  head: {
    title: {
      inner: '车险报价'
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
        before: () => {
        }
      })
      .then(res => {
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
      userId: 'null'
    }
  }
}
</script>
