import Color from './color'

export default class VisualMap {
  constructor({ visualMap}) {
    this.createMap(visualMap)
  }
  createMap(visualMap) {
    this.map = visualMap.map((stop) => {
      return {
        value: stop.value,
        color: new Color(stop.color)
      }
    })
  }
  filter(value) {
    if (!this.map && this.map.length === 0) return false
    let i
    for (i = 0; i < this.map.length - 1; i++) {
      if (value <= this.map[i].value || (i === (this.map.length - 1))) {
        if (i === 0) {
          return (this.map[i].color).get16String()
        } else {
          const color1 = this.map[i - 1].color
          const color2 = this.map[i].color
          const t = (value - this.map[i - 1].value) / (this.map[i].value - this.map[i - 1].value)
          return (Color.lerp(color1, color2, t)).get16String()
        }
      }
    }
    const color3 = this.map[i - 1].color
    const color4 = this.map[i].color
    const t2 = (value - this.map[i - 1].value) / (this.map[i].value - this.map[i - 1].value)
    return  (Color.lerp(color3, color4, t2)).get16String()
  }
  initArr() {
    this.map = []
  }
}
