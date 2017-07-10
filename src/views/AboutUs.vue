<template>
  <div class="page gray about">
    <div class="row w">
      <div class="col v-m t-c logo">
        <img src="static/img/logo.png" alt="" style="width:12rem;">
      </div>
    </div>
    <group gutter="0px" style="margin-bottom:20px;">
      <cell title="官方网站：" value="http://www.zhizunbao.com" value-align="left"></cell>
      <cell title="新浪微博：" value="至尊惠保" value-align="left"></cell>
      <cell title="微信账号：" value="至尊惠保微信网" value-align="left"></cell>
    </group>
    <p class="text">联系我们</p>
    <p class="text">客服电话：4006 128 070</p>
    <p class="text">客服邮箱：zhongyunhui8070@163.com</p>
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
