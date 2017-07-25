<template>
  <div>
    <group gutter="0">
      <cell :title="title" is-link class="address" @click.native="showPop">
        <p><span v-if="!select">{{value}}<span v-if="!value">请选择</span></span><span v-if="select">{{select}}</span></p>
      </cell>
    </group>
    <div v-transfer-dom>
      <popup v-model="popShow" position="bottom" height="60%" class="bg-f select">
        <tab active-color='#EB3D00' class="select-tab" v-model="index">
          <tab-item v-for="(item, index) in area" :key="index" @click.native="_tabClick(index)">{{item.name}}</tab-item>
        </tab>
        <swiper v-model="index" class="select-list" :loop="false" :show-dots="false" height="100%" :threshold="100" @on-index-change="_swiperChange">
          <swiper-item v-for="(item, idx) in area" :key="idx">
            <ul class="list" id="list" v-if="areaList.length > 0">
              <li v-for="(item, index) in areaList" :id="item.id" :key="item.id" @click="_select(item, idx, index)" :class="current[idx] === index ? 'active' : ''">
                <span class="col col-12 v-m">{{item.text}}</span>
                <span class="col col-12 v-m" v-if="rate">
                  <b>商业保险费：</b>
                  <b>交强保险费：</b>
                </span>
              </li>
            </ul>
            <div class="addressNull" v-if="loading">
              <img style="width:3rem;" src="static/img/pageload.svg" alt="">
              <p>正在努力的获取地址信息！</p>
            </div>
            <div class="addressNull" v-if="areaList.length === 0 && !loading">
              <img src="static/img/address.svg" alt="">
              <p>请先选择上一级地区</p>
            </div>
          </swiper-item>
        </swiper>
        <div class="row w pd-10 select-btn">
          <div class="col v-m w-30">
            <x-button type="primary" @click.native="_cancel">取消</x-button>
          </div>
          <div class="col v-m w-70">
            <x-button type="warn" @click.native="_setData">确定</x-button>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import {Group, Popup, Tab, TabItem, XButton, Swiper, Cell, SwiperItem, XSwitch, TransferDom} from 'vux'
import {area} from '../config'
import {mapMutations} from 'vuex'
import {car_city} from '../config/car_city'
export default {
  name: 'city',
  props: {
    title: {
      type: String,
      default: '请选择'
    },
    value: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    rate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      popShow: false,
      loading: false,
      current: [null, null, null], // 选中的
      finish: false,
      index: 0,
      select: '',
      car_city: car_city,
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
  directives: {
    TransferDom
  },
  created () {
  },
  methods: {
    showPop () {
      if (!this.readonly) {
        this.popShow = true
        this.select = ''
        this._fetch(0)
      }
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
    _select (item, index, row) {
      console.log(item)
      this.area[this.index].name = item.text
      this.area[this.index].id = item.id
      this.current[index] = row
      if (index < this.area.length - 1) {
        this.index = index + 1
        this._fetch(item.id)
        if (index === 0) {
          this.car_city.forEach(el => {
            if (el.id === item.id) {
              this.setCar_city(el.car)
            }
          })
        }
      } else {
        console.log('区')
      }
    },
    _clear (index) {
      const text = ['省', '市', '区']
      for (let i = index + 1; i < this.area.length; i++) {
        this.area[i].name = text[i]
        this.area[i].id = 0
        this.current[i] = null
      }
    },
    _setData () {
      this.current.forEach(el => {
        if (el === null) {
          this.finish = false
        } else {
          this.finish = true
        }
      })
      if (this.finish) {
        this.setAreaId(this.area[this.area.length - 1].id)
        this.area.forEach(el => {
          this.select += el.name
        })
        this._cancel()
      } else {
        this.$vux.toast.show({
          type: 'text',
          width: '15em',
          position: 'bottom',
          text: '请选择完整的地区！',
          time: '1000'
        })
      }
    },
    _cancel () {
      this.popShow = false
      this._clear(-1)
      this.index = 0
      this.current = [null, null, null]
    },
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
        console.log(res.body.data)
      })
    },
    ...mapMutations({
      setAreaId: 'getInsuranceArea',
      setCar_city: 'setCar_city'
    })
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
.list li{font-size:1.2rem;color:#333;padding:15px 10px 15px 0;border-bottom:1px solid #e9e9e9;display:table;width:100%;}
.list li b{display:inline-block;width:100%;}
.list .active{color:#EB3D00;}
</style>
<style>
.select-text{font-size:14px;}
.vux-slider > .vux-swiper > .vux-swiper-item{overflow-y:auto;}
.vux-tab.select-tab .vux-tab-item{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
</style>
