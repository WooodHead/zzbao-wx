<template>
  <div style="position:fixed;top:44px;left:0;right:0;bottom:0;background:#f7f7f7;z-index:10;">
    <div class="none">
      <slot name="icon"></slot>
      <slot name="title"></slot>
    </div>
  </div>
</template>
<style>
.none{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;}
.none .iconfont{font-size:3rem;color:#999;}
.none .text{font-size:1rem;color:#999;}
</style>
