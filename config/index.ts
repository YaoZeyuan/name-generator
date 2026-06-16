import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import fs from 'node:fs'
import path from 'node:path'
import devConfig from './dev'
import prodConfig from './prod'

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
      fs.rmSync(outputDir, { recursive: true, force: true })
      fs.cpSync(apiDir, outputDir, {
        recursive: true,
        filter(source) {
          const rel = path.relative(apiDir, source).replace(/\\+/g, '/')
          if (!rel) return true
          if (rel === 'database/source' || rel.startsWith('database/source/')) return false
          if (rel === 'database/extracted' || rel.startsWith('database/extracted/')) return false
          if (/^database\/candidate\/sources\/.+\.candidate_name_db\.json$/u.test(rel)) return false
          return true
        }
      })
    }
  }
}

function imageStaticPlugin() {
  const imgDir = path.resolve(process.cwd(), 'resource', 'img')
  const outputDir = path.resolve(process.cwd(), 'dist', 'resource', 'img')
  const mime: Record<string, string> = {
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml; charset=utf-8',
    '.webp': 'image/webp'
  }

  return {
    name: 'image-static-files',
    configureServer(server) {
      server.middlewares.use('/resource/img', (req, res, next) => {
        const requestPath = decodeURIComponent((req.url || '').split('?')[0] || '')
        const normalized = path.normalize(requestPath).replace(/^(\.\.(\/|\\|$))+/, '')
        const filePath = path.resolve(imgDir, normalized.replace(/^[\/\\]+/, ''))
        if (!filePath.startsWith(imgDir)) {
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
      if (!fs.existsSync(imgDir)) {
        return
      }
      fs.rmSync(outputDir, { recursive: true, force: true })
      fs.mkdirSync(path.dirname(outputDir), { recursive: true })
      fs.cpSync(imgDir, outputDir, { recursive: true })
    }
  }
}

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'vite'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'vite'> = {
    projectName: '好名有据',
    date: '2026-6-12',
    designWidth (input) {
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
        imageStaticPlugin()
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
