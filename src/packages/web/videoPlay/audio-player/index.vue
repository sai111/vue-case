<template>
  <div class="player audio-player">
    <audio
      ref="audio-media"
      :src="src"
      :preload="preload"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    />
    <div class="player-controls">
      <div class="player-controls-btn" @click.stop="togglePlay()">
        <i :size="48" :class="playing?'el-icon-video-pause':'el-icon-video-play'" />
      </div>
      <div class="player-controls-startTime">
        {{ playedTime }}
      </div>
      <div class="player-progress">
        <el-slider v-model="progressVal" :format-tooltip="formatProcessToolTip" @change="changeTime" />
      </div>
      <div class="player-controls-endTime">
        {{ error ? 'error!' : realFormatSecond(lengthTime) }}
      </div>
      <!-- 音量 -->
      <div class="player-controls-volume">
        <el-popover
          placement="top"
          width="30"
          popper-class="audio-volume-pop"
          trigger="click"
        >
          <el-slider
            v-model="volume"
            vertical
            height="100px"
            @change="changeVolume"
          />
          <div
            slot="reference"
            class="volume-box"
            :class="muted?'volume-box-close':'volume-box-active'"
            @click="changeVolumeState"
          />
        </el-popover>
      </div>
      <!-- 倍速 -->
      <div class="player-controls-speeds">
        <el-popover
          placement="top"
          width="30"
          popper-class="audio-player-pop"
          trigger="click"
        >
          <div class="speed-list">
            <div
              v-for="(item, index) in speedS"
              :key="'speed-li-'+index"
              class="speed-li"
              :class="speed == item ? 'speed-active': ''"
              @click="changeSpeed(item)"
            >
              {{ item }}倍速
            </div>
          </div>
          <div slot="reference" class="speed-box">
            {{ speed }}倍速
          </div>
        </el-popover>
      </div>
      <!-- 全屏|小屏 -->
      <div class="player-controls-screen" @click="changeScreen">
        <i :class="fullscreen?'el-icon-full-screen':'el-icon-crop'" />
      </div>
    </div>
  </div>
</template>
<script>
// https://segmentfault.com/a/1190000012453975
export default {
  name: 'AudioPlayer',
  components: {},
  props: {
    speedS: {
      type: Array,
      default: () => {
        return [1, 1.5, 2]
      }
    },
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      progressVal: 0,
      playing: false,
      preload: 'auto',
      playedTime: '00:00', // 当前播放时长
      lengthTime: '00:00', // 音频长度
      volume: 100,
      speed: 1, // 倍速
      fullscreen: false, // 是否全屏
      muted: false, // 关闭音频
      error: false // 当发生错误, 就出现loading状态
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
    togglePlay() {
      return this.playing ? this.pausePlay() : this.startPlay()
    },
    // 播放跳转
    changeTime(val) {
      this.$refs['audio-media'].currentTime = parseInt(val / 100 * this.lengthTime)
    },
    /**
     * onLoadedmetadata
     * 当加载语音流元数据完成后，会触发该事件的回调函数
     * 语音元数据主要是语音的长度之类的数据
     */
    onLoadedmetadata(res) {
      this.error = false
      this.lengthTime = parseInt(res.target.duration)
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate (res) {
      const currentTime = res.target.currentTime
      this.playedTime = this.realFormatSecond(currentTime)
      this.progressVal = parseInt((currentTime / this.lengthTime) * 100)
    },
    // 进度条toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt(this.lengthTime / 100 * index)
      return '进度条: ' + this.realFormatSecond(index)
    },
    // 倍速
    changeSpeed(item) {
      this.speed = item
      this.$refs['audio-media'].playbackRate = item
    },
    // 音量🔊
    changeVolume(val) {
      this.volume = val
      this.$refs['audio-media'].volume = val / 100
    },
    // 双击静音
    changeVolumeState() {
      this.$refs['audio-media'].muted = !this.$refs['audio-media'].muted
      this.muted = this.$refs['audio-media'].muted
    },
    // 是否全屏
    changeScreen() {
      this.fullscreen = !this.fullscreen
    },
    // 开始播放
    startPlay() {
      this.$refs['audio-media'].play()
    },
    // 暂停
    pausePlay() {
      this.$refs['audio-media'].pause()
    },
    onPlay(res) {
      this.playing = true
    },
    onPause(res) {
      this.playing = false
    }
  }
}
</script>
<style scoped lang="scss">
.audio-player {
  width: 100%;
  border: 1px solid red;
  .player-controls {
    width: 100%;
    display: flex;
    align-items: center;
    .player-controls-btn {
      margin: 0 8px;
      width: 30px;
      height: 30px;
      border-radius: 25px;
      cursor: pointer;
      i {
        display: inline-block;
        font-size: 30px;
      }
    }
    .player-controls-endTime {
      width: 10%;
      min-width: 40px;
      font-size: 14px;
      line-height: 1;
      margin: 0 8px;
      user-select: none;
    }
    .player-progress {
      flex: 1;
      margin: 0 10px;
    }
    .player-controls-speeds {}
    .player-controls-volume {
      width: 30px;
      span {
        display: inline-block;
        width: 30px;
        ::v-deep .el-popover__reference-wrapper {
          display: inline-block;
          cursor: pointer;
          width: 30px;
          height: 30px;
          .volume-box {
            width: 30px;
            height: 30px;
            &.volume-box-close {
              background: url('../assets/volume-close.svg') center center/contain no-repeat;
            }
            &.volume-box-active {
              background: url('../assets/volume.svg') center center/contain no-repeat;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.audio-player-pop.el-popper.el-popover {
  padding: 0;
  min-width: 90px;
  .speed-list {
    .speed-li {
      list-style: none;
      line-height: 36px;
      padding: 0 20px;
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
}
</style>
