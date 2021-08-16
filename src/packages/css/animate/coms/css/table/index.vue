<template>
  <div class="table-wrap">
    <table-section
      :columns="columns"
      :table-data="tableList"
    />
    <pagintation-block v-bind="pagintation" />
  </div>
</template>
<script>
import TableSection from './table.vue'
import PagintationBlock from './pagintation.vue'
export default {
  name: 'TableBlock',
  components: {
    TableSection,
    PagintationBlock
  },
  props: {},
  data() {
    return {
      pagintation: {
        pageLayout: 'total, sizes, prev, pager, next, jumper',
        pageSizeTick: [5, 10, 20, 50],
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      columns: [
        { type: 'index', label: '序号', width: 80, align: 'center' },
        { prop: 'name', label: '项目', slot: true },
        { prop: 'time', label: '时间' }
      ],
      tableList: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const res = require('./index.json')
      if (res && res.data && res.data.length > 0) {
        this.tableList = res.data
      } else {
        this.tableList = []
      }
    }
  }
}
</script>
<style scoped lang="scss">
.table-wrap {
  width: 100%;
  height: 100%;
}
</style>
