<template>
  <div class="progress" :style="progressStyle">
    <svg
      class="progress-svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRetio="xMidYMid meet"
      width="100%"
      height="100%"
      x="0%"
      y="0%"
      :viewBox="viewBox"
      :style="{ opacity: breatheOpacity }"
    >
      <defs>
        <filter
          v-if="filterLevel > 0"
          :id="`progress-svg-filter-${timeScopd}`"
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
        >
          <!-- 颜色1 -->
          <feGaussianBlur in="SourceGraphic" :stdDeviation="5 * filterBlur" result="blur5" />
          <feFlood :flood-color="baseColor" :flood-opacity="0.9 * filterOpacity" result="color5" />
          <feOffset dx="0" dy="0" in="blur5" result="offsetBlur5" />
          <feComposite in="color5" in2="offsetBlur5" result="colorBlur5" />
          <feComposite
            :in="isGradient ? 'offsetBlur5' : 'colorBlur5'"
            in2="SourceAlpha"
            operator="out"
            result="comp5"
          />
          <!-- 颜色2 -->
          <feGaussianBlur in="SourceGraphic" :stdDeviation="10 * filterBlur" result="blur10" />
          <feFlood :flood-color="baseColor" :flood-opacity="0.9 * filterOpacity" result="color10" />
          <feOffset dx="0" dy="0" in="blur10" result="offsetBlur10" />
          <feComposite in="color10" in2="offsetBlur10" result="colorBlur10" />
          <feComposite
            :in="isGradient ? 'offsetBlur10' : 'colorBlur10'"
            in2="SourceAlpha"
            operator="out"
            result="comp10"
          />
          <!-- 颜色3 -->
          <feGaussianBlur in="SourceGraphic" :stdDeviation="20 * filterBlur" result="blur20" />
          <feFlood :flood-color="baseColor" :flood-opacity="0.9 * filterOpacity" result="color20" />
          <feOffset dx="0" dy="0" in="blur20" result="offsetBlur20" />
          <feComposite in="color20" in2="offsetBlur20" result="colorBlur20" />
          <feComposite
            :in="isGradient ? 'offsetBlur20' : 'colorBlur20'"
            in2="SourceAlpha"
            operator="out"
            result="comp20"
          />
          <!-- 融合 -->
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode v-if="filterLevel > 0" in="comp5" />
            <feMergeNode v-if="filterLevel > 1" in="comp10" />
            <feMergeNode v-if="filterLevel > 2" in="comp20" />
          </feMerge>
        </filter>
        <mask :id="`progress-svg-mask-${timeScopd}`">
          <rect
            fill="#fff"
            x="0"
            y="0"
            :width="maskWidth"
            :height="maskHeight"
            :transform="`translate(${maskX}, ${maskY}) ${isVertical ? 'skewY' : 'skewX'}(${angle})`"
          />
        </mask>
      </defs>
      <!-- 插槽 -->
      <slot name="before" :rects="rects" :rate="currentRate" />
      <!-- 底部 -->
      <g class="progress-bottom">
        <template v-if="patternId">
          <use
            v-for="(item, index) in rects"
            :key="'progress-svg-use-bottom-' + index"
            :xlink:href="`#${inactivePatternId || patternId}`"
            :x="getX(item.pos)"
            :y="getY(item.pos)"
            :width="rectWidth"
            :height="rectHeight"
            :fill="baseColor || item.color"
          />
        </template>
        <template v-else>
          <rect
            v-for="(item, index) in rects"
            :key="'progress-svg-rect-bottom-' + index"
            :x="0"
            :y="0"
            :rx="radius"
            :ry="radius"
            :width="rectWidth"
            :height="rectHeight"
            :transform="`translate(${getX(item.pos)}, ${getY(item.pos)}) ${
              isVertical ? 'skewY' : 'skewX'
            }(${angle})`"
            :fill="baseColor || item.color"
          />
        </template>
      </g>
      <!-- 覆盖 -->
      <g :mask="`url(#progress-svg-mask-${timeScopd})`">
        <template v-if="patternId">
          <use
            v-for="(item, index) in rects"
            :key="'progress-svg-use-' + index"
            :xlink:href="`#${patternId}`"
            :x="getX(item.pos)"
            :y="getY(item.pos)"
            :width="rectWidth"
            :height="rectHeight"
            :fill="item.color"
          />
        </template>
        <template v-else>
          <rect
            v-for="(item, index) in rects"
            :key="'progress-svg-rect-' + index"
            :x="0"
            :y="0"
            :rx="radius"
            :ry="radius"
            :width="rectWidth"
            :height="rectHeight"
            :transform="`translate(${getX(item.pos)}, ${getY(item.pos)}) ${
              isVertical ? 'skewY' : 'skewX'
            }(${angle})`"
            :fill="item.color"
            :filter="`url(#progress-svg-filter-${timeScopd})`"
          />
        </template>
      </g>
      <!-- 插槽 -->
      <slot name="after" :rects="rects" :rate="currentRate" />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'ProgressSvg',
  props: {
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 56
    },
    // 图案填充
    patternId: {
      type: String,
      default: ''
    },
    inactivePatternId: {
      type: String,
      default: ''
    },
    rate: {
      type: [Number, String],
      default: 0.5
    },
    // 方向[能量上涨的方向 left/right/top/bottom]
    direction: {
      type: String,
      default: 'right',
      validator(val) {
        if (!['left', 'right', 'top', 'bottom'].includes(val)) {
          console.error('direction可选值在left/right/top/bottom')
          return false
        }
        return true
      }
    },
    // 间距-margin
    margin: {
      type: Object,
      default: () => {
        return { x: 10, y: 10 }
      }
    },
    // 间距-itemGap占比
    itemGap: {
      type: [Number, String],
      default: 0.2
    },
    // 个数
    num: {
      type: Number,
      default: 10
    },
    // 角度
    angle: {
      type: Number,
      default: 30
    },
    // 颜色
    color: {
      type: [String, Array],
      default: () => {
        return [
          { value: 0, color: '#ffae00' },
          { value: 1, color: '#ffae00' }
        ]
      }
    },
    // 底色
    baseColor: {
      type: [String, Object],
      default: '#eee'
    },
    // 圆角
    radius: {
      type: Number,
      default: 0
    },
    // 动画加载时间（单位：秒）
    chargeSpeed: {
      type: [Number, String],
      default: 0.4
    },
    filterBlur: {
      type: Number,
      default: 1
    },
    filterOpacity: {
      type: Number,
      default: 0.8
    },
    // 等级区间【0-3】越高越发光
    filterLevel: {
      type: Number,
      default: 1
    },
    // 呼吸灯
    breathe: {
      type: Boolean,
      default: false
    },
    // 呼吸灯持续时间（单位：秒）
    breatheDuration: {
      type: Number,
      default: 3
    },
    // 最小呼吸值
    breatheMin: {
      type: Number,
      default: 0.6
    },
    // 呼吸大小
    breatheRate: {
      type: Number,
      default: 1.2
    }
  },
  data() {
    return {
      // 全局唯一的作用域标志
      timeScopd: (new Date()).getTime(),
      currentRate: 0,
      activates: null, // 有数据的补充为0
      rateChanged: false, // 数据是否有改变
      firstFlag: false, // 第一次挂载
      tickFlag: false,
      destryedFlag: false, // 是否销毁实例
      currentTime: 0,
      isGradient: false,
      breatheFlag: false,
      breatheValue: 0,
      breatheStartTime: 0
    }
  },
  computed: {
    progressStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    },
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    angleTrans() {
      return `rotate(${this.angle}deg)`
    },
    // 这里的方向是指能量上涨的方向
    isVertical() {
      return this.direction === 'top' || this.direction === 'bottom'
    },
    absSkewLength() {
      const angleL = Math.abs(Math.tan(this.angle * Math.PI / 180))
      const w = this.width - this.margin.x * 2
      const h = this.height - this.margin.y * 2
      return (this.isVertical ? w : h) * angleL
    },
    maskX() {
      return this.isVertical ? 0 : this.getX(this.offset, this.maskWidth)
    },
    maskY() {
      return this.isVertical ? this.getY(this.offset, this.maskHeight) : 0
    },
    maskWidth() {
      if (this.isVertical) {
        return this.width
      } else {
        return (this.width - this.margin.x * 2 - this.absSkewLength) * this.currentRate / this.num
      }
    },
    maskHeight() {
      if (this.isVertical) {
        return (this.height - this.margin.y * 2 - this.absSkewLength) * this.currentRate / this.num
      } else {
        return this.height
      }
    },
    unit() {
      let result
      const numPadding = this.num + (this.num - 1) * this.itemGap
      if (this.isVertical) {
        result = (this.height - this.margin.y * 2 - this.absSkewLength) / numPadding
      } else {
        result = (this.width - this.margin.x * 2 - this.absSkewLength) / numPadding
      }
      return result
    },
    offset() {
      return (
        (this.angle < 0 && this.direction === 'right') ||
        (this.angle > 0 && this.direction === 'left') ||
        (this.angle > 0 && this.direction === 'top') ||
        (this.angle < 0 && this.direction === 'bottom')
      ) ? this.absSkewLength : 0
    },
    rectWidth() {
      if (this.isVertical) return this.width - this.margin.x * 2
      else return this.unit
    },
    rectHeight() {
      if (this.isVertical) return this.unit
      else return this.height - this.margin.y * 2
    },
    rateNum() {
      return this.num * this.rate
    },
    rects() {
      const result = []
      for (let i = 0; i < this.num; i++) {
        const rect = {
          pos: i * (1 + this.itemGap) * this.unit + this.margin[this.isVertical ? 'y' : 'x'] + this.offset
        }
        if (this.gradientRGB) {
          const rate = i / this.num
          var flag = true
          for (let j = 0; j < this.gradientRGB.length && flag; j++) {
            const stop = this.gradientRGB[j]
            if (rate < stop.value) {
              if (j === 0) {
                flag = false
                rect.color = `rgb(${stop.r}, ${stop.g}, ${stop.b})`
              } else {
                const lastStop = this.gradientRGB[j - 1]
                const k1 = (stop.value - rate) / (stop.value - lastStop.value)
                const k2 = 1 - k1
                flag = false
                rect.color = `rgb(${Math.round(stop.r * k2 + lastStop.r * k1)},${Math.round(stop.g * k2 + lastStop.g * k1)},${Math.round(stop.b * k2 + lastStop.b * k1)})`
              }
            }
          }
        }
        result.push(rect)
      }
      return result
    },
    gradientRGB() {
      if (!this.color) return false
      let result
      if (typeof this.color === 'string') {
        this.isGradient = false
        result = this.color
      } else {
        this.isGradient = true
        var reg = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
        this.color.forEach((v) => {
          let sColor = v.color.toLowerCase()
          if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
              let sColorNew = '#'
              for (let i = 0; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
              }
              sColor = sColorNew
            }
            const sColorChange = []
            for (let i = 1; i < 7; i += 2) {
              sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
            }
            v.r = sColorChange[0]
            v.g = sColorChange[1]
            v.b = sColorChange[2]
          }
        })
        result = this.color
      }
      return result
    },
    // 呼吸灯透明度
    breatheOpacity() {
      if (this.breathe) {
        return this.breatheValue
      } else {
        return 1
      }
    }
  },
  watch: {
    num: {
      handler(val) {
        this.activates = []
        for (let i = 0; i < val; i++) {
          this.activates.push(0)
        }
      },
      immediate: true
    },
    rate: {
      handler(val) {
        this.rateChanged = true
        this.checkRate()
      },
      immediate: true
    }
  },
  mounted() {
    this.firstFlag = true
    this.checkRate()
  },
  beforeDestroy() {
    this.destryedFlag = true
  },
  methods: {
    getX(rectPos, length = this.unit) {
      if (this.direction === 'left') return this.width - rectPos - length
      else if (this.direction === 'right') return rectPos
      else return this.margin.x
    },
    getY(rectPos, length = this.unit) {
      if (this.direction === 'top') return this.height - rectPos - length
      else if (this.direction === 'bottom') return rectPos
      else return this.margin.y
    },
    checkRate() {
      if (!this.activates) {
        console.error('检查配置项，目前没有可配置的能量槽')
      } else {
        if (this.rateChanged && this.firstFlag && !this.tickFlag) {
          this.startTick()
        }
      }
    },
    startTick() {
      if (this.destryedFlag) return false
      this.currentTime = Date.now()
      this.tickFlag = true
      requestAnimationFrame(this.lengthTick)
      if (this.breathe && !this.breatheFlag) {
        this.breatheFlag = true
        this.breatheStartTime = this.currentTime
        requestAnimationFrame(this.breatheTick)
      }
    },
    breatheTick() {
      if (this.destryedFlag) return false
      const timeDiff = Date.now() - this.breatheStartTime
      if (timeDiff > 0) {
        this.breatheValue = Math.sin(timeDiff / (this.breatheDuration * 1000) * Math.PI) * (1 - this.breatheMin) + 0.5 + this.breatheMin / 2
        this.breatheValue *= this.breatheRate
        requestAnimationFrame(this.breatheTick)
      }
    },
    lengthTick() {
      if (this.destryedFlag) return false
      const now = Date.now()
      const speed = this.chargeSpeed * 1000
      // 时间范围
      const timeDiff = ((now - this.currentTime) || 15) / speed
      this.currentTime = now
      const isAdd = this.currentRate < this.rateNum ? 1 : -1
      this.currentRate += timeDiff * isAdd
      if (this.currentRate < 0) this.currentRate = 0
      if (this.currentRate > this.num) { this.currentRate = 0 }
      if ((this.currentRate > this.rateNum && isAdd === 1) ||
        (this.currentRate < this.rateNum && isAdd === -1)
      ) { this.currentRate = this.rateNum }
      if (this.rateNum !== this.currentRate) {
        requestAnimationFrame(this.lengthTick)
      } else {
        this.tickFlag = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.progress {
  margin-bottom: 30px;
  .progress-svg {
    margin: 0 auto;
    border: 1px solid #000;
  }
}
</style>
