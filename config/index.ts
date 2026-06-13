import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import fs from 'node:fs'
import path from 'node:path'
import devConfig from './dev'
import prodConfig from './prod'

import Components from 'unplugin-vue-components/vite'

function apiStaticPlugin() {
  const apiDir = path.resolve(process.cwd(), 'api')
  const outputDir = path.resolve(process.cwd(), 'dist', 'api')
  const mime: Record<string, string> = {
    '.json': 'application/json; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8'
  }

  return {
    name: 'api-static-files',
    configureServer(server) {
      server.middlewares.use('/api', (req, res, next) => {
        const requestPath = decodeURIComponent((req.url || '').split('?')[0] || '')
        const normalized = path.normalize(requestPath).replace(/^(\.\.(\/|\\|$))+/, '')
        const filePath = path.resolve(apiDir, normalized.replace(/^[\/\\]+/, ''))
        if (!filePath.startsWith(apiDir)) {
          next()
          return
        }
        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
          next()
          return
        }
        res.setHeader('Content-Type', mime[path.extname(filePath)] || 'application/octet-stream')
        fs.createReadStream(filePath).pipe(res)
      })
    },
    closeBundle() {
      if (!fs.existsSync(apiDir)) {
        return
      }
      fs.cpSync(apiDir, outputDir, { recursive: true })
    }
  }
}

function nutTaroPackageResolver() {
  return {
    type: 'component' as const,
    resolve(name: string) {
      if (!name.startsWith('Nut')) {
        return undefined
      }
      const componentName = name.slice(3)
      const packageName = '@nutui/nutui-taro'
      const componentDir = componentName.toLowerCase()
      return {
        as: name,
        from: `${packageName}/dist/packages/${componentDir}/index.mjs`,
        sideEffects: `${packageName}/dist/packages/${componentDir}/style/css`
      }
    }
  }
}

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'vite'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'vite'> = {
    projectName: 'myApp',
    date: '2026-6-12',
    designWidth (input) {
      // 配置 NutUI 375 尺寸
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    defineConstants: {
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'vue3',
    compiler: {
      type: 'vite',
      vitePlugins: [
        apiStaticPlugin(),
        Components({
          resolvers: [nutTaroPackageResolver()]
        })
      ]
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {

          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',

      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
