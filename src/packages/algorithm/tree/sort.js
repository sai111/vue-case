const fs = require('fs')
const data = require('./data.json')

const res = {}

function sortArr(data) {
  for (i = 0; i < data.length; i++) {
    sortItem((data[i].team).split('/'), data[i].name)
  }
}

function sortItem(arr, item) {
  // temp相当于一个对象指针，不断向res的内层遍历并修改res指向的对象的值
  let temp = res
  // 为了在for循环外面获取i的值
  let i
  // 遍历部门数组添加属性   
  for (i = 0; i < arr.length - 1; i++) {
    // 若该属性未被赋值则将其赋值为空对象
    if (temp[arr[i]] === undefined) {
      temp[arr[i]] = {}
    }
    // 向内层遍历
    temp = temp[arr[i]]
  }
  // i===arr.lenght-1时其值应为数组
  if (temp[arr[i]] === undefined) {
    // 最内层属性的值未定义，则要将其值改变为数组并将item添加进去
    temp[arr[i]] = [item]
  } else {
    // 最内层属性已经定义过了，直接将item添加进去
    temp[arr[i]].push(item)
  }
}

sortArr(data)

console.log(res, 'res--5555')
// 写入到output.json
fs.writeFile(__dirname+'/output.json', JSON.stringify(res), (err)=>{
  if (err) throw err
  console.log('写入成功！')
})
