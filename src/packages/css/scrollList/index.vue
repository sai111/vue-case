<template>
  <div ref="carousel" class="carousel-table">
    <carousel-scroll
      :data="tableList"
      :class-option="classOption"
      class="wrap"
      :style="formatStyle(tableList)"
    >
      <el-table :data="tableList" :show-header="showHead">
        <el-table-column
          v-for="(item, index) in columns"
          :key="'table-column-'+index"
          :prop="item.prop"
          :type="item.type"
          :label="item.label"
          :width="item.width"
        />
      </el-table>
    </carousel-scroll>
  </div>
</template>
<script>
import CarouselScroll from './components/carousel-scroll.vue'
// https://chenxuan0000.github.io/vue-seamless-scroll/guide/10-array-property-update.html
export default {
  name: 'ScrollTable',
  components: { CarouselScroll },
  props: {},
  data() {
    return {
      showHead: false,
      tableList: [],
      columns: [
        { type: 'index', label: '序号', width: '80', align: 'center' },
        { prop: 'title', label: '名称' },
        { prop: 'time', label: '时间' },
        { prop: 'desc', label: '描述' }
      ],
      classOption: {
        autoPlay: true,
        step: 0.8,
        hoverStop: true
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getData()
  },
  methods: {
    formatStyle(arr) {
      let len = 1
      if (arr && arr.length > 0) {
        len = arr.length > 5 ? 5 : arr.length
      }
      return { height: len * 44 + 'px' }
    },
    getData() {
      for (let index = 0; index < 10; index++) {
        this.tableList.push({
          title: '测试-' + index,
          id: index,
          time: Date.now(),
          desc: '描述内容～～～'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
