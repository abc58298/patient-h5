import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
//配置vant组件自动注册的插件

//配置vantui组件库解析器
import Components from "unplugin-vue-components/vite"
import { VantResolver } from 'unplugin-vue-components/resolvers'
//配置svg插件
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  //自动引入组件时样式和类型声明文件重复
    Components({
      resolvers:[VantResolver({importStyle:false})]
    }),
    createSvgIconsPlugin({
      //配置svg图标的存放路径
      iconDirs:[path.resolve(process.cwd(),'src/icons')],
      //配置svg图标的类名前缀
      symbolId:'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
