<template>
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
    <path id="arc1" fill="none" stroke="red" stroke-width="5" />
  </svg>
</template>
<script>
export default {
  name: 'Demo2Block',
  components: {},
  props: {},
  data() {
    return {
      width: 400,
      height: 800
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
        return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
        }
      }

      function describeArc(x, y, radius, startAngle, endAngle) {
        var start = polarToCartesian(x, y, radius, endAngle)
        var end = polarToCartesian(x, y, radius, startAngle)

        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1"

        var d = [
          "M", start.x, start.y,
          "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
          "L", x, y,
          "L", start.x, start.y
        ].join(" ")

        return d + ' Z'
      }
      document.getElementById("arc1").setAttribute("d", describeArc(200, 400, 100, 0, 90))
    }
  }
}
</script>
<style scoped lang="scss">
</style>
