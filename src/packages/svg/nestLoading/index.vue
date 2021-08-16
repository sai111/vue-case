<template>
  <div class="nest-loading">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRetio="xMidYMid meet"
      width="100%"
      height="100%"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <defs>
        <linearGradient id="normal-index-circle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(47, 168, 85, 0.29)" />
          <stop offset="100%" stop-color="rgba(24, 84, 43, 0.3)" />
        </linearGradient>
        <linearGradient id="active-index-circle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(47, 168, 85, 0.89)" />
          <stop offset="100%" stop-color="rgba(24, 84, 43, 0.89)" />
        </linearGradient>
        <linearGradient id="active-rect" x1="25%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(66, 76, 102, 0.6)" />
          <stop offset="100%" stop-color="rgba(49, 192, 92, 0.36)" />
        </linearGradient>
      </defs>
      <g class="circle">
        <circle v-bind="innerCircle" class="inner" />
        <circle v-bind="outCircle" class="out" />
        <path :d="trackPath" stroke="rgba(49, 192, 92, 0.6)" fill="none" stroke-linecap="round" stroke-width="10" :style="circlePathStyle" />
      </g>
      <g class="group">
        <g
          v-for="(item, index) in textList"
          :key="'group-li-'+index"
          :transform="formatTransform(index)"
          :class="((value / 100 )> ((index) / 9))?'active-range':''"
        >
          <rect x="-70" y="-25" width="160" height="40" rx="18" ry="18" stroke="none" class="rect-box" />
          <circle cx="-51" cy="-5" r="18" class="index-circle" />
          <text x="-56" y="1" class="index-text">
            {{ index + 1 }}
          </text>
          <text x="-26" dominant-baseline:middle class="label-text">
            {{ item }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'NestLoading',
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 800
    },
    height: {
      type: [Number, String],
      default: 800
    }
  },
  data() {
    return {
      textList: [
        '文件载入引擎',
        '文件解包',
        '文件Hash计算',
        '配置信息解析',
        '隐私资源解析',
        '动态抓包分析',
        '智能模拟分析',
        '引擎释放',
        '完成分析'
      ]
    }
  },
  computed: {
    radius() {
      return (Math.min(this.width, this.height)) / 4
    },
    innerCircle() {
      return {
        cx: this.width / 2,
        cy: this.height / 2,
        r: this.radius,
        stroke: 'none',
        fill: 'rgba(37, 43, 61, 0.8)'
      }
    },
    outCircle() {
      return {
        cx: this.width / 2,
        cy: this.height / 2,
        r: this.radius + 10,
        stroke: 'none',
        fill: 'rgba(37, 43, 61, 0.39)'
      }
    },
    perimeter() {
      return 2 * Math.PI * (this.radius + 40)
    },
    trackPath() {
      const radius = this.radius + 40
      return `m ${this.width / 2} ${this.height / 2 - radius}
          a ${radius} ${radius} 0 1 1 0 ${radius * 2}
          a ${radius} ${radius} 0 1 1 0 -${radius * 2}`
    },
    circlePathStyle() {
      return {
        strokeDasharray: `${this.perimeter * (this.value / 100)}px, ${this.perimeter}px`,
        strokeDashoffset: 0,
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
      }
    }
  },
  watch: {},
  mounted() {},
  methods: {
    formatTransform(index) {
      const angle = index * (Math.PI * 2 / 9)
      const x = Math.sin(angle) * (this.radius + 160) + this.width / 2
      const y = -Math.cos(angle) * (this.radius + 120) + this.height / 2
      return `translate(${x}, ${y})`
    }
  }
}
</script>
<style lang="scss" scoped>
.nest-loading {
  width: 80%;
  height: 60%;
  margin: 50px auto;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: url('./loding_绿色.png') center top/contain no-repeat;
  }
  .label-text {
    fill: rgba(47, 168, 85, 0.5);
    transition: all 0.6s;
  }
  .index-circle {
    fill: url(#normal-index-circle);
    transition: all 0.6s;
  }
  .index-text {
    font-size: 20px;
    fill: rgba(255, 255, 255, 0.4);
    transition: all 0.6s;
  }
  .rect-box {
    fill: #1c263c;
    stroke: none;
    transition: all 0.6s;
  }
  .active-range {
    .index-circle {
      fill: url(#active-index-circle);
      stroke: #349152;
      transition: all 0.6s;
    }
    .rect-box {
      fill: url(#active-rect);
      transition: all 0.6s;
    }
    .index-text {
      font-size: 20px;
      fill: #fff;
      transition: all 0.6s;
    }
    .label-text {
      font-size: 16px;
      fill: #31c05c;
      transition: all 0.6s;
    }
  }
}
</style>
