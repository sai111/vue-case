<template>
  <div class="nest-loading-entry">
    nest-loading组件{{ type }}
    <div class="nest-li">
      <nest-loading :value="value" />
    </div>
    <div class="nest-li">
      <spring-animate />
    </div>
  </div>
</template>
<script>
import NestLoading from './index.vue'
import SpringAnimate from './spring-animate.vue'
export default {
  name: 'NestLoadingEntry',
  components: { NestLoading, SpringAnimate },
  data() {
    return {
      type: 'circle',
      value: 50,
      timer: null
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getData()
  },
  beforeDestroy() {
    this.clearTime()
  },
  methods: {
    clearTime() {
      window.clearInterval(this.timer)
      clearInterval(this.timer)
      this.timer = null
    },
    getData() {
      this.timer = setInterval(() => {
        this.value = (Math.random() * 100 * 1).toFixed(2)
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.nest-loading-entry {
  width: 100%;
  height: 100%;
  background: url('./search-bg.png') center center no-repeat;
  display: flex;
  .nest-li {
    width: 50%;
    height: 100%;
  }
}
</style>
