import keykeyjs from './index.js'

const reducers = (action) => {
  switch (action.type) {
    case 'ArrowLeft +':
      console.log('press ArrowLeft');
      break;
    case 'ArrowLeft -':
      console.log('not press ArrowLeft');
      break;
    case 's +':
      console.log('stop listen 2s');
      keykeyjs.stopListen(2000);
      break;
    case 'a +':
      console.log('stop listen until async finish');
      keykeyjs.stopListen((restart) => {
        console.log('start async action')
        setTimeout(() => {
          console.log('finish!')
          restart()
        }, Math.random() * 3000)
      });
      break;
  }
}

keykeyjs.launch({
  targetDOM: document,
  reducers: [reducers]
})