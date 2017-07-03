<template>
  <div id="app" class="page">
    <loading v-model="pageLoading">
    </loading>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {Loading} from 'vux'
export default {
  name: 'app',
  components: {
    Loading
  },
  mounted () {
    // let useragent = navigator.userAgent
    // if (useragent.match(/MicroMessenger/i) !== 'MicroMessenger') {
    //   console.log('只能用微信打开')
    //   this.$router.replace('/wrong')
    // }
  },
  created () {
    this.getAuthorInfo(this) // 获取用户登录信息
  },
  computed: {
    ...mapGetters({
      pageLoading: 'pageLoading',
      user: 'getUserInfo'
    })
  },
  methods: {
    ...mapMutations({
      getAuthorInfo: 'getAuthorInfo'
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/css/style.less';
</style>
<style>
@import './assets/fonts/Capsuula.css';
@import './assets/css/style.css';
</style>
