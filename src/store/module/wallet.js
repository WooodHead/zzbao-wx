const state = {
  walletScore: [{
    id: 1,
    score: 199.00,
    balance: 2345,
    status: 'success',
    text: '提现成功',
    time: '2016-12-08 12:15:40'
  }, {
    id: 2,
    score: 199.00,
    balance: 2345,
    status: 'waiting',
    text: '等待审核',
    time: '2016-12-08 12:15:40'
  }, {
    id: 3,
    score: 199.00,
    balance: 2345,
    status: 'error',
    text: '提现失败',
    time: '2016-12-08 12:15:40'
  }, {
    id: 4,
    score: 199.00,
    balance: 2345,
    status: 'success',
    text: '提现成功',
    time: '2016-12-08 12:15:40'
  }]
}
const getters = {
  getWalletScore (state) {
    return state.walletScore
  }
}
const mutations = {}
export default {
  state,
  getters,
  mutations
}
