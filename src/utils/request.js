import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

// 将正在请求的地址存储起来:https://segmentfault.com/a/1190000022034769
const pending = []
const CancelToken = axios.CancelToken

/**
 * config 请求的axios的配置信息
 * c框架中用于取消的回调，在这也会用来判断当前是请求阶段还是返回阶段
*/
const removePending = (config, c) => {
  const url = config.url
  const index = pending.findIndex(i => i === `${url}&${config.method}`)
  // 判断要请求的的地址有没有在pending中
  if (index > -1) {
    c ? c('数据请求中……') : pending.splice(index, 1)
  } else {
    c && pending.push(`${url}&${config.method}`)
  }
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    console.log(config, 'config--55')
    // 请求之前判断并添加到pending
    config.cancelToken = new CancelToken(c => {
      removePending(config, c)
    })
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // 请求回来后删除pending存储
    removePending(response.config)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // 下载失败时提示信息处理
    // bug-文件预览或下载中，axios设置responseType:blob时对于后台报错信息的捕获兼容_do
    // 地址：https://blog.csdn.net/dongguan_123/article/details/100183284
    if (error.response.config.responseType === 'blob') {
      const render = new FileReader()
      render.readAsText(error.response.data, 'utf-8')
      render.onload = (e) => {
        Message({
          message: (JSON.parse(e.target.result)).message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    // 请求回来后删除pending存储
    error.config && removePending(error.config)
    return Promise.reject(error)
  }
)

export default service
