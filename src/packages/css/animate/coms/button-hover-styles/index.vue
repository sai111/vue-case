<template>
  <div class="button-hover-styles">
    <div class="button-wrap">
      <div
        v-for="(item, index) in list"
        :key="'button-li-'+index"
        class="button-li"
        :class="'button-'+item.key"
      >
        <div v-if="extra1.includes(item.key)">
          <div class="button-li-label">
            <div class="label">
              {{ item.label }}
            </div>
            <div class="marquee" aria-hidden="true">
              <div class="marquee-inner">
                <span v-for="(item2, index2) in 4" :key="index2">
                  {{ item2 || 'Subscribe' }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="extra2.includes(item.key)">
          <div class="button-li-label">
            <div>
              {{ item.label }}
            </div>
          </div>
        </div>
        <div v-if="item.key=='fenrir'">
          <div class="button-li-label">
            {{ item.label }}
          </div>
          <svg
            aria-hidden="true"
            class="progress"
            width="70"
            height="70"
            viewbox="0 0 70 70"
          >
						<path class="progress__circle" d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" />
						<path
              class="progress__path"
              d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
              pathLength="1"
            />
          </svg>
        </div>
        <div v-else class="button-li-label">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import list from './index.js'
export default {
  name: 'ButtonHoverStyles',
  components: {},
  props: {},
  data() {
    return {
      list,
      extra1: ['atlas', 'kari'],
      extra2: ['telesto', 'skoll', 'greip']
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
@import './index.scss';
@import './buttons.scss';
</style>
