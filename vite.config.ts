import {fileURLToPath, URL} from 'node:url';

import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
// import viteCompression from 'vite-plugin-compression';
import {visualizer} from 'rollup-plugin-visualizer';
import {prefetchLazyPlugin} from './src/plugins/PrefetchLazyPlugin';
// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    // console.log(env);
    return {
        base: env.VITE_BASE_URL,
        cacheDir: 'node_modules/.my-vite-cache',
        optimizeDeps: {
            exclude: ['lodash'],
            include: ['echarts']
        },
        logLevel: 'info',
        clearScreen: false,
        server: {
            port: 9080,
            host: '0.0.0.0',
            // open: true,
            proxy: {
                '/api': {
                    target: 'https://cnodejs.org/api/v1',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },
        envPrefix: 'VITE_',
        build: {
            // outDir: env.VITE_OUTPUT_DIR,
            // assetsDir: 'assets-aa',
            sourcemap: false,
            cssCodeSplit: true,
            assetsInlineLimit: 4096,
            // 添加更多优化选项
            cssMinify: true, // 开启css压缩， 还有取值：false, esbuild (效果同true)、lightningcss
            minify: 'terser', // 或 'esbuild'
            terserOptions: {
                compress: {
                    drop_console: true, // 删除 console 语句
                    drop_debugger: true, // 删除 debugger 语句
                }
            },
            chunkSizeWarningLimit: 1500, // 增加 chunk 大小警告限制
            rollupOptions: {
                output: {
                    // manualChunks: {
                    //     lodash: ['lodash'],
                    //     echarts: ['echarts'],
                    //     dayjs: ['dayjs'],
                    //     axios: ['axios'],
                    //     'element-plus': ['element-plus'],
                    //     vue: ['vue', 'vue-router', 'pinia'],
                    //     'a-b-c-d': [
                    //         'src/views/AView.vue',
                    //         'src/views/BView.vue',
                    //         'src/views/CView.vue',
                    //         'src/views/DView.vue'
                    //     ]
                    // },
                    manualChunks(id) {
                        // if (
                        //     id.includes('src/views/AView.vue') ||
                        //     id.includes('src/views/BView.vue') ||
                        //     id.includes('src/views/CView.vue') ||
                        //     id.includes('src/views/DView.vue')
                        // ) {
                        //     return 'a-b-c-d-lib';
                        // }
                        if (id.includes('node_modules') && id.includes('dayjs')) {
                            return 'dayjs-lib';
                        }
                        if (id.includes('node_modules') && id.includes('element-plus')) {
                            return 'element-plus-lib';
                        }
                        if (id.includes('node_modules') && id.includes('echarts')) {
                            return 'echarts-lib';
                        }
                        if (id.includes('node_modules') && id.includes('vue')) {
                            return 'vue-lib';
                        }
                        if (id.includes('node_modules') && id.includes('lodash-es')) {
                            return 'lodash-lib';
                        }
                        if (id.includes('node_modules') && id.includes('axios')) {
                            return 'axios-lib';
                        }
                        // if (id.includes('node_modules')) {
                        //     console.log('----', id.toString().split('node_modules/')[1]);
                        //     return id.toString().split('node_modules/')[1].split('/')[1].toString();
                        // }
                    },
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                    // assetFileNames: '[ext]/[name]-[hash].[ext]'
                    assetFileNames: (assetInfo) => {
                        if (assetInfo.names && assetInfo.names[0].endsWith('.css')) {
                            return 'css/[name]-[hash].[ext]';
                        }
                        return 'imgs/[name]-[hash].[ext]';
                    }
                }
            }
            // chunkSizeWarningLimit: 1500 * 1024
        },
        plugins: [
            vue(),
            vueJsx(),
            // vueDevTools(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
                imports: ['vue']
                // dts: 'src/auto-imports.d.ts'
            }),
            Components({
                resolvers: [ElementPlusResolver()]
                // dts: 'src/components.d.ts'
            }),
            // prefetchLazyPlugin([
            //     'src/views/AView.vue',
            //     'src/views/BView.vue',
            //     'src/views/CView.vue',
            //     'src/views/DView.vue'
            // ]),
            prefetchLazyPlugin(['AView', 'BView', 'CView', 'DView'], env.VITE_BASE_URL),
            // gzip压缩 生产环境生成 .gz 文件
            // viteCompression({
            //     verbose: true,
            //     disable: false,
            //     threshold: 10240,
            //     algorithm: 'gzip',
            //     ext: '.gz'
            // }),
            // // brotli压缩 生产环境生成.br 文件
            // viteCompression({
            //     verbose: true,
            //     disable: false,
            //     threshold: 10240,
            //     algorithm: 'brotliCompress',
            //     ext: '.br'
            // }),
            visualizer({
                // open: true,
                gzipSize: true,
                brotliSize: true
                // template: 'network'
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        }
    };
});
