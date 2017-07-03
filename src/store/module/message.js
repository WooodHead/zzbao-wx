const state = {
  messageList: [{
    title: '您的订单号为201602145745的订单报价成功！',
    content: '您的订单号为201602145745的订单报价成功！',
    time: '2017-12-12 17:34',
    read: false
  }, {
    title: '您的订单号为201602145745的订单报价成功！',
    content: '您的订单号为201602145745的订单报价成功！',
    time: '2017-12-12 17:34',
    read: false
  }, {
    title: '您的订单号为201602145745的订单报价成功！',
    content: '您的订单号为201602145745的订单报价成功！',
    time: '2017-12-12 17:34',
    read: true
  }, {
    title: '您的订单号为201602145745的订单报价成功！',
    content: '您的订单号为201602145745的订单报价成功！',
    time: '2017-12-12 17:34',
    read: true
  }, {
    title: '您的订单号为201602145745的订单报价成功！',
    content: '您的订单号为201602145745的订单报价成功！',
    time: '2017-12-12 17:34',
    read: true
  }]
}
const getters = {
  getMessageList (state) {
    return state.messageList
  }
}
export default {
  state,
  getters
}
