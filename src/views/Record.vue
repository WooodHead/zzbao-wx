<template>
  <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
    <group gutter="0">
      <cell is-link class="score-list" v-for="(item, index) in list" :key="index" :link="'/record/' + item.id" @click.native="handleSave(item)">
        <li class="row w">
          <span class="col v-m col-11 t-l">
            <b class="price">-{{item.money / 10}}元</b>
            <i class="score">积分余额：{{item.balance}}分</i>
          </span>
          <span class="col v-m col-13 t-r">
            <i class="score">{{item.createTime}}</i>
            <i :class="'status ' + {'success': item.status === 1, 'error': item.status === 2}">{{item.note}}</i>
          </span>
        </li>
      </cell>
    </group>
  </v-scroll>
</template>
<script>
  import {Cell, dateFormat, Group} from 'vux'
  import {withdrawlog} from '../config'
  import VScroll from '../components/VScroll'
  export default {
    name: 'record',
    head: {
      title: {
        inner: '提现记录',
        separator: ' '
      }
    },
    data () {
      return {
        height: '0px',
        list: [],
        form: {
          userId: '',
          limit: 10,
          pageIndex: 0
        }
      }
    },
    components: {
      Cell,
      dateFormat,
      Group,
      VScroll
    },
    created () {
      this.form.userId = JSON.parse(this.$localStorage.get('userInfo')).userId
      this.getList(() => {}, null)
    },
    methods: {
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
      handleSave (item) {
        this.$localStorage.set('record', JSON.stringify(item))
      },
      onRefresh (done) {
        this.form.pageIndex = 0
        this.statusInit()
        this.getList(done, 1)
      },
      onInfinite (done) {
        if (this.list.length % this.form.limit) {
          this.statusNoMore()
        } else {
          this.$el.querySelectorAll('.load').forEach(el => {
            el.style.display = 'block'
          })
          this.getList(done, 0)
        }
      },
      getList (done, status) {
        const This = this
        this.$http({
          method: 'jsonp',
          url: withdrawlog,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form,
          before: () => {
            if (status) {
              this.list = []
            }
          }
        })
        .then(res => {
          res.body.data.scoreList.forEach(el => {
            This.list.push(el)
          })
          if (res.body.data.scoreList.length < This.form.limit) {
            this.statusNoMore()
          } else {
            this.statusLoad()
          }
          done()
          for (const i in this.list) {
            this.list[i].createTime = dateFormat(this.list[i].createTime)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .score-list{background:#fff;}
  .weui-cell{padding:0.8rem 1rem;}
  .score-list i{display:block;font-style:normal;}
  .score-list .price{font-size:1.4rem;color:#3E3E3E;}
  .score-list .score{font-size:1rem;color:#A0A0A0;}
  .score-list .status{font-size:1rem;color:#333;}
  .status.success{color:#4FBE36;}
  .status.error{color:#EC4308;}
</style>
