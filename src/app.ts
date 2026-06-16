import { createApp } from 'vue'

import 'taro-ui/dist/style/index.css'
import './app.less'

const App = createApp({
  onShow(options) {
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

export default App
