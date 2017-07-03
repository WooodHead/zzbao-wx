const state = {
  orderList: [{
    id: 1,
    goods: {
      id: 123,
      cover: 'static/img/safe1.png'
    },
    carNumber: '鄂A78458',
    insured: '刘勇',
    status: '待保险公司报价', // waitingoffer waitingpay waitinglist list
    price: '待报价',
    category: 'offer',
    time: '2017-05-02  17 : 50 : 15'
  }, {
    id: 2,
    goods: {
      id: 123,
      cover: 'static/img/safe1.png'
    },
    carNumber: '鄂A78458',
    insured: '刘勇',
    status: '待付款', // waitingoffer waitingpay waitinglist list
    price: '￥4300.00',
    category: 'pay',
    time: '2017-05-02  17 : 50 : 15'
  }, {
    id: 3,
    goods: {
      id: 123,
      cover: 'static/img/safe1.png'
    },
    carNumber: '鄂A78458',
    insured: '刘勇',
    status: '待出单', // waitingoffer waitingpay waitinglist list
    price: '',
    category: 'issue',
    time: '2017-05-02  17 : 50 : 15'
  }, {
    id: 4,
    goods: {
      id: 123,
      cover: 'static/img/safe1.png'
    },
    carNumber: '鄂A78458',
    insured: '刘勇',
    status: '已出单', // waitingoffer waitingpay waitinglist list
    price: '',
    category: 'issued',
    time: '2017-05-02  17 : 50 : 15'
  }, {
    id: 5,
    goods: {
      id: 123,
      cover: 'static/img/safe1.png'
    },
    carNumber: '鄂A78458',
    insured: '刘勇',
    status: '已撤单', // waitingoffer waitingpay waitinglist list
    price: '￥0.00',
    category: 'kill',
    time: '2017-05-02  17 : 50 : 15'
  }, {
    id: 6,
    goods: {
      id: 123,
      cover: 'static/img/safe1.png'
    },
    carNumber: '鄂A78458',
    insured: '刘勇',
    status: '报价失败', // waitingoffer waitingpay waitinglist list
    price: '暂无保费',
    category: 'fail',
    time: '2017-05-02  17 : 50 : 15'
  }]
}
const getters = {
  getOrderList (state) {
    return state.orderList
  }
}
export default {
  state,
  getters
}
