<template>
  <div class="page row w gray">
    <div class="col v-m t-c">
      <img v-lazy="'static/img/wechat.svg'" alt="">
      <p>抱歉，当前网站只能在微信中打开！</p>
      <a href="weixin://" class="btn btn-danger">打开微信</a>
    </div>
  </div>  
</template>
<style scoped>
.page img{width:6rem;margin-bottom:0rem;}
.page p{font-size:1.1rem;color:#999;}
.btn{padding:0.5rem 2rem;margin-top:2rem;}
</style>
