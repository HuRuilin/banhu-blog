import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const path = require('path');
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use './src/styles/index' as *;@use './src/styles/mixin' as *;@use './src/styles/variables' as *;`
            }
        }
    }
})
