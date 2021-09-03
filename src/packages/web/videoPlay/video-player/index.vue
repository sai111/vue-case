<template>
  <div class="video-player">
    <video
      ref="video-media"
      :src="src"
      playsinline="true"
      webkit-playsinline="true"  
      x-webkit-airplay="true"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      x5-video-orientation="landscape"
    >
      您的浏览器不支持HTML5
    </video>
    <controls-panel :style="controlStyle" />
  </div>
</template>
<script>
import ControlsPanel from '../coms/controls-panel.vue'
export default {
  name: 'VideoPlayer',
  components: { ControlsPanel },
  props: {
    src: {
      type: String,
      default: ''
    },
    speedS: {
      type: Array,
      default: () => {
        return [1, 1.5, 2]
      }
    }
  },
  data() {
    return {
      // video控制显示设置
      video: {
        loaded: 0, // 缓存长度
        displayTime: "00:00", // 进度时间
        totalTime: "00:00", // 总时间
        progressVal: 0,
        volume: 100, // 音量
        speed: 1 // 倍速
      },
      // 播放状态控制
      state: {
        error: false, // 当发生错误
        muted: false,
        controlBtnShow: true, // 播放按钮
        controlBarShow: false, // 控制条
        fullScreen: false, // 是否全屏
        playing: false, // 是否播放
        isLoading: false,
        isEnd: false,
        isError: false
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
    // 数据加载出错
    handleError() {
      this.state.isError = true
    },
    onPlay(res) {
      this.state.playing = true
    },
    onPause(res) {
      this.state.playing = false
    }
  }
}
</script>
<style scoped lang="scss">
.video-player {
  width: 100%;
  height: 300px;
  display: inline-block;
  border: 1px solid red;
  position: relative;
  video {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>
