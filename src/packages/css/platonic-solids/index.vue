<template>
  <div id="menu">
    <p id="controls">close controls</p>
    <div id="showhide">
      <hr />
      <p><input type="range" min="0" max="4" step="1" value="3" id="solid" /> solid</p>
      <p><input type="range" min="0" max="4" step="1" value="0" id="division" /> face division</p>
      <p><input type="range" min="0" max="0.9" step="any" value="0.8" id="hole" /> hole</p>
      <p><input type="range" min="0" max="1.2" step="any" value="0.5" id="color" /> color</p>
      <p><input type="range" min="0" max="4" step="any" value="1" id="speed" /> speed</p>
      <p>FPS : <span id="fps"></span></p>
    </div>
    <!-- showhide -->
  </div>
  <!-- menu -->
  <p id="logo">
    Proudly powered by
    <img
      alt=""
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAYAAABzyUiPAAAAk0lEQVRYhe2WSwrAIAxEc/9Vz+GJeo8eIF0VrGj85AOtMzAQRREfI5EYUomYmVNK8IJfAK/z2NYACIAbAySi7lhaM1JLc60ztADL3pArDKBUP2MtwN4eC4CtRmv2hGswclBlQvL1FgBrZ3glMBygRR2VwNHUuTSRmcvNPPOROSuAUtJcE/h14xsDgD8ACCsAQuu6AeE0MgiMWHpWAAAAAElFTkSuQmCC"
    />
  </p>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="scss">
body {
  font-family: Arial, Helvetica, 'Liberation Sans', FreeSans, sans-serif;
  background-color: #000;
  margin: 0;
  padding: 0;
  border-width: 0;
  cursor: pointer;
}

#menu {
  font-size: 80%;
  margin: 0;
  padding: 5px;
  position: absolute;
  left: 5px;
  top: 5px;
  border-radius: 10px;
  background-color: rgba(255, 255, 128, 0.9);
  color: black;
  z-index: 10;
}

#menu.hidden #showhide {
  display: none;
}

#controls {
  margin-top: 0px;
  margin-bottom: 0px;
}
#menu button {
  margin-right: 5px;
  margin-left: 5px;
}
#logo {
  margin: 0;
  padding: 0;
  z-index: 100;
  color: #fff;
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
