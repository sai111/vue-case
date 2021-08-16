<template>
  <div class="chainQueus-entry">
    chainQueus组件
    <chainQueus />
  </div>
</template>
<script>
import ChainQueus from './index.vue'
export default {
  name: 'ChainQueusEntry',
  components: { ChainQueus },
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
.chainQueus-entry {
  width: 100%;
  height: 100%;
}
</style>
