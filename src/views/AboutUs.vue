<template>
  <div class="page gray about">
    <div class="row w">
      <div class="col v-m t-c logo">
        <img src="static/img/logo.png" alt="">
      </div>
    </div>
    <group gutter="0px" style="margin-bottom:20px;">
      <cell title="官方网站：" value="http://www.zhizunbao.com" value-align="left"></cell>
      <cell title="新浪微博：" value="zhizunbao002" value-align="left"></cell>
      <cell title="腾讯微博：" value="zhizunbao002" value-align="left"></cell>
      <cell title="微信账号：" value="至尊宝" value-align="left"></cell>
    </group>
    <p class="text">联系我们</p>
    <p class="text">客服电话：400 2583 253</p>
    <p class="text">客服邮箱：service@zhizunbao.com</p>
    <p class="text">客服QQ：1854157</p>
  </div>
</template>
<script>
  import {Group, Cell} from 'vux'
  export default {
    name: 'aboutUs',
    head: {
      title: {
        inner: '关于我们'
      }
    },
    components: {
      Group,
      Cell
    }
  }
</script>
<style scoped>
.about .logo{padding:4rem 0;}
.text{padding:0 1rem;font-size:1.2rem;color:#999;margin:0;line-height:2;}
.about .weui-cell{font-size:1.2rem;}
.about .weui-cell__ft{color:#333;}
</style>
