import { defineConfig } from 'vite'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
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
})
