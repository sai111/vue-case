<template>
  <div class="polygonRing-entry">
    <polygon-ring v-bind="ringConfig" :visual-map="visualMap" />
  </div>
</template>
<script>
import PolygonRing from './polygon-ring.vue'
export default {
  name: 'RingBlock',
  components: { PolygonRing },
  data() {
    return {
      ringConfig: {
        width: 200,
        height: 200,
        radius: 100,
        ringWidth: 30,
        value: 30,
        sum: 100,
        valueFormat: 'percent',
        sideNum: 0,
        lightConfig: {
          duration: 9000,
          delay: 0
        },
        backgroundFill: {
          color: '',
          opacity: 0.4
        },
        valueFill: {
          color: '#33bbff',
          opacity: 1,
          x: 0,
          y: 0,
          fontSize: 20,
          textAnchor: 'middle'
        },
        title: {
          text: '测试文本',
          x: 0,
          y: 40,
          fontSize: 20,
          textAnchor: 'middle'
        }
      },
      visualMap: [
        { value: 60, color: '#04A7F9' },
        { value: 80, color: '#FDEA00' },
        { value: 100, color: '#fd4000' }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.polygonRing-entry {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
