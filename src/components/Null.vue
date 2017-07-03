<template>
  <div class="none">
    <slot name="icon"></slot>
    <slot name="title"></slot>
  </div>
</template>
<style>
.none{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;}
.none .iconfont{font-size:2rem;color:#999;}
.none .text{font-size:1rem;color:#999;}
</style>
