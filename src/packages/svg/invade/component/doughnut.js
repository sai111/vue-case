// doughnut.js
let vm = new Vue({
  el: '#app',
  data: {
    list: [ // 占比列表
      '30%',
      '20%',
      '10%',
      '5%',
      '8%',
      '2%',
      '15%',
      '3.33%',
      '3%',
      '3.64%',
    ],
    renderList: [], // 处理后用于渲染环形图的数据
    svgData: { // svg 数据 即画布参数
      width: 200,
      height: 200
    },
    arcData: { // 环形图参数
      r: 80, // 环形图的半径
      x0: 100, // 圆心x，一般把环形图放在画布中心位置就好
      y0: 100, // 同上
      stockWidth: 20 // 环形图的粗度...
    },
    colorMap: [ // 环形图颜色映射表
      '#3C76FF',
      '#36E1E2',
      '#92E27B',
      '#FAD850',
      '#F89E35',
      '#EA5486',
      '#EF4A4A',
      '#BF6FE4',
      '#6CBE6A',
      '#E1E1E1'
    ]
  },
  created() {
    this.renderList = this.handleChartData(this.list)
  },
  filters: {
    getPath(cur, arcData) {
      // 这里在通过 圆心(x0, y0) r ,拼接好路径数据
      const { x0, y0, r } = arcData
      let str = 'M'
      const isLargeArc = cur.relayPer > 50 ? 1 : 0
      const startX = cur.start.x * r + x0
      const startY = cur.start.y * r + y0
      const endX = cur.end.x * r + x0
      const endY = cur.end.y * r + y0
      str += ' ' + startX +
        ' ' + startY +
        ' ' + 'A' +
        ' ' + r +
        ' ' + r +
        ' ' + '0' +
        ' ' + isLargeArc +
        ' ' + '1' +
        ' ' + endX +
        ' ' + endY
      return str
    }
  },
  methods: {
    handleChartData(list) {
      // 这里按照 圆心点为(0,0), r 为 1 来处理
      const newList = [];
      list.forEach((item, index) => {
        const obj = {}
        let per = +item.split('%')[0]
        // 保留真实占比,后面需要判断是否是大小弧
        obj.relayPer = per
        const PI = Math.PI
        if (index !== 0) {
          per += newList[index - 1].per
        }
        // 因为是拼接，所以本次的终点要在之前的基础上，所要要累加占比
        obj.per = per
        const deg = (per / 100) * PI * 2
        obj.start = {}
        obj.end = {}
        if (index === 0) {
          obj.start.x = Math.cos(0)
          obj.start.y = Math.sin(0)
        } else {
          obj.start = newList[index - 1].end
        }
        obj.end.x = Math.cos(deg)
        obj.end.y = Math.sin(deg)
        newList.push(obj)
      })
      return newList
    }
  }
})
