/**  time:2018/12/24
 *   作者:农村的师傅
 *   功能:
 */
const path = require('path');
const webpack = require('webpack');
module.exports = {
    configureWebpack: {
        module: {
            rules: [
            ],
        },
        resolve: {
            extensions: ['.vue', '.js'],
            // 别名
            alias: {
                'src': path.resolve(__dirname, './src/'),
                'assets': path.resolve(__dirname, './src/assets'),
                'comp': path.resolve(__dirname, './src/components/'),
                'api': path.resolve(__dirname, './src/api/'),
                'service': path.resolve(__dirname, './src/service/'),

            }
        },

        plugins: [
            // 全局对象注册，比如zepto，lodash这些
            new webpack.ProvidePlugin({
                '$': 'jquery',
            })
        ],
        devServer: {
            // 服务器代理
            proxy: {
                // 看链接: https://segmentfault.com/q/1010000008932798?_ea=1779156
                '/apis/*': {

                    // target将http//localhost:8080/api指向'https//other-server.example.com'
                    target: 'https://game.flyh5.cn/game/wuhui/wxapplet/applet/public/',
                    // 需要设置这个，不然代理的接口全部返回hello world --1
                    changeOrigin: true,
                    secure: false,
                    // 把/apis给去掉
                    pathRewrite: {'^/apis' : ''}
                }
            },
        },
    }
}
