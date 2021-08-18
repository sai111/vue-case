<template>
  <div class="progress-entry">
    progress组件
    <svg style="width: 0; height: 40px">
      <defs>
        <circle id="test-star" stroke="none" cx="15" cy="25" r="10" />
        <image id="test-shape-1" width="30" height="50" xlink:href="./assets/star.png" />
        <image id="test-shape-2" width="30" height="50" xlink:href="./assets/star-active.png" />
      </defs>
    </svg>
    <div class="progress-entry-box">
      <progress-svg v-bind="rightAside" />
      <progress-svg v-bind="rightAside" :direction="'left'" :angle="0" />
      <progress-svg v-bind="rightAside" :direction="'left'" :angle="30" />
      <progress-svg v-bind="rightAside" :angle="0" :breathe="breatheFlag" :pattern-id="'test-star'" />
      <progress-svg v-bind="rightAside" :angle="0" :pattern-id="'test-shape-2'" :inactive-pattern-id="'test-shape-1'" />
      <progress-svg v-bind="rightAside" :rate="1" :charge-speed="0.2" :angle="30" :color="gradientColor" />
    </div>
    <div class="progress-entry-box" style="display: flex">
      <progress-svg v-bind="otherObj" :angle="0" />
      <progress-svg v-bind="tickConfig" :angle="0" style="margin: 0 20px">
        <g slot="after" slot-scope="{ rects, rate }">
          <path fill="none" stroke="rgba(0,131,172,0.4)" :d="getAxisPath(rects, 'left')" />
          <path fill="none" stroke="rgba(0,131,172,0.4)" :d="getAxisPath(rects, 'right')" />
          <g class="anchor" :transform="getTransfrom(rects, rate)">
            <path :fill="getFill(rects, rate)" d="M4,0 L10,8 L4,8 L0,3Z" />
          </g>
        </g>
      </progress-svg>
    </div>
  </div>
</template>
<script>
import ProgressSvg from './index.vue'
export default {
  name: 'ProgressEntry',
  components: { ProgressSvg },
  data() {
    return {
      rightAside: {
        width: 400,
        height: 56,
        value: 30,
        max: 100,
        num: 12,
        rate: 0.5,
        margin: { x: 3, y: 3 },
        itemGap: 0.2,
        angle: -30,
        radius: 0,
        baseColor: '#eee',
        direction: 'right',
        filterBlur: 1,
        filterLevel: 1,
        filterOpacity: 0.8,
        color: [
          { value: 0, color: '#ffae00' },
          { value: 1, color: '#ffae00' }
        ],
        chargeWay: 'length',
        chargeSpeed: 0.4 // 动画加载时间（单位：秒）
      },
      otherObj: {
        height: 400,
        width: 56,
        value: 30,
        max: 100,
        num: 12,
        rate: 0.8,
        margin: { x: 3, y: 3 },
        itemGap: 0.2,
        angle: -30,
        radius: 0,
        baseColor: '#eee',
        direction: 'top',
        filterBlur: 1,
        filterLevel: 1,
        filterOpacity: 0.8,
        color: [
          { value: 0, color: '#ff0000' },
          { value: 0.5, color: '#ffae00' },
          { value: 0.8, color: '#4ccf83' }
        ],
        chargeWay: 'length',
        chargeSpeed: 0.4 // 动画加载时间（单位：秒）
      },
      tickConfig: {
        height: 280,
        width: 136,
        value: 30,
        max: 100,
        num: 12,
        rate: 0.8,
        margin: { x: 45, y: 14 },
        itemGap: 0.5,
        angle: 0,
        radius: 0,
        baseColor: '#eee',
        direction: 'top',
        filterBlur: 1,
        filterLevel: 1,
        filterOpacity: 0.8,
        color: [
          { value: 0, color: '#ff0000' },
          { value: 0.5, color: '#ffae00' },
          { value: 0.8, color: '#4ccf83' }
        ],
        chargeWay: 'length',
        chargeSpeed: 0.4 // 动画加载时间（单位：秒）
      },
      breatheFlag: true,
      gradientColor: [
        { value: 0, color: '#302114' },
        { value: 1, color: '#ffae00' }
      ],
      asides: { left: '', right: '' },
      asideLabels: null,
      offset: { x: 10, y: 2 }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // aside: left/right
    getAxisPath(rects, side = 'left') {
      if (!rects) return false
      // 限制asidePath仅计算一次
      if (this.asides[side]) return this.asides[side]
      const offsetX = this.offset.x
      const aside1 = side === 'left' ? this.tickConfig.margin.x - offsetX : this.tickConfig.width - this.tickConfig.margin.x + offsetX
      const aside2 = side === 'left' ? aside1 + 5 : aside1 - 5
      let d = ''
      let i = 0
      const offsetY = this.offset.y
      for (;i < rects.length; i++) {
        d += `M${aside1},${rects[i].pos - offsetY} L${aside2},${rects[i].pos - offsetY} `
      }
      const lastPos = rects[i - 1].pos * 2 - rects[i - 2].pos
      d += `M${aside1},${lastPos - offsetY} L${aside2},${lastPos - offsetY} `
      d += `M${aside1},${rects[0].pos - offsetY} L${aside1},${lastPos}`
      this.asides[side] = d
      return d
    },
    getTransfrom(rects, rate) {
      const x = this.tickConfig.width - this.tickConfig.margin.x
      const sinX = rects[Math.min(Math.floor(rate), this.tickConfig.num - 1)].pos + this.offset.y + 4.5
      const y = this.tickConfig.height - this.tickConfig.margin.y - sinX
      return `translate(${x}, ${y})`
    },
    getFill(rects, rate) {
      return rects[Math.min(Math.floor(rate), this.tickConfig.num - 1)].color
    }
  }
}
</script>
<style lang="scss" scoped>
.progress-entry {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  &-box {
    width: 48%;
    height: 90%;
    margin: 5% auto;
    display: inline-block;
  }
}
</style>
