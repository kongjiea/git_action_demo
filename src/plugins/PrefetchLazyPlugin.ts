// 定义插件函数，接收需要预加载的文件路径数组作为参数
export const prefetchLazyPlugin = (paths: string[] = []) => {
    // 存储匹配到的需要预加载的脚本文件路径
    const scriptArrs: string[] = [];

    return {
        // 插件名称，在 Vite/Rollup 中必须唯一
        name: 'vite-plugin-prefetch-lazy',

        // Rollup 钩子函数，在构建阶段生成 bundle 时调用
        // 用于扫描构建产物，找出需要预加载的文件
        generateBundle(_options, bundle) {
            // console.log('options', _options);

            // 获取 bundle 中的所有文件项
            const values = Object.values(bundle);
            // console.log('values', values);

            // 遍历所有打包后的文件
            values.forEach((item) => {
              // console.log('item.name', item.name)
              // console.log('item.fileName', item.fileName)
              // 检查文件名是否在预设的预加载路径列表中
              // 修改匹配逻辑，支持匹配带有哈希值的文件名
              const matchedPath = paths.find(path =>
                item.name === path ||  // 精确匹配
                item.name.startsWith(path + '-') ||  // 匹配带哈希的文件
                item.fileName.includes('/' + path + '-')  // 匹配文件路径
              );

              if (matchedPath) {
                  // console.log('item', item.fileName);
                  // 将匹配的文件路径添加到预加载列表中
                  scriptArrs.push('/' + item.fileName);
              }
            });
            // console.log('isWrite', isWrite);
        },

        // Vite 专用钩子，用于转换 index.html
        // 在开发服务器和构建过程中都会调用
        transformIndexHtml(html,ctx) {
          // console.log('ctx', ctx);
          // console.log('html', html);
            // 为每个需要预加载的脚本文件生成 prefetch link 标签
            return scriptArrs.map((href) => {
              const isCSS = href.endsWith('.css');
              return {
                  tag: 'link',        // HTML 标签名
                  attrs: {            // 标签属性
                      rel: 'prefetch',   // 资源预加载属性
                      href: href,        // 资源地址
                      as: isCSS ? 'style' : 'script'  // 根据文件类型设置正确的资源类型
                  },
                  injectTo: 'head' as const    // 注入到 HTML 的 head 部分
              };
            });
        }
    };
};
