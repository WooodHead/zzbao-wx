import {product, productType, adver, wallet} from '../../config'
const state = {
  mallNav: [],
  productList: []
}
const getters = {
  getMallNav (state) {
    return state.mallNav
  },
  getProductList (state) {
    return state.productList
  }
}
const mutations = {
  getProduct (state, This) {
    This.$http({
      method: 'jsonp',
      url: productType,
      jsonp: 'callback',
      jsonpCallback: 'json'
    })
    .then(res => {
      state.mallNav = res.body.data.typeList
      This.$localStorage.set('goodsType', JSON.stringify(state.mallNav))
      This.$http({
        method: 'jsonp',
        url: product,
        jsonp: 'callback',
        jsonpCallback: 'json',
        params: This.product,
        before: (req) => {
          This.list = []
          This.showLoading = true
        }
      })
      .then(res => {
        console.log('加载完成')
        This.showLoading = false
        This.list = res.body.data.productList
        This.$http({
          method: 'jsonp',
          url: adver,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: {
            position: 1
          }
        })
        .then(res => {
          console.log(res)
          This.recommend = res.body.data.aderList
          This.$http({
            method: 'jsonp',
            url: adver,
            jsonp: 'callback',
            jsonpCallback: 'json',
            params: {
              position: 2
            }
          })
          .then(res => {
            This.advert = res.body.data.aderList
            if (This.$localStorage.get('logined') === 'true') {
              This.$http({
                method: 'jsonp',
                url: wallet,
                jsonp: 'callback',
                jsonpCallback: 'json',
                params: {
                  userId: JSON.parse(This.$localStorage.get('userInfo')).userId
                }
              })
              .then(res => {
                if (res.body.status) {
                  This.score = res.body.data.wallet.balance
                }
              })
            }
          })
        })
      })
    })
  }
}
const actions = {
}
export default {
  state,
  getters,
  mutations,
  actions
}
