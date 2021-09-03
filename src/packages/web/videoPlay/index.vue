<template>
  <div class="videoPlay">
    <audio controls="controls" :autoplay="autoplay">
      您的浏览器不支持audio元素
      <source src="./src/水星记.mp3" /> 
    </audio>
  </div>
</template>
<script>
// https://github.com/forijk/vue-audio-better
export default {
  name: 'videoPlay',
  props: {},
  data() {
    return {
      autoplay: false,
      // https://segmentfault.com/a/1190000003793988
      // urls
      videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
      playType: '',
      // 音频格式
      audioType: ['cd', 'ogg', 'mp3', 'asf', 'wma', 'wav', 'mp3pro', 'rm', 'real', 'ape', 'module', 'midi', 'vqf'],
      // 视频格式
      video: ['avi', 'wma', 'rmvb', 'rm', 'flash', 'mp4', 'mid', '3gp'],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        sources: {
          type: '',
          src: ''
        },
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  // 全屏按钮
        }
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    audioPlay() {

    },
    initPlay() {}
  }
}
</script>
<style lang="scss" scoped>
.videoPlay {
  width: 100%;
  height: 100%;
}
</style>
