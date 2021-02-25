const resolve = require('path').resolve;

module.exports = {
    rootDir: resolve(__dirname, '../'),
    srcDir: __dirname,
    render: {
        resourceHints: false,
    },
    buildModules: [
        [
            '@nuxt/typescript-build',
            {
                typeCheck: false,
                ignoreNotFoundWarnings: true,
            },
        ],
    ],
    modules: ['../lib/module', 'nuxt-buefy'],
    ghost: {
        url: 'https://knowzone.manatt.com',
        key: 'cfd973d2b4b4f8f74b0cc100f6',
        version: 'v3',
    },
    dev: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV === 'production',
};