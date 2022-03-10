<template>
  <div class="step-li-svg">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="none"
      width="100%"
      :height="height"
      x="0%"
      y="0%"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <path
        :d="drawPath(index)"
        :fill="stepIndex >= index ? '#51B253' :'#ACB3C1'"
        stroke="none"
      />
    </svg>
    <div class="step-li-svg-title">{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: 'ExtendStep',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    index: {
      type: [Number, String],
      default: 1
    }
  },
  data () {
    return {
      width: 500,
      height: 35
    }
  },
  computed: {
    cx () {
      return this.width / 2
    },
    cy () {
      return this.height / 2
    },
    distance () {
      return 5
    },
    stepIndex () {
      return this.$parent.stepIndex
    }
  },
  methods: {
    drawPath (index) {
      const commonPath = `M0,0 L${this.width - this.cy}, 0 L${this.width},${this.cy} L${this.width - this.cy}, ${this.height}`
      const path1 = commonPath + `L0,${this.height} L0,0`
      const path2 = commonPath + `L0, ${this.height} L${this.cy},${this.cy} L0,0`
      const path3 = `M0,0 L${this.width},0 L${this.width}, ${this.height} L0, ${this.height} L${this.cy}, ${this.cy} L0,0`
      const pathList = {
        1: path1,
        2: path2,
        3: path3
      }
      return pathList[index]
    }
  }
}
</script>
<style scoped lang="scss">
svg {
  font-family: PingFangSC-Regular, PingFang SC;
}
.step-li-svg {
  position: relative;
  .step-li-svg-title {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 13px;
    font-weight: 400;
  }
}
</style>
