<template>
  <div class="codemirror">
    <textarea ref="codeArea" style="background: #eee;" />
  </div>
</template>
<script>
import * as Codemirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript' // 代码高亮必须引入
export default {
  name: 'CodemirrorBlock',
  props: {
    // 代码
    code: {
      type: String,
      default: ''
    },
    // 配置
    options: {
      type: Object,
      default: () => {
        return {
          mode: 'text/javascript',
          theme: 'default', // 主题
          autoRefresh: true, // 自动刷新
          lineNumbers: true, // 显示行数
          lineWrapping: true // 自动换行
        }
      }
    }
  },
  data() {
    return {
      codeEditor: null,
      skipNextChangeEvent: false
    }
  },
  computed: {},
  watch: {
    code(val) {
      const editorValue = this.codeEditor.getValue()
      if (val !== editorValue) {
        this.codeEditor.setValue(this.code)
      }
    }
  },
  beforeDestroy() {
    this.destroy()
  },
  mounted() {
    this.ready()
  },
  methods: {
    ready() {
      this.codeEditor = Codemirror.fromTextArea(this.$refs.codeArea, this.options)
      this.codeEditor.setValue(this.code)
      this.codeEditor.on('change', (cm) => {
        this.$emit('change', cm.getValue())
      })
    },
    destroy() {
      const element = this.codeEditor.doc.cm.getWrapperElement()
      element && element.remove && element.remove()
    },
    refresh() {
      this.codeEditor && this.codeEditor.refresh()
    }
  }
}
</script>
<style lang="scss" scoped>
.codemirror {
  width: 100%;
  height: 100%;
}
</style>
