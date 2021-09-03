<template>
  <div class="videoPlay-entry">
    videoPlay组件
    <video-player v-bind="videoOption" />
    <audio-player v-bind="AudioPlayerOption" />
  </div>
</template>
<script>
import AudioPlayer from './coms/audio-player.vue'
import VideoPlayer from './coms/video-player.vue'
export default {
  name: 'VideoPlayEntry',
  components: { AudioPlayer, VideoPlayer },
  data() {
    return {
      AudioPlayerOption: {
        src: 'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3',
        buyFlag: true // 是否购买版权
      },
      videoOption: {
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        buyFlag: true // 是否购买版权
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    play(e) {
      console.log(e, 'play')
    },
    pause(e) {
      console.log(e, 'pause')
    }
  }
}
</script>
<style lang="scss" scoped>
.videoPlay-entry {
  width: 800px;
  height: 795px;
  margin: 100px;
}
</style>
