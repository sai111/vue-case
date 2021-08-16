<template>
  <div class="table-section">
    <el-table :data="tableData">
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="item.slot" 
          :key="'type-'+index"
          :prop="item.prop"
          :type="item.type"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :show-overflow-tooltip="item.showOverflowTooltip"
        >
        <template slot-scope="scope">
          <div>
            {{ scope.row[item.prop] }}
          </div>
        </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="'column-li-'+index"
          :prop="item.prop"
          :type="item.type"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :show-overflow-tooltip="item.showOverflowTooltip"
        />
      </template>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'TableSection',
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
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
.table-section {
  width: 100%;
}
</style>
