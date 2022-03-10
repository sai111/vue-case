## 绘制圆

  ```
    <path
      d="Mcx,cy
      m -r,0
      a r,r 0 1,0 (r * 2) ,0
      a r, r 0 1,0 -(r * 2), 0
      "
    />
    或者
    <path
      d="
        M cx-r, cy
        a r,r 0 1,0 r * 2,0
        a r,r, 0 1, 0 -(r * 2),0
      "
    />
  ```

1. cx,cy起点，r圆弧半径
2. A命令后面的两个参数表示的是绝对坐标
3. a命令后面的两个参数表示的是相对坐标

## 绘制圆弧

    参数：rx ry x-axis-rotation large-arc-flag sweep-flag X Y，表示绘制一个椭圆圆弧经过(X,Y)点。
    1. rx：椭圆横轴半径
    2. ry：椭圆竖轴半径
    3. x-axis-rotation：椭圆横轴相对于CanvasX轴的偏移角度
    4. large-arc-flag：在前面三个参数确定的情况下，满足当前点到指定点(X,Y)位置条件的圆弧总是有四条，此值取0表示绘制小弧度，取值1表示绘制大弧度
    5. sweep-flag：在前三个参数确定的情况下，满足当前点到指定点(X,Y)位置条件的圆弧总是有四条，去掉上面large-arc-flag标识后还有两个，sweep-flag 取值0表示绘制逆时针方向的圆弧，取值1表示绘制顺时针方向的圆弧
