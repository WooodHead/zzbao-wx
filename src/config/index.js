// export const server = 'http://192.168.0.105:8080/zzbao' // http://zzhb.cyht.com.cn:81
export const server = 'http://zzhb.cyht.com.cn:81' // http://liuwbox.com/zzbao
export const login = server + '/app/user/login.htm' // 登录api
export const sms = server + '/app/user/sms.htm' // 短信接口
export const register = server + '/app/user/regist.htm' // 注册接口
export const editPwd = server + '/app/user/resetPwd.htm' // 修改密码接口
export const company = server + '/app/insurance/company.htm' // 保险公司接口
export const product = server + '/app/shop/product.htm' // 保险公司接口
export const productType = server + '/app/shop/type.htm' // 保险公司接口
export const information = server + '/app/user/edit.htm' // 保险公司接口
export const editLoginPwd = server + '/app/user/editPwd.htm' // 修改登录密码
export const resetPayPwd = server + '/app/user/resetPay.htm' // 充值支付密码
export const submitOrder = server + '/app/order/submit.htm' // 提交保险订单
export const exchange = server + '/app/shop/exchange.htm' // 积分兑换
export const wallet = server + '/app/user/wallet.htm' // 我的钱包
export const donation = server + '/app/user/donation.htm' // 积分转赠
export const precard = server + '/app/user/precard.htm' // 上次用的卡
export const message = server + '/app/user/message.htm' // 我的消息
export const messageStatus = server + '/app/user/message/status.htm' // 更新消息状态
export const question = server + '/app/user/questiones.htm' // 常见问题
export const exchangeLog = server + '/app/shop/exchange/log.htm' // 兑换记录
export const withdraw = server + '/app/user/withdraw.htm' // 积分提现
export const withdrawlog = server + '/app/user/withdraw/log.htm' // 积分提现记录
export const detail = server + '/app/user/bills.htm' // 收入明细
export const feedback = server + '/app/user/feedback.htm' // 用户反馈
export const insurance = server + '/app/insurance/list.htm' // 险种列表
export const insuranceInfo = server + '/app/insurance/company/info.htm' // 险种详情
export const orderList = server + '/app/order/list.htm' // 订单列表
export const orderDetail = server + '/app/order/detail.htm' // 订单详情
export const uploadFile = server + '/file/upload/image.htm' // 上传图片
export const uploadBase64 = server + '/file/upload/image64.htm' // 上传图片
export const adver = server + '/app/index/adver.htm' // 轮播图
export const backOrder = server + '/app/order/cancel.htm' // 撤销报价
export const area = server + '/app/insurance/area.htm' // 地区
export const customer = server + '/app/customer/detail.htm' // 客户详情
export const customerEdit = server + '/app/customer/submit.htm' // 编辑客户
export const customerDel = server + '/app/customer/del.htm' // 删除客户
export const phone = server + '/app/user/resetPhone.htm' // 更改绑定手机号
export const track = server + '/app/order/detail/log.htm' // 订单跟踪
export const pay = server + '/app/order/pay/wechatWapPay.htm' // 订单支付
export const orderInfo = server + '/app/order/info.htm' // 订单详情
export const article = server + '/app/index/article/detail.htm' // 文章详情
export const userInfo = server + '/app/user/checkPayPwd.htm' // 文章详情
export const userFace = server + '/app/user/headPic/update.htm' // 文章详情
export const loginUrl = 'https://zzhb.cyht.com.cn/get-weixin-code.html?appid=wxede00c47ca454a02&scope=snsapi_base&state=hello-world&redirect_uri=https%3A%2F%2Fzzhb.cyht.com.cn%2Fwap%2Fwechat%2Flogin.htm'
export const noMore = '没有更多！'
export const timeout = 5000
// export const tokenUrl = server + 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential'
// export const ticketUrl = server + 'https://api.weixin.qq.com/cgi-bin/ticket/getticket'
// export const appId = server + 'wxabf1c20c98f9cf4c'
// export const appSecret = server + '4e5337cb2cff85f21385ff8673e1c07a'
export const time = 60 // 获取验证码时间间隔单位：秒
export const QQ = '2306157540'
export const status = ['待报价', '核保中', '核保失败', '待支付', '待承保', '已承保']
export const back = () => {
  window.history.go(-1)
  window.alert('back')
}