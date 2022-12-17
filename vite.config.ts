import { defineConfig } from 'vite'
import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh()
  ],
  "resolve": {
    // 路径别名
    "alias": [
      // 适配less文件
      { find: /^~/, replacement: '' },
      // 适配默认导入方式
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  },
  esbuild: {
    // 为jsx/tsx文件自动注入React变量
    // 同时, 项目其他文件中不能出现`import React from 'react'`语句, 否则会引起变量名重复, 导致项目无法启动
    "jsxInject": "import React from 'react';"
  }
})
