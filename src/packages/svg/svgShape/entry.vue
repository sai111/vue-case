<template>
  <div class="svgShape-entry">
    svgShape组件
    <div class="svg-shape-li">
      <svgShape />
    </div>
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
  background: url('~@/assets/img/search-bg.png') center center no-repeat;
  .svg-shape-li {
    margin: 56px;
    width: 400px;
    height: 415px;
    overflow: hidden;
  }
}
</style>
