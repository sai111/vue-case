<template>
  <div class="svgShape-entry">
    svgShape组件
    <svgShape />
  </div>
</template>
<script>
import SvgShape from './index.vue'
export default {
  name: 'SvgShapeEntry',
  components: { SvgShape },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.svgShape-entry {
  width: 100%;
  height: 100%;
}
</style>
