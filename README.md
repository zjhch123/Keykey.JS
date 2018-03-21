# KeyKey.JS!
基于redux设计思想的web端键盘按键监听工具。

[live demo](http://139.129.132.196/show/keykeyjs/) - **请打开控制台**

## 设计思想
![design.png](https://raw.githubusercontent.com/zjhch123/Keykey.JS/master/docs/design.png)

## for Test & Dev & Build
```
npm i
npm run dev
npm run build
```

## for use
### install
```
npm i keykeyjs --save
```
or
```
<script src="https://statis.hduzplus.xyz/keykeyjs/index.js"></script>
```

### usage
```javascript
/*
1. define reducer
action: {
  type: '{key} +/-' // key - 按键, +/- - 按下 / 弹起,
  payload: Event    // 原生事件
}
*/
const reducers = (action) => {
  switch (action.type) {
    case 'ArrowLeft +': // 按下左方向键，事件会持续触发
      console.log('press ArrowLeft');
      break;
    case 'ArrowLeft -': // 弹起左方向键，事件在弹起时触发一次
      console.log('not press ArrowLeft');
      break;
    case 's +':
      console.log('stop listen 2s');
      keykeyjs.stopListen(2000); // keykeyjs提供了暂停监听函数
      break;
    case 'a +':
      console.log('stop listen until async finish');
      keykeyjs.stopListen((restart) => {  // 暂停监听函数的参数可以传入函数，函数中包含默认参数restart，调用restart之后会继续开始监听
        console.log('start async action')
        setTimeout(() => {
          console.log('finish!')
          restart()
        }, Math.random() * 3000)
      });
      break;
  }
}

/*
2. launch
*/
keykeyjs.launch({
  targetDOM: document, // 设置监听时焦点所在的dom
  reducers: [reducers], // 可以传入reducers数组,
  // reducer: reducer  // 也可以传入单一reducer
})
```
