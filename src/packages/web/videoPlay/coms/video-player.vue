<template>
  <div class="video-player">
    <video
      ref="video-media"
      playsinline="true"
      webkit-playsinline="true"
      x-webkit-airplay="true"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      x5-video-orientation="landscape"
      @error="handleError"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    >
      <source :src="src" type="video/mp4">
      您的浏览器不支持HTML5
    </video>
    <controls-panel
      :playing="playing"
      :speed-list="speedList"
      v-bind="state"
      :style="controlStyle"
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
  name: 'VideoPlayer',
  components: { ControlsPanel },
  props: {
    src: {
      type: String,
      default: ''
    },
    speedList: {
      type: Array,
      default: () => {
        return [2, 1.5, 1]
      }
    },
    // 是否购买版权
    buyFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      limitTime: 3, // 在没有购买版权时，只能试看30s
      playing: false,
      preload: 'auto',
      // 控制面板信息
      state: {
        disabled: false, // 试看是否停止
        totalTime: 0, // 音频总时长
        muted: false, // 是否静音
        playedTime: '00:00', // 当前播放时长
        progressVal: 0, // 进度
        error: false // 当发生错误, 就出现loading状态
      },
      controlStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0
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
    // 数据加载出错
    handleError() {
      this.state.isError = true
    },
    // 开始播放
    startPlay() {
      this.$refs['video-media'].play()
    },
    // 暂停
    pausePlay() {
      this.$refs['video-media'].pause()
    },
    onPlay(res) {
      this.playing = true
    },
    onPause(res) {
      this.playing = false
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
    /**
     * onLoadedmetadata
     * 当加载语音流元数据完成后，会触发该事件的回调函数
     * 语音元数据主要是语音的长度之类的数据
     */
    onLoadedmetadata(res) {
      this.state.error = false
      this.state.totalTime = parseInt(res.target.duration)
    },
    togglePlay() {
      return this.playing ? this.pausePlay() : this.startPlay()
    },
    // 播放跳转
    changeTime(val) {
      const time = parseInt(val / 100 * this.state.totalTime)
      this.$refs['video-media'].currentTime = time
      this.state.progressVal = parseInt((time / this.state.totalTime) * 100)
    },
    // 倍速
    clickSpeed(val) {
      this.$refs['video-media'].playbackRate = val
    },
    changeScreen(val) {},
    // 双击静音
    changeVolumeState() {
      this.$refs['video-media'].muted = !this.$refs['video-media'].muted
      this.state.muted = this.$refs['video-media'].muted
    },
    changeVolume(val) {
      this.state.muted = !val > 0
      this.$refs['video-media'].muted = !val > 0
      this.$refs['video-media'].volume = val / 100
    }
  }
}
</script>
<style scoped lang="scss">
.video-player {
  width: 100%;
  height: 500px;
  background: #000000;
  display: inline-block;
  position: relative;
  video {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>
