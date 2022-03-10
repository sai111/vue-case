<template>
  <div class="tool-steps-wrap">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'ExtendSteps',
  components: {},
  props: {
    active: {
      type: [Number, String],
      default: 1
    },
    finishStatus: {
      type: String,
      default: 'finish'
    },
    steps: {
      type: Array,
      default: () => []
    },
    stepIndex: {
      type: [Number, String],
      default: 1
    }
  },
  data () {
    return {
      stepOffset: 0
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="scss">
.tool-steps-wrap {
  display: flex;
  align-items: center;
}
</style>
