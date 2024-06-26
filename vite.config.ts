import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode}) => {
  const env = loadEnv(mode, process.cwd())
  return {
    build: {
      outDir: 'front'
    },
    server: {
      port: 7734,
        proxy: {
          // @ts-ignore
          [env.VITE_BASE_URL]: {
            target: env.VITE_PROXY_URL,
            changeOrigin: true,
            rewrite: (path) => {
              return path.replace(`${env.VITE_BASE_URL}`, '')
            }
          },
          // @ts-ignore
          [env.VITE_BASE_IMG_URL]: {
            target: env.VITE_PROXY_IMG_URL,
            // target: 'https://quickhome-1315319695.cos.ap-chengdu.myqcloud.com/',
            changeOrigin: true,
            rewrite: (path) => {
              return path
            }
          }
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/assets/style/element-plus/index.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
            importStyle: 'sass'
          })
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            // 自动引入修改主题色添加这一行，使用预处理样式
            importStyle: 'sass'
          })
        ],
      })
    ],
  }
})
