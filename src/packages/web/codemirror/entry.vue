<template>
  <div class="codemirror-entry">
    codemirror组件
    <codemirror-block :code="codeStr" @change="handleChange" />
  </div>
</template>
<script>
import CodemirrorBlock from './index.vue'
export default {
  name: 'CodemirrorEntry',
  components: { CodemirrorBlock },
  data() {
    return {
      codeStr: `{
        "config_str":"{\\\"multi_crop\\\":true}",
        "plates":[
          {
            "detail":"冀AA617A,0.99753#冀AA617A,0.997782#冀AA617A,0.999783#冀AA617A,0.999999",
            "prob":0.99752956628799438,			# 车牌号置信度
            "roi":{"h":35,"w":90,"x":17,"y":21},	# 车牌位置
            "txt":"冀AA617A",			   		   # 车牌号
        "cls_name":"新能源车"			# 车牌类型【小型汽车|新能源车|大型汽车|挂车|教练车|警车|军车|使领馆车|港澳车】
        "cls_prob":0.999987						# 车牌类型置信度
          }
        ],
        "success":true
      }`
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    handleChange(val) {
      console.log(val, 'val--22')
    }
  }
}
</script>
<style lang="scss" scoped>
.codemirror-entry {
  width: 100%;
  height: 100%;
}
</style>
