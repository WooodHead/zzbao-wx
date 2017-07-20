<template>
  <div>
    <group gutter="0">
      <cell :title="title" is-link class="address" @click.native="showPop">
        <p slot="value">{{index}}</p>
      </cell>
    </group>
    <popup v-model="popShow" position="bottom" height="60%" class="bg-f select">
      <tab active-color='#EB3D00' class="select-tab" v-model="index">
        <tab-item v-for="(item, index) in area" :key="index" @click.native="_tabClick(index)">{{item.name}}</tab-item>
      </tab>
      <swiper v-model="index" class="select-list" :loop="false" :show-dots="false" height="100%" :threshold="100" @on-index-change="_swiperChange">
        <swiper-item v-for="(item, idx) in area" :key="idx">
          <ul class="list" id="list" v-if="areaList.length > 0">
            <li v-for="(item, index) in areaList" :key="index" @click="_select(item, idx)">{{item.text}}</li>
          </ul>
          <div class="addressNull" v-if="loading">
            <img style="width:3rem;" src="static/img/pageload.svg" alt="">
            <p>数据加载中！</p>
          </div>
          <div class="addressNull" v-if="areaList.length === 0 && !loading">
            <img src="static/img/address.svg" alt="">
            <p>请先选择上一级地区</p>
          </div>
        </swiper-item>
      </swiper>
      <div class="row w pd-10 select-btn">
        <div class="col v-m w-30">
          <x-button type="primary">取消</x-button>
        </div>
        <div class="col v-m w-70">
          <x-button type="warn">确定</x-button>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import {Group, Popup, Tab, TabItem, XButton, Swiper, Cell, SwiperItem, XSwitch} from 'vux'
import {area} from '../config'
export default {
  name: 'city',
  props: {
    title: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      popShow: false,
      loading: false,
      index: 0,
      area: [{
        name: '省',
        id: 0
      }, {
        name: '市',
        id: 0
      }, {
        name: '区',
        id: 0
      }],
      areaList: []
    }
  },
  components: {
    Group,
    Popup,
    Cell,
    Tab,
    TabItem,
    XButton,
    Swiper,
    SwiperItem,
    XSwitch
  },
  created () {
  },
  methods: {
    showPop () {
      this.popShow = true
      this._fetch(0)
    },
    _swiperChange (index) {
      if (index > 0) {
        if (this.area[index - 1].id === 0) {
          this.areaList = []
          console.log('没有上一级')
        } else {
          this._fetch(this.area[index - 1].id)
        }
      } else {
        this._fetch(0)
      }
      this._clear(index)
    },
    _tabClick (index) {
    },
    _select (item, index) {
      this.area[this.index].name = item.text
      this.area[this.index].id = item.id
      if (index < this.area.length - 1) {
        this.index = index + 1
        this._fetch(item.id)
      } else {
        console.log('区')
      }
      // if (this.index < this.area.length - 1) {
      //   this._fetch(item.id, this.index, 1)
      // } else {
      //   console.log(item.text, item.id)
      // }
    },
    _clear (index) {
      const text = ['省', '市', '区']
      for (let i = index + 1; i < this.area.length; i++) {
        this.area[i].name = text[i]
        this.area[i].id = 0
      }
    },
    _setData () {},
    _fetch (id) {
      this.$http({
        method: 'jsonp',
        url: area,
        jsonp: 'callback',
        jsonpCallback: 'json',
        params: {
          id: id
        },
        before: () => {
          this.areaList = []
          this.loading = true
        }
      })
      .then(res => {
        this.areaList = res.body.data.areaList
        this.loading = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addressNull{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:1rem;color:#999;text-align:center;}
.addressNull p{margin-top:1rem;}
.row{display:table;}
.col{display:table-cell;}.v-m{vertical-align:middle;}
.w-30{width:30%;}.w-70{width:70%;}.w{width:100%;}.bg-f{background:#fff;}

.select{padding-top:44px;padding-bottom:60px;box-sizing:border-box;overflow:hidden;}
.select-tab{margin-top:-44px;}
.select-tab .vux-tab-item{font-size:1.2rem;}
.select-list{height:100%;}
.select-btn{height:60px;}
.select-btn button{display:inline-block;font-size:14px;}
.select-btn .col:first-child{padding:0 5px 0 10px;}
.select-btn .col:last-child{padding:0 10px 0 5px;}
.select-btn .col:first-child button{background:#ddd;color:#333;}

.list{padding:0 0 0 1.5rem;}
.list li{font-size:1.2rem;color:#333;padding:15px 10px 15px 0;border-bottom:1px solid #e9e9e9;}
</style>
<style>
.select-text{font-size:14px;}
.vux-slider > .vux-swiper > .vux-swiper-item{overflow-y:auto;}
.vux-tab.select-tab .vux-tab-item{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
</style>
