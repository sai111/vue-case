<template>
  <div class="geoJson">
    <iframe
      src="http://datav.aliyun.com/tools/atlas/index.html#&lat=30.332329214580188&lng=106.72278672066881&zoom=3.5"
      frameborder="0"
      width="100%"
      height="100%"
    />
  </div>
</template>
<script>
export default {
  name: 'GeoJson',
  props: {},
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
.geoJson {
  width: 100%;
  height: 100%;
}
</style>
