<template>
  <div ref="shape-container" class="svgShape">
    <svg
      class="shape-background"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRetio="xMidYMid meet"
      :width="width"
      :height="height"
      x="0"
      y="0"
      :viewBox="viewBox"
    >
      <defs>
        <filter id="border-shadow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur1" />
          <feFlood flood-color="#000" flood-opacity="0.4" result="color1" />
          <feComposite in="color1" in2="blur1" operator="in" result="colorBlur1" />
          <feMorpholopy in="colorBlur1" operator="dilate" radius="3" result="extendColorBlur1" />
          <feComposite in="extendColorBlur1" in2="SourceAlpha" operator="out" result="sampler1" />
        </filter>
        <pattern id="background" patternUnits="userSpaceOnUse" x="0" y="0" width="10" height="10">
          <path d="M0,0 L10,10" stroke="#28303e" stroke-opacity="0.9" />
        </pattern>
        <pattern id="rect-background" patternUnits="objectBoundingBox" width=".08" height=".4" patternTransform="rotate(145)">
          <rect width="18" height="18" fill="transparent" x="0" y="0" />
          <rect width="18" height="18" fill="#2fa855" fill-opacity="0.6" x="9" y="0" />
        </pattern>
      </defs>
      <g>
        <path :d="borderPath" filter="url(#border-shadow)" stroke-width="0" fill="#fff" fill-opacity="1" />
        <path :d="borderPath" stroke="#2fa855" stroke-width="2" stroke-opacity="0.6" fill="url(#background)" />
        <rect x="0" y="0" :width="width" height="18" fill="url(#rect-background)" />
        <path :d="`M0,0 L${width},0`" stroke="#2fa855" stroke-width="6" fill="none" />
      </g>
    </svg>
  </div>
</template>
<script>
import ResizeObserver from 'resize-observer-polyfill'
export default {
  name: 'SvgShape',
  props: {},
  data() {
    return {
      width: 0,
      height: 0
    }
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    borderPath() {
      return `M0,0
        L${this.width},0
        L${this.width},${this.height - 60}
        L${this.width - 30},${this.height - 30}
        L${this.width * 0.4},${this.height - 30}
        L${this.width * 0.4 - 50},${this.height}
        L0,${this.height} Z`
    },
    stripePath() {
      const width = 20
      const height = 30
      const angle = 15
      return `M0,0
        L${width},0
        L${width + Math.sin(angle) * height}, ${height}
        L${Math.sin(angle) * height}, ${height} Z`
    }
  },
  watch: {},
  beforeDestroy() {
    this.resizeObserver = null
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(this.resize)
    this.resizeObserver.observe(this.$refs['shape-container'])
    this.resize()
  },
  methods: {
    resize() {
      const { width, height } = this.$refs['shape-container'].getBoundingClientRect()
      this.width = width
      this.height = height
    }
  }
}
</script>
<style lang="scss" scoped>
.svgShape {
  height: 100%;
  height: 100%;
}
</style>
