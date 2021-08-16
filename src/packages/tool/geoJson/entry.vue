<template>
  <div class="geoJson-entry">
    geoJson组件
    <geoJson />
  </div>
</template>
<script>
import GeoJson from './index.vue'
export default {
  name: 'GeoJsonEntry',
  components: { GeoJson },
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
.geoJson-entry {
  width: 100%;
  height: 100%;
}
</style>
