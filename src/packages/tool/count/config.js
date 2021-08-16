/** count配置项 */
const config = {
  toolTitle: '这是一个自动统计字数的小工具，将文档拷贝过来即可进行自动统计，可算出总字数，并可分别算出汉字字数（含标点）、英文字数和数字字数。',
  detailList: [
    {
      label: '字符总数',
      value: 'numwords',
      count: 0,
      unit: '个字符 (汉字算两个字符，数字、空格、英文字母算做一个字符)'
    },
    {
      label: '中文字符总数',
      value: 'zhongwen',
      count: 0,
      unit: '个汉字'
    },
    {
      label: '中文标点总数',
      value: 'zbiaodian',
      count: 0,
      unit: '个'
    },
    {
      label: '英文字符总数',
      value: 'yingwen',
      count: 0,
      unit: '个（不含英文状态下的数字）'
    },
    {
      label: '英文单词总数',
      value: 'danci',
      count: 0,
      unit: '个'
    },
    {
      label: '英文标点总数',
      value: 'ybiaodian',
      count: 0,
      unit: '个'
    },
    {
      label: '数字总数',
      value: 'shuzi',
      count: 0,
      unit: '个'
    },
    {
      label: '数据单词总数',
      value: 'shuju',
      count: 0,
      unit: '个'
    },
    {
      label: '行（段）总数',
      value: 'hangduan',
      count: 0,
      unit: '个'
    }
  ]
}
export default config
