<template>
  <div class="carousel-table-thead">
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td
          v-for="(column, columnIndex) in columns"
          :key="'table-thead-'+columnIndex"
          :colspan="column.colspan"
          :rowSpan="column.rowSpan"
          class="table-thead-td"
          :style="{'width': (column.width || column.realWidth) + 'px', 'text-align': column.align || 'left'}"
        >
          {{ column.label }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'HeadBlock',
  components: {},
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    getAllColumns(columns) {
      const result = []
      columns.forEach((column) => {
        if (column.children) {
          result.push(column)
          result.push.apply(result, this.getAllColumns(column.children))
        } else {
          result.push(column)
        }
      })
      return result
    },
    convertToRows(originColumns) {
      let maxLevel = 1
      const traverse = (column, parent) => {
        if (parent) {
          column.level = parent.level + 1
          if (maxLevel < column.level) {
            maxLevel = column.level
          }
        }
        if (column.children) {
          let colSpan = 0
          column.children.forEach((subColumn) => {
            traverse(subColumn, column)
            colSpan += subColumn.colSpan
          })
          column.colSpan = colSpan
        } else {
          column.colSpan = 1
        }
      }
      originColumns.forEach((column) => {
        column.level = 1
        traverse(column)
      })

      const rows = []
      for (let i = 0; i < maxLevel; i++) {
        rows.push([])
      }
      const allColumns = this.getAllColumns(originColumns)
      allColumns.forEach((column) => {
        if (!column.children) {
          column.rowSpan = maxLevel - column.level + 1
        } else {
          column.rowSpan = 1
        }
        rows[column.level - 1].push(column)
      })
      return rows
    },
    init() {
      // const columnsRow = this.convertToRows(this.columns)
      // console.log(this.columns, '111', columnsRow)
    }
  }
}
</script>
<style scoped lang="scss">
.carousel-table-thead {
  width: 100%;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  .table-thead-td {
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid red;
  }
}
</style>
