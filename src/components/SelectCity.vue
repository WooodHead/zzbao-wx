<template>
  <div>
    <group gutter="0">
      <cell :title="title" is-link class="address" @click.native="showPop">
      </cell>
    </group>
    <popup v-model="popShow" position="bottom" height="60%" class="bg-f select">
      <tab active-color='#EB3D00' class="select-tab" v-model="index">
        <tab-item v-for="(item, index) in area" :key="index" @click.native="_tabClick(index)">{{item.name}}</tab-item>
      </tab>
      <swiper v-model="index" class="select-list" :loop="false" :show-dots="false" height="100%" :threshold="100">
        <swiper-item v-for="(item, index) in area" :key="index">
          <ul class="list" id="list">
            <li v-for="(item, index) in areaList" :key="index" @click="_select(item)">{{item.text}}</li>
          </ul>
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
      this._fetch(0, 0, 0)
    },
    _tabClick (index) {
      this.index = index
    },
    _select (item) {
      if (this.index < this.area.length - 1) {
        this._fetch(item.id, this.index, 1)
      }
    },
    _fetch (id, swiper, status) {
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
          this.index = swiper
        }
      })
      .then(res => {
        console.log(res, swiper)
        if (status && swiper < this.area.length - 1) {
          this.index = swiper + 1
        }
        this.areaList = res.body.data.areaList
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
