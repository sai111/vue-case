<template>
  <div class="expand-tree">
    <vue-okr-tree
      ref="tree"
      node-key="id"
      :data="dataList"
      show-collapsable
      direction="horizontal"
      @node-expand="handleNodeExpand"
    />
    {{ expandNode }}
  </div>
</template>
<script>
import { VueOkrTree } from 'vue-okr-tree'
import 'vue-okr-tree/dist/vue-okr-tree.css'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'ExpandTree',
  components: { VueOkrTree },
  props: {},
  data() {
    return {
      dataList: require('../json/demo.json').data,
      propsConfig: {
        label: 'value',
        children: 'children'
      },
      expandNode: []
    }
  },
  mounted() {
    this.getExpandNode(this.dataList)
  },
  methods: {

    /**
     * 1. 根据后台字段expand默认展开层级
     * 2. 点击展开按钮，请求接口后获取下一级数据，展示在页面中
     */
    handleNodeExpand(data) {
      console.log(data, 'data', uuidv4())
      alert('点击了')
    },
    getExpandNode(data) {
      data.forEach((v, i) => {
        v.id = uuidv4()
        if (v.children && (('children' in v && !v.children) || ('children' in v && v.children.length === 0))) {
          delete data[i].children
        } else if (v.children && 'children' in v && v.children) {
          v.id = uuidv4()
          this.getExpandNode(v.children)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.expand-tree {
  width: 100%;
  height: 100%;
}
</style>
