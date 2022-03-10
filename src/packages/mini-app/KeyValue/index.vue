<template>
  <view class="key-value">
    <view
      v-for="(item, key, index) in list"
      v-show="data[key]"
      :key="'key-value-li-'+index"
      class="key-value-li"
      :class="item.class"
    >
      <view class="li-label">{{ item.label }}</view>
      <slot v-if="item.slot" :name="key" class="li-value" />
      <view v-else class="li-value">
        {{ item.value }}{{ data[key] }}
      </view>
    </view>
  </view>
</template>
<script>
import './index.scss'
export default {
  props: {
    data: {},
    list: {}
  },
  setup() {
  return {}
  }
}
</script>
