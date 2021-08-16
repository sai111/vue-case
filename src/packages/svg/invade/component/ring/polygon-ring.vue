<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    preserveAspectRetio="xMidYMid meet"
    width="100%"
    height="100%"
    x="0%"
    y="0%"
    :viewBox="viewBox"
  >
    <defs>
      <!-- 样本1，offsetblur，高斯模糊1，放大1，偏移0，透明度0.8 -->
      <filter :id="`${timeScopd}-shadow`" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" :stdDeviation="shadowBlur" result="blur1" />
        <feFlood :flood-color="colorFamily[4]" :flood-opacity="shadowOpactiy" result="color1" />
        <feOffset dx="0" dy="0" in="blur1" result="offsetBlur1" />
        <feComposite in="color1" in2="offsetBlur1" operator="in" result="interactive1" />
        <feComposite in="interactive1" in2="SourceAlpha" operator="out" result="interactive2" />
        <feFlood :flood-color="colorFamily[0]" :flood-opacity="backgroundFill.opacity" result="mainColor" />
        <feComposite in="mainColor" in2="SourceGraphic" operator="in" result="main" />
        <feMerge>
          <feMergeNode in="main" />
          <feMergeNode in="interactive2" />
        </feMerge>
      </filter>
      <!-- 左上 -->
      <linearGradient :id="`${timeScopd}-gradient-1`" x1="0" y1="1" x2="1" y2="0">
        <stop :offset="startOffset" :stop-color="colorFamily[3]" :stop-opacity="valueFill.opacity" />
        <stop :offset="endOffset" :stop-color="colorFamily[4]" :stop-opacity="valueFill.opacity" />
      </linearGradient>
      <!-- 右上 -->
      <linearGradient :id="`${timeScopd}-gradient-2`" x1="0" y1="0" x2="1" y2="1">
        <stop :offset="halfOffset" :stop-color="colorFamily[0]" stop-opacity="0" />
        <stop :offset="startOffset" :stop-color="colorFamily[0]" :stop-opacity="backgroundFill.opacity" />
        <stop :offset="endOffset" :stop-color="colorFamily[1]" :stop-opacity="valueFill.opacity" />
      </linearGradient>
      <!-- 右下 -->
      <linearGradient :id="`${timeScopd}-gradient-3`" x1="1" y1="0" x2="0" y2="1">
        <stop :offset="startOffset" :stop-color="colorFamily[1]" :stop-opacity="valueFill.opacity" />
        <stop :offset="endOffset" :stop-color="colorFamily[2]" :stop-opacity="valueFill.opacity" />
      </linearGradient>
      <!-- 左下 -->
      <linearGradient :id="`${timeScopd}-gradient-4`" x1="1" y1="1" x2="0" y2="0">
        <stop :offset="startOffset" :stop-color="colorFamily[2]" :stop-opacity="valueFill.opacity" />
        <stop :offset="endOffset" :stop-color="colorFamily[3]" :stop-opacity="valueFill.opacity" />
      </linearGradient>
      <!-- 扫光颜色 -->
      <linearGradient :id="`${timeScopd}-light-gradient`" x1="0" y1="1" x2="1" y2="1">
        <stop offset="0%" :stop-color="colorFamily[4]" stop-opacity="0" />
        <stop offset="30%" :stop-color="colorFamily[4]" stop-opacity="0.2" />
        <stop offset="90%" :stop-color="colorFamily[4]" stop-opacity="0.9" />
        <stop offset="99%" :stop-color="colorFamily[5]" stop-opacity="1" />
        <stop offset="100%" stop-color="#fff" stop-opacity="1" />
      </linearGradient>
      <!--<clipPath :id="`${timeScopd}-value-clip-path`">
        <path :d="drawPath(rate, true)" stroke="none" />
      </clipPath>-->
    </defs>
    <!-- colorFamily[0] :filter="`url(#${timeScopd}-shadow)`"-->
    <path
      class="polygon-ring"
      :d="drawPath(1)"
      stroke="red"
      stroke-width="2"
      fill="none"
    />
    <!--<path
      stroke="none"
      :fill="colorFamily[0]"
      :filter="`url(#${timeScopd}-shadow)`"
      d="M166.66666666666669,51.666666666666686  L266.25958810187717,224.16666666666666 L67.07374523145626,224.16666666666674"
    />-->
    <!-- 绘制四个矩形 -->
    <g class="gradients-clip" :clip-path="`url(#${timeScopd}-value-clip-path)`">
      <!-- 左上 -->
      <!--<rect :x="width-rectRadius" :y="width-rectRadius" :width="rectRadius-1" :height="rectRadius+1" :fill="`url(#${timeScopd}-gradient-1)`" />-->
      <!-- 右上 -->
      <!--<rect :x="width+2" :y="width-rectRadius" :width="rectRadius-1" :height="rectRadius+1" :fill="`url(#${timeScopd}-gradient-2)`" />-->
      <!-- 右下 -->
      <!--<rect :x="width" :y="width" :width="rectRadius+1" :height="rectRadius+1" :fill="`url(#${timeScopd}-gradient-3)`" />-->
      <!-- 左下 -->
      <!--<rect :x="width-rectRadius" :y="width" :width="rectRadius+2" :height="rectRadius+1" :fill="`url(#${timeScopd}-gradient-4)`" />-->
      <!-- light -->
      <!--<rect
        v-if="lightEnable&&!this.isPolygon"
        :width="lightWidth"
        :height="lightHeight"
        :x="width-lightWidth/ 2"
        :y="width-radius - lightHeight / 2"
        :fill="`url(#${timeScopd}-light-gradient)`"
        style="transform-origin:center;"
      >
       <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        form="0"
        to="360"
        begin="0"
        :dur="`${lightConfig.duration / 1000}s`"
        fill="freeze"
        repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;0;0;"
          keyTimes="0;0.1;0.45;1"
          begin="0"
          :dur="`${lightConfig.duration / 1000}s`"
          fill="freeze"
          repeatCount="indefinite"
        />
      </rect>-->
    </g>
    <!-- 文本 -->
    <g class="text">
      <text
        class="text-value"
        :x="width + valueFill.x"
        :y="width + valueFill.y"
        :fill="colorFamily[4]"
        :text-anchor="title.textAnchor"
        :font-size="valueFill.fontSize"
      >
        {{ formatValueText }}
      </text>
    </g>
    <!-- 插槽 -->
    <slot name="slider" :x="endPoint.x" :y="endPoint.y" />
  </svg>
</template>
<script>
import config from './config.js'
import Color from '@/lib/storyboard/color.js'
import VisualMap from '@/lib/storyboard/visualMap.js'
import FloodStrorage from '@/lib/storyboard/floodStorage.js'
export default {
  name: 'PolygonRing',
  props: config,
  data() {
    return {
      radian: Math.PI * 2,
      timeScopd: (new Date()).getTime(),
      visualMapObj: null,
      store: { value: 0 },
      floodStorage: null,
      endPoint: {
        x: -100,
        y: 100
      }
    }
  },
  computed: {
    width() {
      return this.radius / this.occupy
    },
    viewBox() {
      return `0 0 ${this.width * 2} ${this.width * 2}`
    },
    degreen() {
      return 360 / this.sideNum
    },
    rad_a_base() {
      return Math.PI * 2 / this.sideNum
    },
    rate() {
      if (this.sum === 0 || this.store.value / this.sum < 0) {
        console.error(`错误的数据传入${this.store.value}/${this.sum}`)
      }
      return this.store.value / this.sum
    },
    visualFill() {
      if (this.visualMapObj) {
        return this.visualMapObj.filter(this.store.value / this.sum * 100) || this.valueFill.color
      } else {
        return this.valueFill.color
      }
    },
    isPolygon() {
      return this.sideNum && this.sideNum > 2
    },
    // 渐变颜色区域
    startOffset() {
      return `${Math.ceil(this.ringWidth / this.radius * 100)}%`
    },
    halfOffset() {
      return `${Math.ceil(this.ringWidth / this.radius * 100 / 2)}%`
    },
    endOffset() {
      return `${Math.floor(100 - this.ringWidth / this.radius * 100)}%`
    },
    formatValueText() {
      if (this.valueFormat === 'percent') return Math.round(this.floodStorage.value / this.sum * 100) + '%'
      if (this.valueFormat === 'divide') return Math.round(this.floodStorage.value) + '/' + this.sum
      return Math.round(this.floodStorage.value)
    },
    textFormat() {
      const result = []
      for (let i = 0; i < this.sideNum; i++) {
        const rad_a = i * this.rad_a_base
        result[i] = {
          text: i + '*' + (' ' + this.degreen).slice(0, 5) + '°',
          x: this.width + Math.sin(rad_a) * this.radius + i * 10 * Math.sin(rad_a),
          y: this.width - Math.cos(rad_a) * this.radius - i * 10 * Math.cos(rad_a)
        }
      }
      return result
    },
    usedRingWidth() {
      return this.valueRingWidth || this.ringWidth
    },
    lightArc() {
      return this.lightAngle * Math.PI / 180
    },
    lightWidth() {
      // 弧长=nR/180（半径为R的圆,圆心角为n°）
      return this.lightArc * (this.radius + this.usedRingWidth * 0.5) * 2
    },
    lightHeight() {
      return (this.radius + this.usedRingWidth * 0.5) - Math.cos(this.lightAngle * this.lightArc) * (this.radius - this.usedRingWidth * 0.5)
    },
    rectRadius() {
      return this.radius + this.usedRingWidth * 0.5
    },
    colorFamily() {
      if (this.visualMapObj) {
        const all = new Color(this.visualFill)
        all.getHSL()
        return [
          all.getFamilyColor(0.8, 0.3).get16String(),
          all.getFamilyColor(0.9, 0.35).get16String(),
          all.getFamilyColor(0.95, 0.42).get16String(),
          all.getFamilyColor(1, 0.48).get16String(),
          all.getFamilyColor(1, 0.55).get16String(),
          all.getFamilyColor(1, 0.8).get16String()
        ]
      } else {
        const all = new Color(this.visualFill)
        all.getHSL()
        return [
          all.getFamilyColor(0.8, 0.2).get16String(),
          all.getFamilyColor(0.9, 0.35).get16String(),
          all.getFamilyColor(0.95, 0.42).get16String(),
          all.getFamilyColor(1, 0.48).get16String(),
          all.getFamilyColor(1, 0.55).get16String(),
          all.getFamilyColor(1, 0.8).get16String()
        ]
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        if (this.floodStorage) {
          this.floodStorage.value = Math.min(Math.max(val, 0), this.sum)
        }
      },
      immediate: true
    },
    visualMap() {
      this.initVisualMap()
    }
  },
  created() {
    this.floodStorage = new FloodStrorage(this.store, [
      { key: 'value', speed: this.sum / 2 }
    ])
  },
  mounted() {
    if (this.value) {
      this.floodStorage.value = Math.min(Math.max(this.value, 0), this.sum)
    }
    this.initVisualMap()
  },
  beforeDestroy() {
    this.visualMapObj = null
    this.floodStorage.destroy()
    this.floodStorage = null
  },
  methods: {
    clamp(value, a, b) {
      if (a < b) {
        return Math.max(a, Math.min(b, value))
      } else {
        return Math.max(b, Math.min(a, value))
      }
    },
    initVisualMap() {
      if (!this.visualMap) {
        if (this.visualMapObj) {
          this.visualMapObj.initArr()
        }
      } else {
        this.visualMapObj = new VisualMap({ visualMap: this.visualMap })
      }
    },
    // 先绘制图形再绘制进度
    drawPath(rate = 1, isValue = false) {
      const ringWidth = isValue ? this.usedRingWidth : this.ringWidth
      const radius = this.radius + ringWidth * 0.5
      const tmp = Math.asin(ringWidth / 2 / (radius - ringWidth / 2)) / Math.PI / 2
      rate = rate - (isValue && !this.isPolygon ? tmp * rate : 0)
      const innerRadius = radius - ringWidth + (isValue ? 0 : 1)
      const settings = {
        ringWidth: ringWidth,
        radius: radius,
        innerRadius: innerRadius
      }
      if (this.isPolygon) {
        return this.drawDragram(rate, isValue, settings)
      } else {
        return this.drawCircle(rate, isValue, settings)
      }
    },
    // 绘制图形
    drawDragram(rate = 1, isValue = false, settings) {
      const { radius, ringWidth, innerRadius } = settings
      let i = 1
      let sideArc = `M${this.width},${this.width - radius} `
      for (; i < this.sideNum && i / this.sideNum < rate; i++) {
        const angle = this.radian * i / this.sideNum
        sideArc += `L${this.width + Math.sin(angle) * radius},${this.width - Math.cos(angle) * radius} `
      }
      i--
      // 在上下两个点中间插值取出当前点
      const iRate = i / this.sideNum
      const numRate = 1 / this.sideNum
      const i0 = this.radian * iRate
      const i1 = this.radian * (i + 1) / this.sideNum
      const x = (rate - iRate) / numRate * (Math.sin(i1) - Math.sin(i0)) + Math.sin(i0)
      const y = (rate - iRate) / numRate * (Math.cos(i1) - Math.cos(i0)) + Math.cos(i0)
      sideArc += `L${this.width + x * radius},${this.width - y * radius} `
      const angle = (i + 0.5) / this.sideNum * this.radian
      // 弧长=nR/180（半径为R的圆,圆心角为n°）
      const width = Math.sin((this.sideNum - 2) / this.sideNum * Math.PI / 2) * ringWidth
      const x2 = this.clamp(x * radius - Math.sin(angle) * width, Math.sin(i0) * innerRadius, Math.cos(i1) * innerRadius)
      const y2 = this.clamp(y * radius - Math.cos(angle) * width, Math.cos(i0) * innerRadius, Math.cos(i1) * innerRadius)
      // 中间点
      sideArc += `L${this.width - x2}, ${this.width - y2} `
      // 结束点
      for (; i >= 0; i--) {
        const angle = this.radian * i / this.sideNum
        console.log(i, 'ii')
        sideArc += `L${this.width + Math.sin(angle) * innerRadius},${this.width - Math.cos(angle) * innerRadius} `
      }
      sideArc += 'Z'
      return sideArc
    },
    // 绘制环
    drawCircle(rate, isValue = false, settings) {
      const angle = rate * Math.PI * 2
      const { radius, ringWidth, innerRadius } = settings
      const sinr = Math.sin(angle) * radius
      const cosr = Math.cos(angle) * radius
      const sinr2 = Math.sin(angle) * innerRadius
      const cosr2 = Math.cos(angle) * innerRadius
      if (isValue) {
        this.endPoint = {
          x: this.width + sinr,
          y: this.width - cosr
        }
      }
      const start = `M${this.width},${this.width - radius} `
      // roundHead为false
      const rArcGt2 = `A${radius}, ${radius} 0 0,1 ${this.width},${this.width + radius} A${radius},${radius} 0 0,1 ${this.width + sinr}, ${this.width - cosr} `
      const rArcLt2 = `A${radius}, ${radius} 0 0,1 ${this.width + sinr},${this.width - cosr} `
      // roundHead
      const roundArc = `A${ringWidth * 0.5},${ringWidth * 0.5} 0 1,1 ${this.width + sinr2},${this.width - cosr2} `
      const LTInner = `L${this.width + sinr2}, ${this.width - cosr2} `
      // inner
      const inArcGt2 = `A${innerRadius},${innerRadius} 0 0,0 ${this.width},${this.width + innerRadius} A${innerRadius},${innerRadius} 0 0,0 ${this.width},${this.width - innerRadius} `
      const inArcLt2 = `A${innerRadius},${innerRadius} 0 0,0 ${this.width},${this.width - innerRadius} `
      return `${start}
        ${rate > 0.5 ? rArcGt2 : rArcLt2}
        ${this.roundHead && isValue ? roundArc : LTInner}
        ${rate > 0.5 ? inArcGt2 : inArcLt2}
        Z`
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
