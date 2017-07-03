<template>
  <div v-show="show" class="loading">
    <slot name="icon"></slot> 
    <slot name="text">
      <p>正在加载中……</p>
    </slot>
  </div>  
</template>
<script>
  export default {
    name: 'loading',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style>
.loading{position:fixed;top:50%;left:50%;transform: translate(-50%,-50%);font-size:1.2rem;color:#999;}
</style>
