<template>
  <div class='page gray fix-banner has-double-btn'>
    <div class="banner">
      <ul class="row w">
        <li class="col v-m">
          我的钱包
        </li>
        <li class="col v-m t-r">
          <router-link :to='"/record?userId=" + userId' @click="setTitle('提现记录')"><span style="vertical-align:middle">提现记录</span><span class="iconfont icon-right" style="font-size:1.2rem;vertical-align:middle;padding:0 0 0 0.5rem"></span></router-link>
        </li>
      </ul>
      <div class="row w light">
        <router-link :to="'/detail/' + userId" class="col v-m col-12 t-c" @click.native="handleSave(data.balance)">
          <h2 class="num">{{data.cumulative || 0}}</h2>
          <p class="text">累计积分收入（分）</p>
        </router-link>
        <router-link :to="'/balanceDetail/' + userId" class="col v-m col-12 t-c" @click.native="handleSave(data.balance)">
          <h2 class="num">{{data.balance || 0}}</h2>
          <p class="text">积分余额（分）</p>
        </router-link>
      </div>
    </div>
    <div class="h auto">
      <ul class='row w white'>
        <li class='col v-m col-10 t-c'>
          <div class='echarts'>
            <IEcharts :option='bar' :loading='loading' @ready='onReady'></IEcharts>
          </div>
        </li>
        <li class='col v-m col-14'>
          <p class="legend yellow">已提现的积分：{{use}}</p>
          <p class="legend blue">可提现的积分：{{balance}}</p>
        </li>
      </ul>
    </div>
    <div class="btn-area row w" style="border:none;">
      <div class="col v-m">
        <x-button type="warn" @click.native="handleWithDraw(balance)">立即提现</x-button>
        <x-button plain type="primary" class="custom-primary-red" style="margin-top:10px;" @click.native="handleDonation(balance)">积分转赠</x-button>
      </div>
    </div>
  </div>
</template>
<script>
  import IEcharts from 'vue-echarts-v3/src/full.vue'
  import {XButton} from 'vux'
  import {wallet} from '../config'
  import {mapGetters} from 'vuex'
  export default {
    name: 'wallet',
    head: {
      title: {
        inner: '我的钱包',
        separator: ' '
      }
    },
    components: {
      IEcharts,
      XButton
    },
    data () {
      return {
        loading: true,
        balance: 0,
        cumulative: 0,
        withdraw: 0,
        use: 0,
        data: [],
        userId: '',
        bar: {
          series: [{
            name: '积分',
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [0, 10],
            minAngle: 10,
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.6)'
              }
            }
          }],
          color: ['#FDC800', '#43B5E4']
        }
      }
    },
    created () {
      if (this.$route.params.userId !== 'null') {
        this.userId = this.$route.params.userId
        this.$http({
          method: 'jsonp',
          url: wallet,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: {
            userId: this.userId
          }
        })
        .then(res => {
          this.data = res.body.data.wallet
          this.balance = res.body.data.wallet.balance
          this.cumulative = res.body.data.wallet.cumulative
          this.use = res.body.data.wallet.withdraw
          this.bar.series[0].data = [{
            value: this.use,
            name: '已提现的的积分'
          }, {
            value: this.balance,
            name: '可提现的积分'
          }]
        })
      } else {
        this.$router.replace('/login')
      }
    },
    computed: {
      ...mapGetters({
        checkAuthor: 'checkAuthor'
      })
    },
    methods: {
      appBack(){
        alert('app back')
      },
      setTitle (title) {
        if (this.$route.query.platform === 'app') {
          jsToApp.setTitle(title)
        }
      },
      onReady (instance) {
        this.loading = !this.loading
      },
      handleWithDraw (balance) {
        this.$localStorage.set('balance', balance)
        this.jump('/cash?userId=' + this.userId)
        // if (this.$route.query.platform === 'app') {
        //   jsToApp.setTitle('积分提现')
        // }
      },
      handleDonation (balance) {
        this.$localStorage.set('balance', balance)
        this.jump('/donation?userId=' + this.userId)
        // if (this.$route.query.platform === 'app') {
        //   jsToApp.setTitle('积分转赠')
        // }
      },
      jump (url, banlance) {
        this.$router.push(url)
      },
      handleSave (data) {
        this.$localStorage.set('balance', data)
      }
    }
  }
</script>
<style>
.echarts{width:100%;height:20vh;}
.fix-banner{padding-top:24vh;}
.has-double-btn{padding-bottom:20vh;}
.has-double-btn .btn-area{height:20vh;}
.fix-banner .banner{background-color:#FFA500;height:24vh;margin-top:-24vh;}
.banner .col{padding:1rem;font-size:1.2rem;color:#fff;}
.banner a{color:#fff;vertical-align:middle;}
.banner a span{display:inline-block;}
.banner a span:before{position:relative;top:-2px;}
.legend{font-size:1rem;line-height:2;color:#444;position:relative;}
.legend:before{content:"";display:inline-block;width:0.8rem;height:0.8rem;border-radius:50%;margin-right:0.5rem;}
.legend.yellow:before{background-color:#FDC800;}
.legend.blue:before{background-color:#43B5E4;}
.light .num{font-size:1.6rem;color:#fff;}
.light .text{font-size:1rem;color:rgba(255,255,255,0.8);text-indent:1rem;}
.light .col:first-child:after{content:"";display:inline-block;width:1px;height:3rem;background:#fff;position:absolute;top:50%;right:0;transform:translateY(-50%);}
</style>
