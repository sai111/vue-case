<template>
  <div class="line-wrap">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="'line-'+item.key"
      class="line-wrap-li"
      data-text="测试"
    >
      <div v-if="item.key=='iocaste'">
        形式{{ index + 1 }}
        <svg class="line-graphic line-graphic-slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" />
        </svg>
      </div>
      <div v-else>
        形式{{ index + 1 }}
      </div>
    </div>
  </div>
</template>
<script>
import list from './index.js'
export default {
  name: 'LineHoverStyles',
  components: {},
  props: {},
  data() {
    return {
      list
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
@import './base.scss';
@import './line.scss';
</style>
