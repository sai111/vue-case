<!-- videoPlay文档 -->
https://github.com/shijun931011/YCVideoPlayer
https://github.com/bilibili/flv.js

* 01.最简单的播放
* 02.如何切换视频内核
* 03.切换视频模式
* 04.切换视频清晰度
* 05.视频播放监听
* 06.列表中播放处理
8.添加自定义视图
* 如何兼容不同内核播放器
    * 具体看这篇文章：06.播放器UI抽取封装

09.视频播放器优化处理
* 如何兼容不同内核播放器
    * 具体看这篇文章：05.视频播放器内核切换封装
* 播放器UI抽取封装优化
    * 具体看这篇文章：06.播放器UI抽取封装
* 视频缓存原理介绍
    * 具体看这篇文章：12.视频边播边缓存分析
* 如何全局监控视频埋点
    * 具体看这篇文章：29.视频播放器埋点监听
* 代码方面优化措施
    * 具体看这篇文章：08.视频播放器优化处理




https://github.com/redxtech/vue-plyr

Vue-Core-Video-Player

https://zhuanlan.zhihu.com/p/74566301


// 音频

// https://segmentfault.com/a/1190000012453975


// 视频


```
https://segmentfault.com/a/1190000009395289
<video
  id="video" 
  src="video.mp4" 
  controls = "true"
  poster="images.jpg" /*视频封面*/
  preload="auto" 
  webkit-playsinline="true" /*这个属性是ios 10中设置可以
                     让视频在小窗内播放，也就是不是全屏播放*/  
  playsinline="true"  /*IOS微信浏览器支持小窗内播放*/ 
  x-webkit-airplay="allow" 
  x5-video-player-type="h5"  /*启用H5播放器,是wechat安卓版特性*/
  x5-video-player-fullscreen="true" /*全屏设置，
                     设置为 true 是防止横屏*/
  x5-video-orientation="portraint" //播放器支付的方向， landscape横屏，portraint竖屏，默认值为竖屏
  style="object-fit:fill"
  />
```


// https://segmentfault.com/a/1190000019623347
// https://segmentfault.com/a/1190000009395289
