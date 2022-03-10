<template>
  <div class="text-tooltip">
    <el-tooltip
      class="item"
      :effect="effect"
      :manua="true"
      :max-width="maxWidth"
      :disabled="isShowTooltip"
      :content="text"
      :enterable="enterable"
      :hide-after="hideAfter"
      :popper-class="popperClass"
      placement="top"
    >
      <div class="over-flow" :class="className" @mouseover="onMouseOver">
        <span ref="refName">{{ text || noText }}</span>
      </div>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  name: 'CutTextOverflow',
  props: {
    text: {
      type: [Object, String, Array],
      default: ''
    },
    className: {
      type: String,
      default: () => {
        return ''
      }
    },
    maxWidth: {
      type: [String, Number],
      default: '300px'
    },
    noText: {
      type: [String, Number],
      default: ''
    },
    effect: {
      type: String,
      default: 'light'
    },
    hideAfter: {
      type: Number,
      default: 0
    },
    enterable: {
      type: Boolean,
      default: true
    },
    popperClass: {
      type: String,
      default: 'tooltip-max-width'
    }
  },
  data () {
    return {
      isShowTooltip: true
    }
  },
  methods: {
    onMouseOver () {
      if (this.$refs.refName) {
        const parentWidth = this.$refs.refName.parentNode.offsetWidth
        const contentWidth = this.$refs.refName.offsetWidth
        // 判断是否开启tooltip功能
        if (contentWidth > parentWidth) {
          this.isShowTooltip = false
        } else {
          this.isShowTooltip = true
        }
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.text-tooltip {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  outline: none!important;
  &:focus,
  &::foucs {
    outline: none!important;
  }
}
.over-flow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  outline: none!important;
  &:focus,
  &::foucs {
    outline: none!important;
  }
}
p {
  margin: 0;
}
</style>
