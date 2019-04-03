module.exports = [{
        name: 'vue',
        plugins: ['vue', 'vue-router']
    },
    // {
    //     name: 'lib',
    //     plugins: ['axios']
    // },
    {
        name: 'plugin',
        plugins: ['@reasy-team/reasy-ui-vue'],
        ref: 'vue'
    }
];