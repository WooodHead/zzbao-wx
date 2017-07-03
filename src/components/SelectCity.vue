<template>
  <div>
    <group gutter="0">
      <cell :title="title" is-link @click.native="handleOpen" class="address">
        <p><span v-if="!selected">{{value}}<span v-if="!value">请选择</span></span><span v-if="selected">{{selected}}</span></p>
      </cell>
    </group>
    <div v-transfer-dom>
      <popup v-model="show" position="bottom" height="60%" class="bg-f select">
        <tab active-color='#EB3D00' v-model="index" class="select-tab">
          <tab-item :selected="index === active" v-for="(item, index) in tab" :key="index" @click.native="handleClick(index)">{{item.text}}</tab-item>
        </tab>
        <swiper v-model="active" class="select-list" :loop="false" :show-dots="false" height="100%" :threshold="100" @on-index-change="handleChange">
          <swiper-item v-for="(item, idx) in tab" :key="idx">
            <ul class="list" id="list">
              <li v-for="(item, index) in areaList" :key="index" @click="handleSwiper(item.id, item.text, idx)">{{item.text}}</li>
            </ul>
          </swiper-item>
        </swiper>
        <div class="row w pd-10 select-btn">
          <div class="col v-m w-30">
            <x-button @click.native="show = false" type="primary">取消</x-button>
          </div>
          <div class="col v-m w-70">
            <x-button @click.native="submit()" type="warn">确定</x-button>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {Group, Popup, Tab, TabItem, XButton, Swiper, Cell, SwiperItem, TransferDom, XSwitch} from 'vux'
import {area} from '../config'
export default {
  name: 'city',
  data () {
    return {
      tab: [{
        text: '省',
        id: 0
      }, {
        text: '市',
        id: 0
      }, {
        text: '区',
        id: 0
      }],
      selected: '',
      areaId: [],
      show: false,
      showName: '',
      index: 0,
      active: 0,
      areaList: []
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: '请选择'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    TransferDom
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
  methods: {
    submit () {
      let area = ''
      this.tab.forEach(el => {
        if (el.id !== 0) {
          area += el.text
        }
      })
      this.selected = area
      this.show = false
      this.init()
    },
    handleSwiper (areaId, text, index) {
      this.tab[index] = {
        id: areaId,
        text: text
      }
      this.areaId[index] = areaId
      if (index < 2) {
        this.index = this.active = index + 1
      } else {
        // let id = []
        // this.tab.forEach(el => {
        //   id.push(el.id)
        // })
        this.setAreaId(areaId)
        this.index = this.active = index
        let area = ''
        this.tab.forEach(el => {
          area += el.text
        })
        this.selected = area
        this.show = false
        this.init()
      }
      this.getData(areaId, text, index)
    },
    handleClick (index) {
      this.index = this.active = index
    },
    handleChange (index) {
      this.index = this.active = index
      if (index === 0) {
        this.getData(0, '请选择', 0)
      } else {
        this.getData(this.tab[index - 1].id, this.tab[index - 1].text, index)
      }
    },
    getData (areaId, text, index) {
      this.$http({
        method: 'jsonp',
        url: area,
        jsonp: 'callback',
        jsonpCallback: 'json',
        params: {
          id: areaId
        }
      })
      .then(res => {
        this.areaList = res.body.data.areaList
      })
    },
    handleOpen () {
      if (!this.readonly) {
        this.show = true
        this.getData(this.tab[0].id, this.tab[0].text, 0)
      }
    },
    init () {
      this.index = this.active = 0
      this.tab = [{
        text: '省',
        id: 0
      }, {
        text: '市',
        id: 0
      }, {
        text: '区',
        id: 0
      }]
    },
    ...mapMutations({
      setAreaId: 'getInsuranceArea'
    })
  },
  created () {
    this.showName = this.value
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row{display:table;}
.col{display:table-cell;}.v-m{vertical-align:middle;}
.w-30{width:30%;}.w-70{width:70%;}.w{width:100%;}.bg-f{background:#fff;}

.select{padding-top:44px;padding-bottom:50px;box-sizing:border-box;overflow:hidden;}
.select-tab{margin-top:-44px;}
.select-list{height:100%;}
.select-btn{margin:10px 0;}
.select-btn button{display:inline-block;font-size:14px;}
.select-btn .col:first-child{padding:0 5px 0 10px;}
.select-btn .col:last-child{padding:0 10px 0 5px;}
.select-btn .col:first-child button{background:#ddd;color:#333;}

.list{padding:0 10px;}
.list li{font-size:14px;color:#333;padding:15px 10px;border-bottom:1px solid #e9e9e9;}
</style>
<style>
.select-text{font-size:14px;}
.vux-slider > .vux-swiper > .vux-swiper-item{overflow-y:auto;}
.vux-tab.select-tab .vux-tab-item{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
</style>
