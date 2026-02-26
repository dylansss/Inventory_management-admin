import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
const root = process.cwd();
function pathResolve(dir) {
  return resolve(root, ".", dir);
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://129.211.5.21',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: [
      {
        find: /\@\//,
        replacement: `${pathResolve("src")}/`,
      },
      {
        find: /\~\//,
        replacement: `${pathResolve("src")}/`,
      },
    ],
  },
})
