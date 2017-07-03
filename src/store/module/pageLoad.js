const state = {
  isLoading: false
}
const getters = {
  pageLoading (state) {
    return state.isLoading
  }
}
const mutations = {
  updateLoadingStatus (state, param) {
    state.isLoading = param
  }
}
export default {
  state,
  getters,
  mutations
}
