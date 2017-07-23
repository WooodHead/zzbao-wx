<template>
  <div class="page row w h" style="background:#F0F0F0;">
    <div class="col v-m t-c" style="padding:0 2rem;">
      <img src="static/img/welcome.png" style="width:100%;margin-bottom:2rem;" alt="">
      <p style="font-size:1.1rem;color:#454545;margin-bottom:1rem;">请选择对应入口，注册成为至尊惠保会员</p>
      <p style="font-size:1rem;padding:0.2rem 1rem;color:#999;text-align:left;"><span style="display:inline-block;width:1rem;margin-left:-1rem;">◆</span>如果您是业务员，注册后需要等待管理员审核</p>
      <p style="font-size:1rem;padding:0.2rem 1rem;color:#999;text-align:left;"><span style="display:inline-block;width:1rem;margin-left:-1rem;">◆</span>如果您是车主，可以直接通过手机号注册</p>
      <x-button type="warn" action-type="reset" style="border-radius:3rem;padding:0.5rem;margin-top:2rem;" @click.native="jump('/share/register/0')">我是车主</x-button>
      <x-button type="warn" action-type="reset" style="border-radius:3rem;background:#5B72B5;padding:0.5rem;" @click.native="jump('/share/register/1')">我是业务员</x-button>
    </div>
  </div>
</template>
<script>
  import {XButton} from 'vux'
  export default {
    head: {
      title: {
        inner: '推荐注册',
        separator: ' '
      }
    },
    components: {
      XButton
    },
    methods: {
      jump (url) {
        this.$router.push(url)
      }
    }
  }
</script>
