<template>
  <div class="page has-nav">
    <!--<view-box ref="viewBox">-->
      <router-view name="tab" class="content"></router-view>
      <tabbar>
        <tabbar-item :selected="page === 'offer'" link="/offer">
          <img slot="icon" src="static/img/nav1.png"/>
          <img slot="icon-active" src="static/img/nav1-active.png"/>
          <span slot="label">车险报价</span>
        </tabbar-item>
        <tabbar-item :selected="page === 'mall'" link="/mall">
          <img slot="icon" src="static/img/nav2.png"/>
          <img slot="icon-active" src="static/img/nav2-active.png"/>
          <span slot="label">积分商城</span>
        </tabbar-item>
        <tabbar-item :selected="page === 'personer'" link="/personer">
          <img slot="icon" src="static/img/nav3.png"/>
          <img slot="icon-active" src="static/img/nav3-active.png"/>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    <!--</view-box>-->
  </div>
</template>
<script>
import {Tabbar, TabbarItem, Group, Cell} from 'vux'
export default {
  name: 'tabView',
  data () {
    return {
      page: 'offer'
    }
  },
  created () {
    this.page = this.$route.path.split('/')[1]
  },
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
}
</script>
