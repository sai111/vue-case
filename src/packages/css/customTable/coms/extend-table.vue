<template>
  <div class="extend-table">
    <table cellspacing="0" cellpadding="0">
      <tr>
        <td v-for="(item, index) in header" :key="'head-td-'+index">
          {{ item.label }}
        </td>
      </tr>
      <tr>
        <td v-for="(item, index) in list" :key="'td-li-'+index">
          <textarea
            v-if="!disabled"
            :ref="'resize-'+index"
            v-model="item.value"
            @input="handleInput('resize-' + index)"
          />
          <template v-if="disabled">{{ item.value }}</template>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'ExtendTable',
  components: {},
  props: {
    table: {
      type: Object,
      default: () => {
        return {
          header: [
            { label: '参数名' },
            { label: '类型' },
            { label: '说明' }
          ],
          list: [
            { value: '', prop: '' }, // additionalProp1
            { value: '', prop: '' },
            { value: '', prop: '' }
          ]
        }
      }
    },
    // 禁止编辑
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      obj: {
        phone: '15167121179',
        userType: 1,
        loginType: 1,
        password: '123456gm',
        smsCode: 123456
      }
    }
  },
  computed: {
    header () {
      return this.table.header
    },
    list () {
      return this.table.list
    }
  },
  mounted () {},
  methods: {
    handleInput (val) {
      this.$nextTick(() => {
        const dom = this.$refs && this.$refs[val][0]
        dom.style.height = dom.scrollHeight + 'px'
      })
    },
    handleMoseMove () {
      console.log(this, 'this')
    }
  }
}
</script>
<style scoped lang="scss">
.extend-table {
  width: 100%;
  table {
    width: 100%;
    border-collapse: collapse;
    tr {
      width: 100%;
      min-height: 40px;
      display: flex;
      td {
        flex: 1;
        text-align: center;
        border: 1px solid #EEE;
        display: flex;
        align-items: center;
        justify-content: center;
        textarea {
          width: 100%;
          height: 100%;
          outline: none;
          border: none;
          resize: none;
          width: 100%;
          padding: 10px;
          text-align: center;
          overflow: hidden;
        }
      }
      &:nth-child(1) {
        background: #F8FAFD;
        // box-shadow: 0px 1px 0px 0px #EEEEEE, -2px 0px 0px 0px #2469F3, 1px 0px 0px 0px #EEEEEE;
      }
    }
  }
}
</style>
