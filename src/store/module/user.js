import {login, sms, register, editPwd, information, time} from '../../config'
const state = {
  logined: false,
  userInfo: {}
}
const getters = {
  // 验证是否登录
  checkAuthor (state) {
    return state.logined
  },
  // 获取登录用户信息
  getUserInfo (state) {
    return state.userInfo
  }
}
const mutations = {
  // 修改用户密码
  postEditPassword (state, This) {
    console.log(This.form)
    if (!This.form.tel) {
      This.$vux.toast.show({
        type: 'text',
        width: '20em',
        position: 'bottom',
        text: '请填写手机号码！',
        time: '1000'
      })
    } else if (!This.form.captcha) {
      This.$vux.toast.show({
        type: 'text',
        width: '20em',
        position: 'bottom',
        text: '验证码必须填写！',
        time: '1000'
      })
    } else if (!This.form.pwd || !This.pwd) {
      This.$vux.toast.show({
        type: 'text',
        width: '10em',
        position: 'bottom',
        text: '请输入新密码！',
        time: '1000'
      })
    } else if (This.form.pwd !== This.pwd) {
      This.$vux.toast.show({
        type: 'text',
        width: '15em',
        position: 'bottom',
        text: '两次输入的密码不同！',
        time: '1000'
      })
    } else {
      // 上面全部通过，执行修改密码操作
      if (This.loading) {
        This.$vux.toast.show({
          type: 'text',
          width: '10em',
          position: 'bottom',
          text: '请勿重复提交！',
          time: '1000'
        })
      } else {
        This.$http({
          method: 'jsonp',
          url: editPwd,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: This.form,
          before: () => {
            This.loading = true
          }
        })
        .then(res => {
          console.log(res)
          This.loading = false
          if (res.body.status) {
            This.$router.replace('/login')
          } else {
            This.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: res.body.msg,
              time: '1000'
            })
          }
        })
      }
    }
  },
  // 用户退出登录
  postLogout (state, This) {
    This.$localStorage.remove('userInfo')
    This.$localStorage.set('logined', false)
    This.$router.replace('/login')
    state.logined = false
    state.userInfo = {}
  },
  // 用户登录操作
  postLogin (state, This) {
    if (This.form.tel === '' || This.form.pwd === '') {
      This.$vux.toast.show({
        type: 'text',
        width: '20em',
        position: 'bottom',
        text: '手机号码和密码不能为空！',
        time: '1000'
      })
    } else if (!This.$refs.tel.valid) {
      This.$vux.toast.show({
        type: 'text',
        width: '20em',
        position: 'bottom',
        text: '手机号格式不正确',
        time: '1000'
      })
    } else {
      if (!This.loading) {
        This.$http({
          method: 'jsonp',
          url: login,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: {
            tel: This.form.tel,
            pwd: This.form.pwd
          },
          before: () => {
            This.loading = true
          }
        })
        .then(res => {
          if (res.body.data) {
            This.loading = false
            This.$vux.toast.show({
              type: 'text',
              width: '10em',
              position: 'bottom',
              text: '登录成功！',
              time: '1000'
            })
            state.logined = true
            console.log(res.body.data.userInfo)
            state.userInfo = res.body.data.userInfo
            This.$localStorage.set('userInfo', JSON.stringify(state.userInfo))
            This.$localStorage.set('time', Date.parse(new Date()))
            This.$localStorage.set('logined', true)
            setTimeout(() => {
              This.$router.replace('/personer')
            }, 1000)
          } else {
            This.loading = false
            This.$vux.toast.show({
              type: 'text',
              width: '15em',
              position: 'bottom',
              text: '用户名或者密码有误！',
              time: '1000'
            })
          }
        }, res => {
          This.loading = false
          This.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '服务器正在维护中！',
            time: '1000'
          })
        })
      } else {
        This.$vux.toast.show({
          type: 'text',
          width: '20em',
          position: 'bottom',
          text: '正在努力加载中，不要着急哦！',
          time: '1000'
        })
      }
    }
  },
  // 用户注册
  postRegister (state, This) {
    if (!This.form.tel || !This.$refs.tel.valid) {
      This.$vux.toast.show({
        type: 'text',
        width: '20em',
        position: 'bottom',
        text: '请填写正确的手机号码！',
        time: '1000'
      })
    } else if (!This.form.name) {
      This.$vux.toast.show({
        type: 'text',
        width: '10em',
        position: 'bottom',
        text: '请填写您的姓名',
        time: '1000'
      })
    } else if (!This.$refs.pwd.valid || This.pwd !== This.form.pwd) {
      This.$vux.toast.show({
        type: 'text',
        width: '10em',
        position: 'bottom',
        text: '密码输入有误！',
        time: '1000'
      })
    } else if (!This.form.captcha) {
      This.$vux.toast.show({
        type: 'text',
        width: '10em',
        position: 'bottom',
        text: '验证码必填！',
        time: '1000'
      })
    } else {
      // 提交注册
      if (!This.loading) {
        This.$http({
          method: 'jsonp',
          url: register,
          jsonp: 'callback',
          jsonpCallback: 'json',
          params: This.form,
          before: () => {
            This.loading = true
          }
        })
        .then(res => {
          console.log(res)
          This.loading = false
          if (res.body.status) {
            This.$vux.toast.show({
              type: 'text',
              width: '20em',
              position: 'bottom',
              text: '恭喜，注册成功！',
              time: '1000'
            })
            state.logined = true
            setTimeout(() => {
              This.$router.replace('/login')
            }, 1000)
          }
        })
      } else {
        This.$vux.toast.show({
          type: 'text',
          width: '10em',
          position: 'bottom',
          text: '正在提交注册！',
          time: '1000'
        })
      }
    }
  },
  // 发送短信接口
  postSMS (state, This) {
    if (!This.form.tel) {
      This.$vux.toast.show({
        type: 'text',
        width: '20em',
        position: 'bottom',
        text: '请填写手机号码！',
        time: '1000'
      })
    } else {
      if (!This.$refs.tel.valid) {
        This.$vux.toast.show({
          type: 'text',
          width: '20em',
          position: 'bottom',
          text: '请填写正确的手机号码',
          time: '1000'
        })
      } else {
        if (!This.getting) {
          This.$http({
            method: 'jsonp',
            url: sms,
            jsonp: 'callback',
            jsonpCallback: 'json',
            params: {
              tel: This.form.tel,
              type: This.smsType
            },
            before: () => {
              This.getting = true
              console.log(sms)
            }
          })
          .then(res => {
            console.log(res)
            if (res.body.status) {
              This.getting = false
              This.show = true
              This.start = true
            } else {
              This.getting = false
              This.isReg = true
            }
            if (res.body.status) {
              This.$vux.toast.show({
                type: 'text',
                width: '20em',
                position: 'bottom',
                text: '验证码获取成功，有效期' + (time / 60) + '分钟',
                time: '3000'
              })
            } else {
              This.$vux.toast.show({
                type: 'text',
                width: '20em',
                position: 'bottom',
                text: '验证码获取失败，请稍后重试！',
                time: '3000'
              })
            }
          })
        } else {
          This.$vux.toast.show({
            type: 'text',
            width: '20em',
            position: 'bottom',
            text: '正在获取验证码，请稍后！',
            time: '1000'
          })
        }
      }
    }
  },
  // 从localstorage获取用户登录信息
  getAuthorInfo (state, This) {
    state.userInfo = JSON.parse(This.$localStorage.get('userInfo'))
  },
  editInformation (state, This) {
    delete This.userInfo.userArea
    delete This.userInfo.userBalance
    delete This.userInfo.userCumulative
    This.$http({
      method: 'jsonp',
      url: information,
      jsonp: 'callback',
      jsonpCallback: 'json',
      params: This.form,
      before: () => {
        This.loading = true
      }
    })
    .then(res => {
      let userInfo = JSON.parse(This.$localStorage.get('userInfo'))
      if (res.body.status) {
        userInfo.userName = This.form.userName
        userInfo.userBirthday = This.form.birthday
        userInfo.userSex = This.form.userSex
        This.$localStorage.set('userInfo', JSON.stringify(userInfo))
      }
      This.loading = false
      This.$vux.toast.show({
        type: 'text',
        width: '20em',
        position: 'bottom',
        text: res.body.msg,
        time: '1000'
      })
    })
  }
}
export default {
  state,
  getters,
  mutations
}
