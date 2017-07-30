<template>
  <div class="page gray row w">
    <div class="col v-m t-c">
      <img src="static/img/waiting.svg" style="width:10rem;margin-bottom:1rem;margin-top:-4rem;" alt="">
      <p style="font-size:1.1rem;color:#666;">您的账号正在等待管理员审核!</p>
    </div>
  </div>
</template>
<script>
  export default {
    head: {
      title: {
        inner: '等待审核！',
        separator: ' '
      }
    }
  }
</script>
