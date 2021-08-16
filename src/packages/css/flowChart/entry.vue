<template>
  <div class="flowChart-entry">
    flowChart组件
    <FlowChart />
  </div>
</template>
<script>
import FlowChart from './index.vue'
export default {
  name: 'FlowChartEntry',
  components: { FlowChart },
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
.flowChart-entry {
  width: 100%;
  height: 100%;
}
</style>
