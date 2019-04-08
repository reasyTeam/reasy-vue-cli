/**
 * @desc
 * 现有webpack dllPlugin配置项
 */

module.exports = [{
        name: 'vue',
        plugins: ['vue/dist/vue.min.js', 'vue-router']
    },
    {
        name: 'plugin',
        plugins: ['@reasy-team/reasy-ui-vue'],
        ref: 'vue'
    },
    {
        name: 'lib',
        plugins: ['axios']
    }
];