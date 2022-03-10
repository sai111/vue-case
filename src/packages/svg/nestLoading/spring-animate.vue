<template>
  <div class="spring-animate">
    弹跳动画
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRetio="xMidYMid meet"
      width="100%"
      height="100%"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <path :d="drawPath('circle')" class="circle" fill="none" stroke="rgba(49, 192, 92, 0.6)" />
      <path class="star" fill="none" stroke="rgba(49, 192, 92, 0.5)" />
      <path :d="drawPath('rect')" class="rect" fill="none" stroke="rgba(49, 192, 92, 0.4)" />
      <path class="triangle" fill="none" stroke="rgba(49, 192, 92, 0.3)" />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'SpringAnimate',
  components: {},
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    radius: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {}
  },
  computed: {
    cx() {
      return this.width / 2
    },
    cy() {
      return this.height / 2
    }
  },
  mounted() {},
  methods: {
    /***
     * 绘制圆
     * rx ry x-axis-rotation large-arc-flag sweep-flag X Y，表示绘制一个椭圆圆弧经过(X,Y)点。
     * rx：椭圆横轴半径
     * ry：椭圆竖轴半径
     * x-axis-rotation：椭圆横轴相对于CanvasX轴的偏移角度
     * large-arc-flag：在前面三个参数确定的情况下，满足当前点到指定点(X,Y)位置条件的圆弧总是有四条，此值取0表示绘制小弧度，取值1表示绘制大弧度
     * sweep-flag：在前三个参数确定的情况下，满足当前点到指定点(X,Y)位置条件的圆弧总是有四条，去掉上面large-arc-flag标识后还有两个，sweep-flag 取值0表示绘制逆时针方向的圆弧，取值1表示绘制顺时针方向的圆弧
     */
    drawPath (type) {
      console.log(type, 'type--6666')
      switch (type) {
        case 'circle':
          return `M${this.cx - this.radius},${this.cy}
            a${this.radius},${this.radius} 0 1,0 ${this.radius * 2}, 0
            a${this.radius},${this.radius} 0 1,0 -${this.radius * 2}, 0`
        case 'rect':
          return `M${this.cx - this.radius},${this.cy}
            L${this.cx - this.radius},${this.cy - this.radius}
            L${this.cx + this.radius},${this.cy - this.radius}
            L${this.cx + this.radius},${this.cy + this.radius}
            L${this.cx - this.radius},${this.cy + this.radius}
            Z`
      }

    }
  }
}
</script>
<style scoped lang="scss">
.spring-animate {
  width: 100%;
  height: 60%;
  margin: 100px auto;
  border: 1px solid red;
  color: #fff;
  svg {}
}
</style>
