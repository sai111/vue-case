<template>
  <!-- 支付公共组件 -->
  <view class="account-common">
    <view class="account">¥{{ data && data.orderAmount }}</view>
    <!--<view class="account-common-li">
      <view class="label">微信帐号</view>
      <view class="value">{{ phone }}</view>
    </view>-->
    <view class="account-common-li">
      <view class="label">支付方式</view>
      <view class="value">微信支付</view>
    </view>
    <view class="account-common-button" @tap="handleBuy">立即支付</view>
  </view>
</template>
<script>
import bus from '@/utils/event.js'
import Taro from '@tarojs/taro'
import { reactive, toRefs, onMounted } from 'vue'
import { getToken } from '@/utils/auth.js'
import {postWechat, getWechat} from '@/api/order.js'
import './index.scss'
export default {
  props: {
    data: {}
  },
  setup (props, context) {
    const userInfo = reactive({
      phone: ''
    })
    onMounted(() => {
      getLoginInfo()
    })
    const initToken = () => {
      if (getToken('customer_info')) {
        bus.emit('updateInfo')
      }
    }
    // 获取登录信息
    const getLoginInfo = () => {
      try {
        const tmp = JSON.parse(getToken('customer_info'))
        userInfo.phone = tmp.phone
      } catch (error) {}
    }
    // 获取微信登录
    const handleBuy = async () => {
      const result = await Taro.login()
      console.log('是否触发——————————')
      initToken()
      if (result && result.code) {
        postWechat({
          orderCode: props.data.orderCode,
          productName: props.data.productName,
          orderAmount: props.data.orderAmount,
          tradeType: 1,
          code: result.code
        }).then((res) => {
          if (res && res.data) {
            sendpay(res.data.miniApp)
          }
        })
      }
    }
    const sendpay = (str) => {
      try {
        wx.requestPayment(
          {
            ...JSON.parse(str),
            success: (res) => {
              getWechat({orderCode: props.data.orderCode}).then((result) => {
                bus.emit('updateInfo')
                handleNavigate(200, props.data)
              })
            },
            fail: (res) => {
              bus.emit('updateInfo')
              handleNavigate(400, props.data)
            },
            complete: (res) => {
              console.log(res, 'complete----付款3')
            }
          }
        )
      } catch (error) {
      }
    }
    const handleNavigate = (code, params) => {
      let query = ''
      if (params && Object.keys(params).length > 0) {
        for (const k in params) {
          query += '&' + k + '=' + params[k]
        }
      }
      Taro.navigateTo({url: '/pages/pay-result/index?code=' + code + query})
    }
    return {
      ...toRefs(userInfo),
      handleBuy,
      getLoginInfo
    }
  }
}
</script>
