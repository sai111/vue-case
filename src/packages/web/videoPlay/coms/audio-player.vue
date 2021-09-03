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
    <controls-panel
      :playing="playing"
      :speed-list="speedList"
      v-bind="state"
      @togglePlay="togglePlay"
      @changeTime="changeTime"
      @clickSpeed="clickSpeed"
      @changeFull="changeScreen"
      @changeVolumeState="changeVolumeState"
      @changeVolumeVal="changeVolume"
    />
  </div>
</template>
<script>
import ControlsPanel from './controls-panel.vue'
export default {
  name: 'AudioPlayer',
  components: { ControlsPanel },
  props: {
    speedList: {
      type: Array,
      default: () => {
        return [2, 1.5, 1]
      }
    },
    src: {
      type: String,
      default: ''
    },
    // 是否购买版权
    buyFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      limitTime: 30, // 在没有购买版权时，只能试看30s
      playing: false,
      preload: 'auto',
      totalTime: 0, // 音频总时长
      // 控制面板信息
      state: {
        disabled: false, // 试看是否停止
        totalTime: 0,
        muted: false, // 是否静音
        playedTime: '00:00', // 当前播放时长
        progressVal: 0, // 进度
        error: false // 当发生错误, 就出现loading状态
      }
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
    /**
     * onLoadedmetadata
     * 当加载语音流元数据完成后，会触发该事件的回调函数
     * 语音元数据主要是语音的长度之类的数据
     */
    onLoadedmetadata(res) {
      this.state.error = false
      this.state.totalTime = parseInt(res.target.duration)
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      const currentTime = res.target.currentTime
      if (this.buyFlag && currentTime * 1 > this.limitTime) {
        this.state.disabled = true
        this.playing = false
        this.pausePlay()
      } else {
        this.state.disabled = false
        this.state.playedTime = this.realFormatSecond(currentTime)
        this.state.progressVal = parseInt((currentTime / this.state.totalTime) * 100)
      }
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
    },
    // 播放跳转
    changeTime(val) {
      const time = parseInt(val / 100 * this.state.totalTime)
      this.$refs['audio-media'].currentTime = time
      this.state.progressVal = parseInt((time / this.state.totalTime) * 100)
    },
    // 倍速
    clickSpeed(val) {
      this.$refs['audio-media'].playbackRate = val
    },
    changeScreen(val) {},
    // 双击静音
    changeVolumeState() {
      this.$refs['audio-media'].muted = !this.$refs['audio-media'].muted
      this.state.muted = this.$refs['audio-media'].muted
    },
    changeVolume(val) {
      this.state.muted = !val > 0
      this.$refs['audio-media'].muted = !val > 0
      this.$refs['audio-media'].volume = val / 100
    }
  }
}
</script>
<style scoped lang="scss">
.audio-player {
  width: 100%;
  border: 1px solid red;
}
</style>
