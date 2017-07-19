<template>
  <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
    <slot name="img"></slot>
    <p style="font-size:1rem;color:#999;text-indent:1rem;margin-top:1rem;">
      <slot name="text"></slot>
    </p>
  </div>
</template>
<style scoped>
img{width:6rem;}
</style>

