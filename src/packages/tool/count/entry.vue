<template>
  <div class="count-entry">
    <Count />
  </div>
</template>
<script>
import Count from './index.vue'
export default {
  name: 'CountEntry',
  components: { Count },
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
.count-entry {
  width: 100%;
  height: 100%;
}
</style>
