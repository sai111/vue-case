<template>
  <div class="flow-entry">
    flow组件
    <flow-block />
  </div>
</template>
<script>
import FlowBlock from './index.vue'
export default {
  name: 'FlowEntry',
  components: { FlowBlock },
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
.flow-entry {
  width: 100%;
  height: 100%;
}
</style>
