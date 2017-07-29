<template>
  <div style="padding:0 1rem;overflow:auto;height:100%;">
    <h1 style="font-size:1.4rem;color:#424242;text-align:center;padding:1rem 0 0.5rem 0">{{article.title}}</h1>
    <p style="font-size:1.2rem;color:#A5A5A5;padding:0 2rem 1rem 2rem;text-align:center;border-bottom:1px solid #EEEEEE;margin-bottom:1rem;"><img style="width:2rem;height:2rem;vertical-align:middle" v-if="!article.userPic" src="static/img/default-face.png" alt=""><img style="width:2rem;height:2rem;vertical-align:middle" v-if="article.userPic" :src="article.userPic" alt=""><span style="margin-right:2em;">{{article.userName}}</span>发布于{{article.create_time}}</p>
    <p style="font-size:1rem;color:#535353;line-height:1.6;text-indent:2em;" v-html="article.content"></p>
    <img v-for="(item, index) in article.image" style="margin-top:0.5rem;max-width:100%;" :src="item" alt=""/>
    <div class="t-c" style="padding:1rem;">
      <qrcode Type="url" :value=url :options="{ size: 200 }"></qrcode>
    </div>
  </div>
</template>
<script>
  import VueQrcode from 'vue-qrcode'
  import {article, server} from '../config'
  export default {
    data () {
      return {
        articleId: 0,
        article: {},
        server: server,
        title: '',
        url: ''
      }
    },
    components: {
      'qrcode': VueQrcode
    },
    mounted () {
      this.url = document.location.href
      this.articleId = this.$route.params.articleId
      this.$http({
        method: 'jsonp',
        url: article,
        jsonp: 'callback',
        jsonpCallback: 'json',
        params: {
          articleId: this.articleId
        }
      })
      .then(res => {
        console.log(res)
        this.article = res.body.data.article
        this.article.image = this.article.image.split(',')
        document.title = this.article.title
      })
    }
  }
</script>
