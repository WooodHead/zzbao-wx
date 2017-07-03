<template>
  <Cell>
    <div class="checkbox circle left" slot="icon">
      <input type="checkbox" v-model="data.name">
      <span class="iconfont icon-dot"></span>
      <label for="">{{data.text}}</label>
    </div>
    <div class="form select" slot="title" v-if="data.value">
      <select>
        <option value="50万" v-for="(item, index) in data.value">{{item}}</option>
      </select>
    </div>
    <div class="checkbox circle right" slot="value" v-if="data.regardless">
      <input type="checkbox" checked v-model="data.regardless">
      <span class="iconfont icon-dot"></span>
      <label for="">不计免赔</label>
    </div>
  </Cell>
</template>
<script>
  import {Cell} from 'vux'
  export default {
    name: 'selectItem',
    components: {
      Cell
    },
    props: {
      data: {
        type: Object,
        default: {}
      }
    }
  }
</script>

