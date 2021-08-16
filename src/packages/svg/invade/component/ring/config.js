/** polygonRing配置项 */
const config = {
  lightEnable: {
    type: Boolean,
    default: true
  },
  occupy: {
    type: [String, Number],
    default: 0.6
  },
  radius: {
    type: [String, Number],
    default: 100
  },
  ringWidth: {
    type: [String, Number],
    default: 7
  },
  roundHead: {
    type: Boolean,
    default: true
  },
  valueRingWidth: {
    type: [String, Number],
    default: 0
  },
  value: {
    type: [String, Number],
    default: 50
  },
  sum: {
    type: [String, Number],
    default: 100
  },
  title: {
    type: [Object, Array],
    default: {
      text: '测试文本',
      x: 0,
      y: 0,
      fontSize: 10,
      textAnchor: 'middle'
    }
  },
  startAngle: {
    type: Number,
    default: 0
  },
  lightShow: {
    type: Boolean,
    default: false
  },
  lightAngle: {
    type: Number,
    default: 14
  },
  lightDelay: {
    type: [Number, String],
    default: 0
  },
  lightDuration: {
    type: [Number, String],
    default: 3000
  },
  // 格式符号：目前支持【percent, divide, value】
  valueFormat: {
    type: String,
    default: 'percent'
  },
  // 超过3的为正N边形，0为圆
  sideNum: {
    type: [String, Number],
    default: 0
  },
  // 颜色
  visualMap: {
    type: Array,
    default: () => [
      { value: 60, color: '#04a7f9' },
      { value: 80, color: '#fdea00' },
      { value: 100, color: '#fd4000' }
    ]
  },
  name: {
    type: String,
    default: ''
  },
  // 扫描配置；时间（单位：s）
  lightConfig: {
    type: [Object, Array],
    default: {
      duration: 9,
      delay: 0
    }
  },
  backgroundFill: {
    type: [Object, Array],
    default: {
      color: '',
      opacity: 0.4
    }
  },
  valueFill: {
    type: [Object, Array],
    default: {
      color: '#33bbff',
      opacity: 1,
      x: 0,
      y: 0,
      fontSize: 20,
      textAnchor: 'middle'
    }
  },
  // 阴影等级，从【0-3】越高阴影越深，层级越丰富
  shadowLevel: {
    type: [String, Number],
    default: 2
  },
  // 阴影模糊比例
  shadowBlur: {
    type: [String, Number],
    default: 10
  },
  // 阴影透明度
  shadowOpactiy: {
    type: [String, Number],
    default: 0.1
  }
}

export default config
