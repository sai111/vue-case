<template>
  <div class="carousel-table-body animation" :style="scrollStyle">
    <div
      v-for="(item, index) in data"
      :key="'table-tr-'+index"
      class="table-tr"
    >
      <div
        v-for="(column, columnIndex) in columns"
        :key="'table-tr-td-'+columnIndex"
        class="tr-td"
        :style="{'width': (column.width || column.realWidth) + 'px', 'text-align': column.align || 'left'}"
      >
        {{ column.prop }}
        <!--{{ row[column.prop] }}-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableCore',
  components: {},
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    // page-data
    data: {
      type: Array,
      default: () => []
    },
    scrollStyle: {
      type: [Object],
      default: () => {}
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.carousel-table-body {
  width: 100%;
  .table-tr {
    display: flex;
    .tr-td {
      box-sizing: border-box;
      height: 25px;
      line-height: 25px;
      padding: 0 10px;
      border: 1px solid red;
    }
  }
}
.animation {
  animation-name: scrollLi;
  animation-fill-mode: forwards;
}
@keyframes scrollLi() {
  to {
    transform: translate3d(0, -100%, 0)
  }
}
</style>
