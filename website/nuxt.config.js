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
                _typeCheck: false,
                get typeCheck() {
                    return this._typeCheck;
                },
                set typeCheck(value) {
                    this._typeCheck = value;
                },
                ignoreNotFoundWarnings: true,
            },
        ],
    ],
    modules: ['../lib/module', 'nuxt-buefy'],
    ghost: {
        url: 'https://atrispina.stream',
        key: '73ba7d2fb76c702df0e1ca8964',
        version: 'v3',
    },
    dev: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV === 'production',
};