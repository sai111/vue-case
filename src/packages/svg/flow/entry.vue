<template>
  <div class="flow-wrap">
    <div
      ref="flow-left"
      class="flow-left"
      :style="toolStyle"
      @click="(e) => handleClick(e, 'flow-left', 'tools')"
    >
      <tools ref="tool-wrap" />
    </div>
    <div class="flow-canvas" :style="canvasStyle">
      <topology-canvas ref="canvas-wrap" />
    </div>
    <div ref="flow-right" class="flow-right" :style="{'width': settings.width+'px'}">
      <settings ref="settings-wrap" />
    </div>
  </div>
</template>
<script>
import Settings from './settings/index.vue'
import Tools from './tools/index.vue'
import TopologyCanvas from './topology-canvas/index.vue'
export default {
  name: 'FlowEntry',
  components: { TopologyCanvas, Tools, Settings },
  data() {
    return {
      tools: {
        width: 300,
        direction: 0,
        handler: false
      },
      settings: {
        width: 300
      }
    }
  },
  computed: {
    toolStyle() {
      return {
        width: `calc(100% -  ${this.tools.width}px)`,
        borderRight: this.tools.handler ? '5px solid #000' : ''
      }
    },
    canvasStyle() {
      return {
        width: `calc(100% -  ${this.tools.width + this.settings.width}px)`
      }
    }
  },
  watch: {},
  mounted() {},
  methods: {
    handleClick(e, domRef, type) {
      const dom = this.$refs[domRef]
      const clickBoxWeight = dom.offsetWidth
      const mouseDownX = e.clientX
      const clickBoxLeft = dom.offsetLeft
      this[type].handler = !this.tools.handler
      if (mouseDownX < clickBoxLeft) {
        console.log(111)
        this[type].direction = 'left'
      } else if (mouseDownX > clickBoxLeft + clickBoxWeight) {
        this[type].direction = 'right'
        console.log(222)
      }
      console.log(this[type].direction, 'diretion', mouseDownX, 'mouseDownX', clickBoxLeft)
    },
    // 鼠标按下事件
    handleMouseDown(e) {
      console.log(e, 'e----mousedown', this.tools.direction)
    },
    // 鼠标移动事件
    handleMouseMove(e) {
      console.log(e, 'mousemove')
    },
    // 鼠标离开事件
    handleMouseUp(e) {
      console.log(e, 'mouseup')
    }
  }
}
</script>
<style lang="scss" scoped>
.flow-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  .flow-left,
  .flow-right {
    height: 100%;
    border: 1px solid #000;
  }
  .flow-canvas {
    height: 100%;
  }
}
</style>
