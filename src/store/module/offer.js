import {company} from '../../config'
const state = {
  insuranceArea: '',
  // order: {
  //   insuranceId: '', // 险种id
  //   insuranceBanner: '', // 保险banner
  //   insureArea: '', // 投保城市
  //   license: '', // 车牌号
  //   ownerName: '', // 车主姓名
  //   ownerTel: '', // 车主电话
  //   iDface: '', // 身份证正面照片
  //   drivingLicense: '', // 行驶证正面
  //   subdrivingLicense: '', // 行驶证附页
  //   forcedInsurance: '', // 强制保险
  //   basic: [
  //     {
  //       lossInsurance: 1, // 车辆损失险
  //       regardless: 0 // 不计免赔
  //     }, {
  //       thirdParty: 1, // 第三者责任险
  //       value: '50万',
  //       regardless: 0 // 不计免赔
  //     }, {
  //       driverSeat: 1, // 司机座位险
  //       value: '6万/座',
  //       regardless: 0 // 不计免赔
  //     }, {
  //       passengerSeat: 1, // 乘客座位险
  //       value: '1万/座',
  //       regardless: 0 // 不计免赔
  //     }, {
  //       robbery: 0 // 盗抢险
  //     }
  //   ],
  //   additional: [
  //     {
  //       glassCrushing: 1, // 玻璃破碎险
  //       value: '国产'
  //     }, {
  //       autoignition: 1 // 自燃损失险
  //     }, {
  //       scratch: 1, // 车身划痕险
  //       value: '2000'
  //     }, {
  //       wading: 1, // 涉水险
  //       value: '1万/座'
  //     }, {
  //       escape: 1 // 三者逃逸险
  //     }, {
  //       appointedSpecialist: 1 // 指定专修厂特约险
  //     }
  //   ]
  // },
  offerList: []
}
const getters = {
  getOrder (state) {
    return state.order
  },
  getOfferList (state) {
    return state.offerList
  },
  getOffer (state) {
    return state.offer
  },
  getInsuranceArea (state) {
    return state.insuranceArea
  }
}
const mutations = {
  getInsuranceArea (state, value) {
    state.insuranceArea = value
  },
  getOfferList (state, This) {
    This.$http({
      method: 'jsonp',
      url: company,
      jsonp: 'callback',
      jsonpCallback: 'json',
      before: () => {
      }
    })
    .then(res => {
      state.offerList = res.body.data.companyList
      console.log(res.body.data.companyList)
    })
  },
  getOffer (state) {}
}
export default {
  state,
  getters,
  mutations
}
