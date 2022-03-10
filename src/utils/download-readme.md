
download下载本地文件

```
import downloadAxios from './download'
downloadPdf () {
  const url = `${location.protocol}//${location.host}${location.pathname}pdf/docking-document.pdf`
      downloadAxios.get(encodeURI(url), {params: {fileName: '对接文档.pdf'}})
}
```

后台接口提供文件流，前端自行下载

```
   第一步：
  // 在接口中加入responseType标志
  export function exportOrder (data) {
    return axios({
      url: '/oc/orders/toExcel',
      method: 'post',
      data,
      responseType: 'blob'
    })
  }

  第二步

    修改axios的返回response
    ```
    // 导出订单后台提供的文件流，需要前端自行下载excel
    if (response.config.responseType === 'blob') {
      const fileName = window.decodeURI(response.headers['content-disposition'].split(';')[1].split('=')[1], 'UTF-8')
      downFile(res, fileName)
    }

    // 处理流文件【导出订单后台提供的文件流，需要前端自行下载excel】
    function downFile (content, fileName) {
      var ele = document.createElement('a')
      ele.download = fileName
      ele.style.display = 'none'
      var blob = new Blob([content], { type: 'application/vnd.ms-excel' })
      ele.href = URL.createObjectURL(blob)
      document.body.appendChild(ele)
      ele.click()
      document.body.removeChild(ele)
    }
    ```

  第三步
   res.code 这里不提示错误

```

