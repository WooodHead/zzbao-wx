import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      redirect: '/offer',
      component: (resolve) => {
        require(['@/views/TabView'], resolve)
      },
      children: [
        {
          path: '/offer',
          components: {
            tab: (resolve) => {
              require(['@/views/Offer'], resolve)
            }
          }
        }, {
          path: '/mall',
          components: {
            tab: (resolve) => {
              require(['@/views/Mall'], resolve)
            }
          }
        }, {
          path: '/personer',
          components: {
            tab: (resolve) => {
              require(['@/views/Personer'], resolve)
            }
          }
        }
      ]
    }, {
      path: '/offer/:id',
      components: {
        default: (resolve) => {
          require(['@/views/OfferDetail'], resolve)
        }
      }
    }, {
      path: '/offer/:id/:userId',
      components: {
        default: (resolve) => {
          require(['@/views/OfferDetail'], resolve)
        }
      }
    }, {
      path: '/offer/photograph/:id',
      components: {
        default: (resolve) => {
          require(['@/views/PhotoGraph'], resolve)
        }
      }
    }, {
      path: '/offer/photograph/:id/:userId',
      components: {
        default: (resolve) => {
          require(['@/views/PhotoGraph'], resolve)
        }
      }
    }, {
      path: '/offer/select/:id',
      components: {
        default: (resolve) => {
          require(['@/views/Select'], resolve)
        }
      }
    }, {
      path: '/offer/select/:id/:userId',
      components: {
        default: (resolve) => {
          require(['@/views/Select'], resolve)
        }
      }
    }, {
      path: '/offersuccess/:orderId/:userId',
      components: {
        default: (resolve) => {
          require(['@/views/OfferSuccess'], resolve)
        }
      }
    }, {
      path: '/login',
      name: 'Login',
      component: (resolve) => {
        require(['@/views/Login'], resolve)
      }
    }, {
      path: '/setting',
      name: 'Setting',
      component: (resolve) => {
        require(['@/views/Setting'], resolve)
      }
    }, {
      path: '/exchange',
      name: 'exchange',
      component: (resolve) => {
        require(['@/views/Exchange'], resolve)
      }
    }, {
      path: '/exchange/:userId',
      name: 'exchangeId',
      component: (resolve) => {
        require(['@/views/Exchange'], resolve)
      }
    }, {
      path: '/order',
      name: 'order',
      component: (resolve) => {
        require(['@/views/Order'], resolve)
      }
    }, {
      path: '/order/:id',
      name: 'orders',
      component: (resolve) => {
        require(['@/views/Order'], resolve)
      }
    }, {
      path: '/order/:id/:userId',
      name: 'ordersId',
      component: (resolve) => {
        require(['@/views/Order'], resolve)
      }
    }, {
      path: '/wallet',
      name: 'wallet',
      component: (resolve) => {
        require(['@/views/Wallet'], resolve)
      }
    }, {
      path: '/wallet/:userId',
      name: 'walletId',
      component: (resolve) => {
        require(['@/views/Wallet'], resolve)
      }
    }, {
      path: '/record',
      name: 'record',
      component: (resolve) => {
        require(['@/views/Record'], resolve)
      }
    }, {
      path: '/record/:id',
      name: 'recordDetail',
      component: (resolve) => {
        require(['@/views/RecordDetail'], resolve)
      }
    }, {
      path: '/cash',
      name: 'cash',
      component: (resolve) => {
        require(['@/views/Cash'], resolve)
      }
    }, {
      path: '/donation',
      name: 'donation',
      component: (resolve) => {
        require(['@/views/Donation'], resolve)
      }
    }, {
      path: '/detail',
      name: 'detail',
      component: (resolve) => {
        require(['@/views/Detail'], resolve)
      }
    }, {
      path: '/detail/:userId',
      name: 'detailId',
      component: (resolve) => {
        require(['@/views/Detail'], resolve)
      }
    }, {
      path: '/balanceDetail',
      name: 'balanceDetail',
      component: (resolve) => {
        require(['@/views/BalanceDetail'], resolve)
      }
    }, {
      path: '/balanceDetail/:userId',
      name: 'balanceDetailId',
      component: (resolve) => {
        require(['@/views/BalanceDetail'], resolve)
      }
    }, {
      path: '/message',
      name: 'message',
      component: (resolve) => {
        require(['@/views/Message'], resolve)
      }
    }, {
      path: '/information',
      name: 'information',
      component: (resolve) => {
        require(['@/views/Information'], resolve)
      }
    }, {
      path: '/edit/passwordBypay',
      name: 'passwordBypay',
      component: (resolve) => {
        require(['@/views/PasswordPay'], resolve)
      }
    }, {
      path: '/edit/passwordBylogin',
      name: 'passwordBylogin',
      component: (resolve) => {
        require(['@/views/PasswordLogin'], resolve)
      }
    }, {
      path: '/edit/phone',
      name: 'editPhone',
      component: (resolve) => {
        require(['@/views/Phone'], resolve)
      }
    }, {
      path: '/aboutUs',
      name: 'aboutUs',
      component: (resolve) => {
        require(['@/views/AboutUs'], resolve)
      }
    }, {
      path: '/feedback',
      name: 'feedback',
      component: (resolve) => {
        require(['@/views/FeedBack'], resolve)
      }
    }, {
      path: '/question',
      name: 'question',
      component: (resolve) => {
        require(['@/views/Question'], resolve)
      }
    }, {
      path: '/goods/:id',
      name: 'goods',
      component: (resolve) => {
        require(['@/views/Goods'], resolve)
      }
    }, {
      path: '/mall/:type',
      name: 'goodsCategory',
      component: (resolve) => {
        require(['@/views/GoodsList'], resolve)
      }
    }, {
      path: '/register',
      name: 'register',
      component: (resolve) => {
        require(['@/views/Register'], resolve)
      }
    }, {
      path: '/password',
      name: 'password',
      component: (resolve) => {
        require(['@/views/Password'], resolve)
      }
    }, {
      path: '/pay/:userId/:orderId',
      name: 'pay',
      component: (resolve) => {
        require(['@/views/Pay'], resolve)
      }
    }, {
      path: '/paysuccess/:userId/:orderId',
      name: 'paysuccess',
      component: (resolve) => {
        require(['@/views/PaySuccess'], resolve)
      }
    }, {
      path: '/pay/info/:id',
      name: 'payInfo',
      component: (resolve) => {
        require(['@/views/PayInfo'], resolve)
      }
    }, {
      path: '/policy/:userId/:orderId',
      name: 'policy',
      component: (resolve) => {
        require(['@/views/Policy'], resolve)
      }
    }, {
      path: '/orderdetail/:userId/:orderId',
      name: 'orderDetail',
      component: (resolve) => {
        require(['@/views/OrderDetail'], resolve)
      }
    }, {
      path: '/wrong',
      name: 'wrong',
      component: (resolve) => {
        require(['@/views/Browser'], resolve)
      }
    }, {
      path: '/track/:userId/:orderId',
      name: 'track',
      component: (resolve) => {
        require(['@/views/Track'], resolve)
      }
    }, {
      path: '/customer/:userId/:customerId',
      name: 'CustomerDetail',
      component: (resolve) => {
        require(['@/views/CustomerDetail'], resolve)
      }
    }, {
      path: '/addCustomer/:userId',
      name: 'CustomerAdd',
      component: (resolve) => {
        require(['@/views/CustomerAdd'], resolve)
      }
    }, {
      path: '/editCustomer/:userId/:customerId',
      name: 'CustomerEdit',
      component: (resolve) => {
        require(['@/views/CustomerEdit'], resolve)
      }
    }
  ]
})
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', true)
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', false)
})
export default router
