<template>
  <div class="controls-panel">
    <div v-if="disabled" class="go-to-buy">
      试看30秒，观看完整视频请<span>购买</span>
    </div>
    <div class="controls-progress">
      <el-slider
        v-model="proressNew"
        :debounce="debounce"
        :disabled="disabled"
        :format-tooltip="formatProcessToolTip"
        @change="(val) => $emit('changeTime', val)"
      />
    </div>
    <div class="player-controls">
      <div class="controls-left">
        <div class="player-controls-btn" @click.stop="$emit('togglePlay')">
          <i :size="48" :class="playing ? 'video-play' : 'video-pause'" />
        </div>
        <div class="player-controls-startTime">
          {{ displayTime }}/{{ error ? 'error!' : realFormatSecond(totalTime) }}
        </div>
      </div>
      <div class="controls-right">
        <!-- 倍速 -->
        <div class="player-controls-speeds margin40">
          <el-popover placement="top" width="30" popper-class="audio-player-pop" trigger="click">
            <div class="speed-list">
              <div
                v-for="(item, index) in speedList"
                :key="'speed-li-' + index"
                class="speed-li"
                :class="speed == item ? 'speed-active' : ''"
                @click="changeSpeed(item)"
              >
                {{ item }}
              </div>
            </div>
            <div slot="reference" class="speed-box">{{ speed!=1?speed:'' }}倍速</div>
          </el-popover>
        </div>
        <!-- 音量 -->
        <div class="player-controls-volume marign30">
          <el-popover placement="top" width="30" popper-class="audio-volume-pop" trigger="click">
            <el-slider
              v-model="volume"
              vertical
              :debounce="debounce"
              height="100px"
              @change="changeVolume"
            />
            <div
              class="volume-box"
              :class="muted ? 'volume-box-close' : 'volume-box-active'"
              @click="$emit('changeVolumeState')"
            />
            <div
              slot="reference"
              class="volume-box"
              :class="muted ? 'volume-box-close' : 'volume-box-active'"
            />
          </el-popover>
        </div>
        <!-- 全屏|小屏 -->
        <div
          class="player-controls-screen"
          :class="fullscreen ? 'full-screen' : 'no-full-screen'"
          @click="changeScreen"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ControlsPanel',
  components: {},
  props: {
    // 是否播放
    playing: {
      type: Boolean,
      default: false
    },
    // 当发生错误
    error: {
      type: Boolean,
      default: false
    },
    // 可选倍速组
    speedList: {
      type: Array,
      default: () => {
        return [2, 1.5, 1]
      }
    },
    // 总时间
    totalTime: {
      type: [String, Number],
      default: 0
    },
    // 进度
    progressVal: {
      type: [String, Number],
      default: 0
    },
    // 当前播放时长
    playedTime: {
      type: String,
      default: '0:00:00'
    },
    // 是否静音
    muted: {
      type: Boolean,
      default: false
    },
    // 试看功能
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      speendFlag: false,
      debounce: 0,
      fullscreen: false, // 是否全屏
      displayTime: '0:00:00', // 进度时间
      speed: 1, // 倍速
      volume: 100, // 音量
      proressNew: this.progressVal
    }
  },
  watch: {
    progressVal(val) {
      this.proressNew = val
    },
    playedTime(val) {
      this.displayTime = val
    }
  },
  mounted() {},
  methods: {
    realFormatSecond(second) {
      var secondType = typeof second
      if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second)
        var hours = Math.floor(second / 3600)
        second = second - hours * 3600
        var mimute = Math.floor(second / 60)
        second = second - mimute * 60
        return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
      } else {
        return '0:00:00'
      }
    },
    // 进度条toolTip
    formatProcessToolTip(index) {
      index = parseInt(this.totalTime / 100 * index)
      return '进度条: ' + this.realFormatSecond(index)
    },
    // 倍速
    changeSpeed(item) {
      this.speed = item
      this.$emit('clickSpeed', item)
    },
    // 音量🔊
    changeVolume(val) {
      this.volume = val
      this.$emit('changeVolumeVal', val)
    },
    // 全屏切换
    changeScreen() {
      this.fullscreen = !this.fullscreen
      this.$emit('changeFull', this.fullscreen)
    }
  }
}
</script>
<style scoped lang="scss">
.controls-panel {
  width: 100%;
  .margin40 {
    margin-right: 40px;
  }
  .marign30 {
    margin-right: 30px;
  }
  .player-controls {
    width: 100%;
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #000000;
    color: #fff;
    .controls-left,
    .controls-right {
      display: flex;
      align-items: center;
    }
    .player-controls-btn {
      margin: 0 8px;
      width: 40px;
      height: 40px;
      border-radius: 25px;
      cursor: pointer;
      i {
        display: inline-block;
        display: inline-block;
        width: 40px;
        height: 40px;
      }
      .video-play {
        background: url('../assets/play.png') center center/contain no-repeat;
      }
      .video-pause {
        background: url('../assets/stop.png') center center/contain no-repeat;
      }
    }
    .player-controls-startTime {
      font-size: 22px;
      line-height: 1;
      margin: 0 8px;
      user-select: none;
      font-weight: 400;
      color: #FFFFFF;
    }
    .player-controls-speeds {
      cursor: pointer;
    }
    .player-controls-volume {
      width: 40px;
      height: 40px;
      span {
        display: inline-block;
        width: 40px;
        height: 40px;
        ::v-deep .el-popover__reference-wrapper {
          display: inline-block;
          cursor: pointer;
          width: 40px;
          height: 40px;
          .volume-box {
            width: 40px;
            height: 40px;
            &.volume-box-close {
              background: url('../assets/volume.png') center center/contain no-repeat;
            }
            &.volume-box-active {
              background: url('../assets/volume.png') center center/contain no-repeat;
            }
          }
        }
      }
    }
    .player-controls-screen {
      width: 40px;
      height: 40px;
      &.full-screen {
        background: url('../assets/full.png') center center/contain no-repeat;
      }
      &.no-full-screen {
        background: url('../assets/full.png') center center/contain no-repeat;
      }
    }
  }
  .go-to-buy {
    width: 100%;
    height: 72px;
    line-height: 40px;
    background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    opacity: 0.8;
    font-weight: 400;
    color: #FFFFFF;
    padding: 10px 30px;
    font-size: 20px;
    span {
      color: #FF6B00;
      cursor: pointer;
    }
  }
  .speed-box {
    font-size: 22px;
  }
}

</style>
<style lang="scss">
.controls-progress {
  width: 100%;
  .el-slider {
    .el-slider__runway {
      margin: 0;
      height: 5px;
      background: #404040;
      .el-slider__bar {
        height: 5px;
        background: #B3B3B3;
        border-radius: 0px 100px 100px 0px;
      }
      .el-slider__button-wrapper {
        .el-slider__button {
          height: 8px;
          width: 8px;
          background: #B3B3B3;
          border-color: #B3B3B3;
        }
      }
    }
  }
}
.audio-player-pop.el-popper.el-popover {
  padding: 0;
  min-width: 40px;
  .speed-list {
    .speed-li {
      text-align: center;
      list-style: none;
      line-height: 36px;
      padding: 0 8px;
      margin: 0;
      font-size: 14px;
      color: #606266;
      cursor: pointer;
      outline: none;
      &:hover,
      &.speed-active {
        background-color: #ecf5ff;
        color: #66b1ff;
      }
    }
  }
}
.audio-volume-pop.el-popper.el-popover {
  padding: 15px 0;
  min-width: 40px;
  .volume-box {
    width: 25px;
    height: 25px;
    margin: 10px auto 0 auto;
    text-align: center;
    &.volume-box-close {
      background: url('../assets/volume.png') center center/contain no-repeat;
    }
    &.volume-box-active {
      background: url('../assets/volume.png') center center/contain no-repeat;
    }
  }
}
</style>
