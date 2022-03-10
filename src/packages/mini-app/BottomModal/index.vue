<template>
  <!-- 底部弹出窗 -->
  <view :class="visible?'bottom-modal active':'bottom-modal'" @tap="$emit('handleClose')">
    <view class="bottom-dialog">
      <view class="bottom-modal-header" @tap="$emit('handleClose')" />
      <view class="bottom-modal-body layout">
        <slot />
      </view>
    </view>
  </view>
</template>
<script>
import Taro from '@tarojs/taro'
import './index.scss'
export default {
  props: {
    visible: false, // 是否显示
    title: '' // 标题
  },
  setup (props, context) {
    return {}
  }
}
</script>
