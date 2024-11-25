// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/zhang/Desktop/uniapp-ts-a/uniapp-ts/node_modules/.pnpm/vite@5.4.11_@types+node@22.9.0/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/zhang/Desktop/uniapp-ts-a/uniapp-ts/node_modules/.pnpm/@vitejs+plugin-vue@5.2.0_vite@5.4.11_@types+node@22.9.0__vue@3.5.13_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///C:/Users/zhang/Desktop/uniapp-ts-a/uniapp-ts/node_modules/.pnpm/vite-plugin-vue-devtools@7.6.4_@nuxt+kit@3.14.159_rollup@4.27.2__rollup@4.27.2_vite@5.4.11_@t_2yr45d6ufsofqxey4qzjezomf4/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import Components from "file:///C:/Users/zhang/Desktop/uniapp-ts-a/uniapp-ts/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_@nuxt+kit@3.14.159_rollup@4.27.2__rollup@_ro56abidtyzvqito7zrbdwx5be/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///C:/Users/zhang/Desktop/uniapp-ts-a/uniapp-ts/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_@nuxt+kit@3.14.159_rollup@4.27.2__rollup@_ro56abidtyzvqito7zrbdwx5be/node_modules/unplugin-vue-components/dist/resolvers.js";
import { createSvgIconsPlugin } from "file:///C:/Users/zhang/Desktop/uniapp-ts-a/uniapp-ts/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.11_@types+node@22.9.0_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
var __vite_injected_original_import_meta_url = "file:///C:/Users/zhang/Desktop/uniapp-ts-a/uniapp-ts/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    //自动引入组件时样式和类型声明文件重复
    Components({
      resolvers: [VantResolver({ importStyle: false })]
    }),
    createSvgIconsPlugin({
      //配置svg图标的存放路径
      iconDirs: [path.resolve(process.cwd(), "src/icons")],
      //配置svg图标的类名前缀
      symbolId: "icon-[dir]-[name]"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx6aGFuZ1xcXFxEZXNrdG9wXFxcXHVuaWFwcC10cy1hXFxcXHVuaWFwcC10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcemhhbmdcXFxcRGVza3RvcFxcXFx1bmlhcHAtdHMtYVxcXFx1bmlhcHAtdHNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3poYW5nL0Rlc2t0b3AvdW5pYXBwLXRzLWEvdW5pYXBwLXRzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG4vL1x1OTE0RFx1N0Y2RXZhbnRcdTdFQzRcdTRFRjZcdTgxRUFcdTUyQThcdTZDRThcdTUxOENcdTc2ODRcdTYzRDJcdTRFRjZcblxuLy9cdTkxNERcdTdGNkV2YW50dWlcdTdFQzRcdTRFRjZcdTVFOTNcdTg5RTNcdTY3OTBcdTU2NjhcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCJcbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbi8vXHU5MTREXHU3RjZFc3ZnXHU2M0QyXHU0RUY2XG5pbXBvcnQge2NyZWF0ZVN2Z0ljb25zUGx1Z2lufSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlRGV2VG9vbHMoKSxcbiAgLy9cdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcdTdFQzRcdTRFRjZcdTY1RjZcdTY4MzdcdTVGMEZcdTU0OENcdTdDN0JcdTU3OEJcdTU4RjBcdTY2MEVcdTY1ODdcdTRFRjZcdTkxQ0RcdTU5MERcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczpbVmFudFJlc29sdmVyKHtpbXBvcnRTdHlsZTpmYWxzZX0pXVxuICAgIH0pLFxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgIC8vXHU5MTREXHU3RjZFc3ZnXHU1NkZFXHU2ODA3XHU3Njg0XHU1QjU4XHU2NTNFXHU4REVGXHU1Rjg0XG4gICAgICBpY29uRGlyczpbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksJ3NyYy9pY29ucycpXSxcbiAgICAgIC8vXHU5MTREXHU3RjZFc3ZnXHU1NkZFXHU2ODA3XHU3Njg0XHU3QzdCXHU1NDBEXHU1MjREXHU3RjAwXG4gICAgICBzeW1ib2xJZDonaWNvbi1bZGlyXS1bbmFtZV0nXG4gICAgfSlcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVSxTQUFTLGVBQWUsV0FBVztBQUVyVyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFJeEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFFN0IsU0FBUSw0QkFBMkI7QUFDbkMsT0FBTyxVQUFVO0FBWjBMLElBQU0sMkNBQTJDO0FBYzVQLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFlBQVk7QUFBQTtBQUFBLElBRVosV0FBVztBQUFBLE1BQ1QsV0FBVSxDQUFDLGFBQWEsRUFBQyxhQUFZLE1BQUssQ0FBQyxDQUFDO0FBQUEsSUFDOUMsQ0FBQztBQUFBLElBQ0QscUJBQXFCO0FBQUE7QUFBQSxNQUVuQixVQUFTLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFFLFdBQVcsQ0FBQztBQUFBO0FBQUEsTUFFakQsVUFBUztBQUFBLElBQ1gsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
