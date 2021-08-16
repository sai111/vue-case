<template>
  <div class="start-stop-progress">
    <div class="button-wrap">
      <el-button
        :icon="play?'el-icon-video-play':'el-icon-video-pause'"
        circle
        size="mini"
        @click="handleClick()"
      />
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
      <circle v-bind="dashCircle" />
      <circle v-bind="wholeCircle" />
      <circle v-bind="trackCircle" />
      <path
        :d="trackPath"
        :stroke="color"
        fill="none"
        stroke-linecap="round"
        stroke-width="10"
        :class="play?'animate-path':''"
        :style="circlePathStyle"
      />
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
    </svg>
  </div>
</template>
<script>
export default {
  name: 'StartStopProgress',
  components: {},
  props: {
    width: {
      type: [String, Number],
      default: 200
    },
    height: {
      type: [String, Number],
      default: 200
    },
    radius: {
      type: [String, Number],
      default: 100
    },
    color: {
      type: String,
      default: '#4886cd'
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
        width: 12,
        'stroke-width': 12
      }
    },
    trackPerimeter() {
      return (this.trackCircle.r) * 2 * Math.PI
    },
    trackY() {
      return this.height / 2 - this.trackCircle.r
    },
    perimeter() {
      return this.radius * 2 * Math.PI
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
    this.initData()
  },
  methods: {
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
    handleClick() {
      this.play = !this.play
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
