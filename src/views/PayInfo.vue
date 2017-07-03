<template>
  <div class="page gray">
    <group gutter="0">
      <cell title="投保公司" value="太平洋保险"></cell>
      <cell title="保单信息" value="保单详情" is-link :link="'/policy/' + id"></cell>
      <cell title="商业险" value="￥2837.50"></cell>
      <cell title="交强险" value="￥760.00"></cell>
      <cell title="车船税" value="￥360.00"></cell>
      <cell>
        <p slot="value">应付总额：<span class="num c-red">￥4832.00</span></p>
      </cell>
    </group>
    <group gutter="10px">
      <cell title="订单号：" value="faw452452145214" value-align="left"></cell>
      <cell title="支付方式：" value="支付宝" value-align="left"></cell>
      <cell title="支付金额：" value="￥2545.00" value-align="left"></cell>
    </group>
  </div>
</template>
<script>
  import {Group, Cell} from 'vux'
  export default {
    name: 'payInfo',
    components: {
      Group,
      Cell
    }
  }
</script>
