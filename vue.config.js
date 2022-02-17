// const {merge} = require('webpack')
// const tsImportPluginFactory = require('ts-import-plugin')
module.exports = {
    /*chainWebpack: config => {
        config.module
            .rule('ts')
            .use('ts-loader')
            .tap((options) => {
                options = merge(options, {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryName: 'vant',
                                libraryDirectory: 'es',
                                style: true,
                            }),
                        ],
                        compilerOptions: {
                            module: 'es2015',
                        },
                    }),
                })
                // 返回修改后的选项配置。
                return options
            })
    },*/

    lintOnSave: false,
    devServer: {
        host: '127.0.0.1',
        port: 80,
        open: true,
        proxy: {
            '/jiekou_api': {
                // target: "http://192.168.1.157:35001",//只要是以/api2开头的链接都会被代理到 这个target属性所代表的位置（我这里是：https://www.666.com）
                target: "http://192.168.2.31:35001",//只要是以/api2开头的链接都会被代理到 这个target属性所代表的位置（我这里是：https://www.666.com）
                ws: false,
                changeOrigin: true,
                cookieDomainRewrite: {
                    "*": ""
                },
                cookiePathRewrite: {
                    "*": ""
                },
                pathRewrite: {
                    "^/jiekou_api": ""  //这里是将/api2替换为空字符串“” ，也就是删除的意思
                }
            }
        }
    }
}
