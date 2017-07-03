<template>
  <div class="page gray">
    <group class="question" gutter="0">
      <collapse :selected="false" v-for="(item, index) in list" :key="index">
        <h2 slot="collapse-header">{{item.title}}</h2>
        <p slot="collapse-body">{{item.content}}</p>
      </collapse>
    </group>
  </div>
</template>
<script>
  import {Group, Cell} from 'vux'
  import {question} from '../config'
  import Collapse from 'vue-collapse'
  export default {
    name: 'question',
    head: {
      title: {
        inner: '常见问题'
      }
    },
    components: {
      Group,
      Cell,
      Collapse
    },
    data () {
      return {
        list: [],
        show: [],
        form: {
          limit: 10,
          pageIndex: 0
        }
      }
    },
    created () {
      this.$http({
        method: 'jsonp',
        url: question,
        jsonp: 'callback',
        jsonpCallback: 'json',
        params: this.form
      })
      .then(res => {
        this.list = res.body.data.qaList
        console.log(this.list)
      })
    },
    methods: {
    }
  }
</script>
<style>
.question h2{font-size:1.2rem;color:#2b2b2b;}
.question .collapse .collapse-header::before{left:auto;right:1rem;top:1.2rem;}
.question .collapse .collapse-header{padding:1rem 2rem 1rem 1rem;background:#fff;border-bottom:1px solid #E9E9E9;}
.question .collapse .collapse-content-box{padding:1rem;font-size:1.1rem;color:#787878;background:#F7F7F7;line-height:1.8;}
.question .weui-cells:after{display:none;}
.collapse{margin-bottom:0 !important;}
</style>
