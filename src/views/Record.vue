<template>
  <div>
    <group gutter="0">
      <cell is-link class="score-list" v-for="(item, index) in list" :key="index" @click.native="handleSave(item)">
        <li class="row w">
          <span class="col v-m col-11 t-l">
            <b class="price">-{{item.money / 10}}元</b>
            <i class="score">积分余额：{{item.balance}}分</i>
          </span>
          <span class="col v-m col-13 t-r">
            <i class="score">{{item.createTime}}</i>
            <i :class="'status ' + showCss(item.status)">{{showText(item.status)}}</i>
          </span>
        </li>
      </cell>
    </group>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
      <p slot="no-results"></p>
      <p slot="no-more">没有更多！</p>
      <div slot="spinner" style="padding:1rem;">
        <img style="width:2rem;" class="v-m" src="static/img/331.svg" alt="">
        <span class="v-m" style="font-size:1rem;color:#666;">加载中</span>
      </div>
    </infinite-loading>
    <div class="row w h tip" v-if="noData">
      <none>
        <img slot="img" src="static/img/sorry.png" alt="">
        <p slot="text">没有提现记录哦！</p>
      </none>
    </div>
  </div>
</template>
<script>
  import {Cell, dateFormat, Group} from 'vux'
  import {withdrawlog} from '../config'
  import InfiniteLoading from 'vue-infinite-loading'
  import none from '@/components/None'
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
        noData: false,
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
      InfiniteLoading,
      none
    },
    created () {
      this.setTitle('提现记录')
      this.form.userId = this.$route.query.userId
    },
    methods: {
      showCss (status) {
        switch (status) {
          case 0:
            return ''
          case 1:
            return 'success'
          case 2:
            return 'error'
        }
      },
      showText (status) {
        switch (status) {
          case 0:
            return '等待审核'
          case 1:
            return '审核通过'
          case 2:
            return '审核失败'
        }
      },
      setTitle (title) {
        if (this.$route.query.platform === 'app') {
          jsToApp.setTitle(title)
        }
      },
      handleSave (item) {
        this.$localStorage.set('record', JSON.stringify(item))
        this.setTitle('提现详情')
        console.log(item)
        this.$router.push('/record/' + item.id)
      },
      onInfinite (done) {
        this.getList(0)
      },
      getList (status) {
        const This = this
        this.$http({
          method: 'jsonp',
          url: withdrawlog,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: this.form,
          before: () => {
            this.form.pageIndex = Math.ceil(this.list.length / this.form.limit)
            console.log('请求第' + this.form.pageIndex + '页')
            if (status) {
              this.list = []
            }
          }
        })
        .then(res => {
          if (res.body.data.scoreList.length) {
            this.list = this.list.concat(res.body.data.scoreList)
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
            if (res.body.data.scoreList.length < this.form.limit) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
            }
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
            if (!this.list.length) {
              this.noData = true
            }
          }
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
