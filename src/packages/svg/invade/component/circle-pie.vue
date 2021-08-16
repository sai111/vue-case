<template>
  <div class="circle-pie">
    <div class="button-wrap">
      <el-button
        :icon="play?'el-icon-video-play':'el-icon-video-pause'"
        circle
        size="mini"
        @click="handleClick()"
      />
      <el-button circle size="mini" @click="addValue()">
        累加
      </el-button>
    </div>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      x="0"
      y="0"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <!--#4886CD为深色值   #9DBFE4为中间值 可以随意修改-->
      <defs>
        <linearGradient id="left" x1="0%" y1="0" x2="100%" y2="0%">
          <stop offset="0%" stop-color=" #4886cd" />
          <stop offset="100%" stop-color=" #9DBFE4" />
          <!--右侧渐变---蓝到浅蓝渐变-->
        </linearGradient>
        <linearGradient id="right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color=" #4886cd" />
          <stop offset="100%" stop-color=" #9DBFE4" />
          <!--左侧渐变---浅蓝到白色渐变gradientUnits="userSpaceOnUse"-->
        </linearGradient>
        <!--裁切-->
        <template v-for="(item, index) in renderList">
          <clipPath :key="'clip-path-'+index" :id="`${index}_value_path`">
            <path :d="getPath(item, index)" stroke="red" stroke-width="2" />
          </clipPath>
        </template>
      </defs>
      <circle v-bind="dashCircle" />
      <circle v-bind="wholeCircle" />
      <circle v-bind="trackCircle" />
      <text
        :x="cx"
        :y="cy + 10"
        fill="#fff"
        stroke="none"
        text-anchor="middle"
        dominant-baseline:middle
        style="font-size: 40px"
      >
        {{ value }}
      </text>
      <!-- stroke-linecap="round" -->
      <path
        :d="trackPath"
        fill="none"
        stroke="url(#right)"
        stroke-width="10"
        :style="circlePathStyle"
      />
      <!--<template v-for="(item, index) in renderList">-->
        <!--<path
          :d="getPath(item, index)"
          stroke="none"
          :fill="`url(#${index>0?'left':'right'})`"
        />-->
      <!--</template>-->
    </svg>
  </div>
</template>
<script>
export default {
  name: 'CirclePie',
  components: {},
  props: {
    width: {
      type: [Number, String],
      default: 200
    },
    height: {
      type: [Number, String],
      default: 200
    },
    color: {
      type: String,
      default: '#4886cd'
    },
    radius: {
      type: [Number, String],
      default: 100
    }
  },
  data() {
    return {
      play: false,
      timer: null,
      value: 30
    }
  },
  computed: {
    cx() {
      return this.width / 2
    },
    cy() {
      return this.height / 2
    },
    renderList() {
      const list = [this.value / 2 + '%', this.value / 2 + '%']
      return this.chartData(list)
    },
    trackY() {
      return this.height / 2 - this.trackCircle.r
    },
    perimeter() {
      return this.radius * 2 * Math.PI
    },
    dashCircle() {
      return {
        cx: this.width / 2,
        cy: this.height / 2,
        r: this.radius,
        fill: 'none',
        stroke: '#9dbfe4',
        'stroke-width': 8,
        'stroke-dasharray': '5 10'
      }
    },
    wholeCircle() {
      return {
        cx: this.width / 2,
        cy: this.height / 2,
        r: this.radius + 25,
        fill: 'none',
        stroke: this.color,
        'stroke-width': 12
      }
    },
    trackCircle() {
      return {
        cx: this.width / 2,
        cy: this.height / 2,
        r: this.radius + 50,
        fill: 'none',
        stroke: 'rgba(157, 191, 228, 0.1)',
        'stroke-width': 12
      }
    },
    trackPerimeter() {
      return (this.trackCircle.r) * 2 * Math.PI
    },
    trackPath() {
      const radius = this.trackCircle.r
      return `m ${this.width / 2} ${this.height / 2 - radius}
        a ${radius} ${radius} 0 1 1 0 ${radius * 2}
        a ${radius} ${radius} 0 1 1 0 -${radius * 2}`
    },
    circlePathStyle() {
      return {
        strokeDasharray: `${this.trackPerimeter * (this.value / 100)}px, ${this.trackPerimeter}px`,
        strokeDashoffset: 0,
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
      }
    }
  },
  beforeDestroy() {
    this.clearTime()
  },
  mounted() {
    // this.initData()
  },
  methods: {
    addValue() {
      this.value++
    },
    clearTime() {
      window.clearInterval(this.timer)
      clearInterval(this.timer)
      this.timer = null
    },
    initData() {
      this.timer = setInterval(() => {
        this.value = (Math.random() * 100).toFixed(1)
      }, 1000)
    },
    chartData(list) {
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
          obj.start.x = Math.sin(0)
          obj.start.y = -Math.cos(0)
        } else {
          obj.start = newList[index - 1].end
        }
        obj.end.x = Math.sin(deg)
        obj.end.y = -Math.cos(deg)
        newList.push(obj)
      })
      return newList
    },
    getPath(item, index) {
      const lsLargeArc = item.relayPer > 50 ? 1 : 0
      // 内层
      const r = this.trackCircle.r + 6
      const startX = item.start.x * r + this.cx
      const startY = item.start.y * r + this.cy
      const outx1 = item.start.x * (r - 12) + this.cx
      const outy1 = item.start.y * (r - 12) + this.cy
      const outx2 = item.end.x * (r - 12) + this.cx
      const outy2 = item.end.y * (r - 12) + this.cy
      // 外层
      const r0 = this.trackCircle.r - 6
      const x0 = item.start.x * (r + 12) + this.cx
      const y0 = item.start.y * (r - 12) + this.cy
      const x1 = item.end.x * (r - 12) + this.cx
      const y1 = item.end.y * (r - 12) + this.cy
      const x3 = item.end.x * r + this.cx
      const y3 = item.end.y * r + this.cy
      // 已知圆心，半径，角度，求圆上的点坐标
      let str = ''
      if (index > 0) {
        str = `M ${startX} ${startY}
          L ${outx1} ${outy1}
          A ${r - 12} ${r - 12} 0 ${lsLargeArc} 1 ${outx2} ${outy2}
          L ${x3} ${y3}
          A ${r} ${r} 0 ${lsLargeArc} 0 ${startX} ${startY}
          Z`
      } else {
        str = `M ${startX} ${startY}
          L ${x0} ${y0}
          A ${r0} ${r0} 0 ${lsLargeArc} 1 ${x1} ${y1}
          L ${x3} ${y3}
          A ${r} ${r} 0 ${lsLargeArc} 0 ${startX} ${startY} Z`
      }
      return str
    },
    handleClick() {
      this.play = !this.play
    },
    circlePathStyle(index) {
      console.log(index, 'index----66666')
      if (index > 0) {
        return {
          strokeDasharray: `${this.trackPerimeter * (this.value / 100)}px, ${this.trackPerimeter}px`,
          strokeDashoffset: 0,
          transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.start-stop-progress {
  width: 100%;
  .button-wrap {
    color: #fff;
  }
  .animate-path {
    animation: load 1s linear infinite;
    transform-origin: center center;
  }
}
@keyframes load {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
