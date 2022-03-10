<template>
  <div class="animateInput">
    <div
      ref="main"
      class="input-box"
      :class="isClick?'input-box-active':''"
      v-clickoutside="handleClose"
      @click="handleClick"
    >
      <div class="input" @click="handleClick" />
      <div class="text">{{isClick ? '请输入' : '姓名：'}}</div>
      <div class="btn">ok</div>
    </div>
  </div>
</template>
<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
export default {
  name: 'animateInput',
  directives: { Clickoutside },
  data() {
    return {
      isClick: false
    }
  },
  methods: {
    handleClick() {
      this.isClick = true
    },
    handleClose() {
      console.log(3434, 5667)
      this.isClick = false
    }
  }
}
</script>
<style lang="scss" scoped>
.animateInput {
  width: 100%;
  height: 100%;
  margin: 40px;
  .input-box {
    width: 400px;
    height: 60px;
    position: relative;
    cursor: pointer;
  }
  .input {
    width: 400px;
    height: 60px;
    background: rgba(38,166,118, 0.9);
    border-radius: 4px;
    cursor: pointer;
  }
  .text {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.3s ease all;
  }
  .btn {
    background: #fff;
    color: rgba(38,166,118, 0.9);
    border-radius: 2px;
    position: absolute;
    top: 1px;
    right: 1px;
    width: 0px;
    height: 58px;
    text-align: center;
    line-height: 58px;
    font-size: 16px;
    opacity: 0;
    transition: 0.3s ease all;
  }
  .input-box.input-box-active {
    .text {
      color:rgba(38,166,118, 0.9);
      top: -30%;
      transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1)
    }
    .btn {
      right: 1px;
      opacity: 1;
      width: 58px;
      transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1)
    }
  }
}
</style>
