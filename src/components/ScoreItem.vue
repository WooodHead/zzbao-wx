<template>
  <div class="row w">
    <router-link to="/detail" class="col v-m col-12 t-c">
      <h2 class="num">{{data.cumulative || 0}}</h2>
      <p class="text">累计积分收入（分）</p>
    </router-link>
    <router-link to="/balanceDetail" class="col v-m col-12 t-c">
      <h2 class="num">{{data.balance || 0}}</h2>
      <p class="text">积分余额（分）</p>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: 'scoreItem',
    props: {
      data: {
        type: Object,
        default: () => {
          return null
        }
      }
    }
  }
</script>
<style scoped>
.default .num{color:#444;font-size:1.6rem;}
.default .text{color:#999;text-indent:1rem;}
.light .num{font-size:1.6rem;color:#fff;}
.light .text{font-size:1rem;color:rgba(255,255,255,0.8);text-indent:1rem;}
</style>
