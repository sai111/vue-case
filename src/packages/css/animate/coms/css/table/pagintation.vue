
<template>
  <div class="table-footer">
    <div class="table-footer-left">
      <slot name="footerLeft" />
    </div>
    <div class="table-pagination">
      <!-- 在分页组件前 -->
      <slot name="beforePagination" />
      <el-pagination
        :current-page.sync="currentPage"
        :page-sizes="pageSizeTick"
        :page-size="pageSize"
        :layout="pageLayout"
        :total="total"
        @size-change="(val) => $emit('sizeChange', val)"
        @current-change="(val) => $emit('pageChange', val)"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PagintationBlock',
  components: {},
  props: {
    pageLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageSizeTick: {
      type: Array,
      default: [5, 10, 20, 50]
    },
    pageSize: {
      type: [String, Number],
      default: 10
    },
    currentPage: {
      type: [String, Number],
      default: 1
    },
    total: {
      type: [String, Number],
      default: 0
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
.pagintation-block {
  width: 100%;
  height: 100%;
}
</style>
