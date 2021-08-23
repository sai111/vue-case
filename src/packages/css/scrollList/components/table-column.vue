<template>
  <div>demo</div>
</template>
<script>
import objectAssign from 'element-ui/src/utils/merge'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      columnIdSeed: 1,
      order: '',
      index: {
        width: 48,
        minWidth: 48,
        realWidth: 48,
        order: ''
      },
      defaults: {
        default: {
          order: ''
        },
        index: {
          width: 48,
          minWidth: 48,
          realWidth: 48,
          order: ''
        }
      }
    }
  },
  mounted() {},
  methods: {
    parseWidth(width) {
      if (width !== undefined) {
        width = parseInt(width, 10)
        if (isNaN(width)) {
          width = null
        }
      }
      return width
    },
    getDefaultColumn(type, options) {
      const column = {}
      objectAssign(column, this.defaults[type || 'default'])
      for (let name in options) {
        if (options.hasOwnProperty(name)) {
          const value = options[name]
          if (typeof value !== 'undefined') {
            column[name] = value
          }
        }
      }
      if (!column.minWidth) {
        column.minWidth = 80
      }
      column.realWidth = column.width === undefined ? column.minWidth : column.width
      return column
    }
  }
}
</script>
<style scoped lang="scss">
</style>
