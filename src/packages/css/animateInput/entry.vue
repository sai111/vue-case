<template>
  <div class="animateInput-entry">
    animateInput组件
    <animateInput />
  </div>
</template>
<script>
import animateInput from './index.vue'
export default {
  name: 'animateInputEntry',
  components: { animateInput },
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
.animateInput-entry {
  width: 100%;
  height: 100%;
}
</style>