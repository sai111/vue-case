<template>
  <div class="count-wrap">
    <div class="count-title">
      自动统计字数的小工具
    </div>
    <table
      cellspacing="1"
      cellpadding="5"
      width="940"
      align="center"
      bgcolor="#ffffff"
      border="0"
    >
      <tbody>
        <tr>
          <td bgcolor="#e5f0fb" colspan="2">
            <div class="bookmark">
              {{ title }}
              <div class="shoucang" @click="handleMark">
                （<a>点此收藏</a>）
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td bgcolor="#e5f0fb">
            <div class="label">
              文章输入区
            </div>
          </td>
          <td bgcolor="#e5f0fb">
            <textarea
              v-model="content"
              name="content"
              rows="10"
              cols="127"
              @input="getContent"
            />
          </td>
        </tr>
        <tr>
          <td bgcolor="#e5f0fb">
            <div class="label">
              文字总数
            </div>
          </td>
          <td bgcolor="#e5f0fb">
            <b>总字数为：</b>
            <span class="f20">
              {{ zishu }}
            </span>
            个
            <div>
              （中文字数+英文单词+数据单词+中文标点符号：
              <span
                v-for="(item, key) in countList"
                :key="'num-'+key"
                class="num"
              >
                {{ item }} {{ key=='zbiaodian' ? '=' : '+' }}
              </span>
              <span class="num">
                {{ zishu }}
              </span>
            </div>
            <div>
              小说、作文等行业正规字数计算方法：中文字数+英文单词+数据单词+中文标点符号，英文标点符号不计入字数，此外空格肯定不会被计入字数。
            </div>
          </td>
        </tr>
        <tr>
          <td bgcolor="#e5f0fb">
            <div class="label">
              详细统计
            </div>
          </td>
          <td style="LINE-HEIGHT: 200%" bgcolor="#e5f0fb">
            <div class="list-wrap">
              <div
                v-for="(item, index) in list"
                :key="'list-li-'+index"
                class="list-li"
              >
                {{ item.label }}：
                <span class="list-li-count">{{ item.count }}</span>
                {{ item.unit }}
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td bgcolor="#e5f0fb">
            <div class="label">
              操作
            </div>
          </td>
          <td style="LINE-HEIGHT: 200%" bgcolor="#e5f0fb">
            <div class="button-wrap">
              <el-button
                v-for="(item, index) in buttons"
                :key="'button-li-'+index"
                type="button"
                @click="handleButton(item)"
              >
                {{ item.label }}
              </el-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import config from './config.js'
export default {
  name: 'Count',
  props: {},
  data() {
    return {
      BROWSER: {},
      title: config.toolTitle,
      list: config.detailList,
      content: '',
      buttons: [
        { label: '清空数据', value: 'clear' },
        { label: '清除行尾空格', value: 'trim' },
        { label: '段前空两格', value: 'section', tip: '段落整理（段前加空格）' }
      ],
      zishuTip: '中文字数+英文单词+数据单词+中文标点符号',
      zishu: 0,
      countList: {
        zhongwen: 0,
        danci: 0,
        shuju: 0,
        zbiaodian: 0
      },
      shoucangTip: '您的浏览器不支持自动加入收藏，请使用Ctrl+D进行添加'
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
    this.getBrowserVar()
  },
  methods: {
    init() {
      if (this.BROWSER.safari) {
        this.BROWSER.firefox = true
      }
    },
    reset() {
      this.zishu = 0
      this.list.forEach((v) => {
        v.count = 0
      })
      this.countList = {
        zhongwen: 0,
        danci: 0,
        shuju: 0,
        zbiaodian: 0
      }
    },
    // browser
    getBrowserVar() {
      const types = {
        ie: 'msie',
        firefox: '',
        chrome: '',
        opera: '',
        safari: '',
        mozilla: '',
        webkit: '',
        maxthon: '',
        qq: 'qqbrowser'
      }
      const ua = navigator.userAgent.toLowerCase()
      let other = 1
      let version = 0
      if (this.BROWSER.opera) {
        version = opera.version()
        this.BROWSER.opera = version
        this.BROWSER.name = 'opera'
        this.BROWSER.version = parseFloat(version)
      } else {
        this.BROWSER.opera = 0
      }
      for (const i in types) {
        var v = types[i] ? types[i] : i
        if (ua.indexOf(v) !== -1) {
          var re = new RegExp(v + '(\\/|\\s)([\\d\\.]+)', 'ig')
          var matches = re.exec(ua)
          version = matches !== null ? matches[2] : 0
          other = version !== 0 && v !== 'mozilla' ? 0 : other
          if (!this.BROWSER.name) {
            this.BROWSER.name = i
            this.BROWSER.version = parseFloat(version)
          }
        } else {
          version = 0
        }
        // eval('this.BROWSER.' + i + '= version')
      }
      this.BROWSER.other = other
    },
    getContent() {
      const str = this.content.replace(/\r\n/g, '\n')
      const numwords = str.replace(/\n/g, '')
      const zhongwen = str.match(/[\u4e00-\u9fa5]/g) || []
      const wStr = str.match(/\b\w+\b/g) || []
      const shuju = str.match(/\b\d+\b/g) || []
      const ybiaodian = numwords.match(/[|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g) || []

      let sTotal = 0
      for (var i = 0; i < numwords.length; i++) {
        var c = numwords.charAt(i)
        if (c.match(/[^\x00-\xff]/)) sTotal++
      }
      const e = numwords.match(/[A-Za-z]/g) || []
      const eTotal = e.length

      const n = numwords.match(/[0-9]/g) || []
      const shuzi = n.length

      let part = 0
      const s_ma = str.split('\n')
      for (var j = 0; j < s_ma.length; j++) {
        if (s_ma[j].length > 0) part++
      }
      const count = {
        zhongwen: zhongwen.length, // zhongwen
        danci: wStr.length - shuju.length, // 英文单词总数
        shuju: shuju.length, // 数据单词总数
        zbiaodian: sTotal - zhongwen.length, // 中文标点总数
        numwords: numwords.length, // 字符总数
        yingwen: eTotal, // 英文字符总数
        ybiaodian: ybiaodian.length, // 英文标点总数
        shuzi: shuzi, // 数字总数
        hangduan: part // 行（段）总数
      }
      this.zishu = wStr.length + sTotal
      for (const k in count) {
        this.list.forEach((v) => {
          if (v.value === k) {
            v.count = count[k]
          }
        })
        for (const k2 in this.countList) {
          if (k === k2) {
            this.countList[k2] = count[k]
          }
        }
      }
    },
    handleButton(item) {
      switch (item.value) {
        case 'clear':
          this.handleClear()
          break
        case 'trim':
          this.handleTrim()
          break
        case 'section':
          this.handleSection()
          break
      }
    },
    handleClear() {
      this.content = null
      this.reset()
    },
    handleTrim() {
      const str = this.content.replace(/\r\n/g, '\n').replace(/\n/g, '~')
      const m = str.split('~')
      const tmp = []
      const len = m.length
      for (var i = 0; i < len; i++) {
        tmp.push(m[i].replace(/(\s*$)/g, ''))
      }
      this.content = tmp.join('\r\n')
      this.getContent()
    },
    handleSection() {
      const str = this.content.replace(/\r\n/g, '\n').replace(/\n/g, '~')
      const m = str.split('~')
      const tmp = []
      const len = m.length
      for (var i = 0; i < len; i++) {
        tmp.push('    ' + m[i].replace(/(^\s*)|(\s*$)/g, ''))
      }
      console.log(tmp, 'tmp---5555')
      this.content = tmp.join('\r\n')
      this.getContent()
    },
    handleMark() {
      if (document.all) {
        try {
          window.external.addFavorite(window.location.href, document.title)
        } catch (e) {
          alert(this.shoucangTip)
        }
      } else if (window.sidebar) {
        window.sidebar.addPanel(document.title, window.location.href, '')
      } else {
        alert(this.shoucangTip)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
