const config = require('../../website/nuxt.config.js');
const request = require('request-promise-native');
const { Nuxt, Builder } = require('nuxt');

const url = path => `http://localhost:3000${path}`;
const get = path => request(url(path));

let nuxt;
let addTemplate;

const setupNuxt = async config => {
    nuxt = new Nuxt(config);

    // Spy addTemplate
    addTemplate = nuxt.moduleContainer.addTemplate = jest.fn(nuxt.moduleContainer.addTemplate);

    const build = new Builder(nuxt);

    await build.validatePages();
    await build.generateRoutesAndFiles();
    await nuxt.listen(3000);
};

jest.setTimeout(10000);

describe('Nuxt Ghost Module', () => {
    beforeAll(async() => {
        nuxt = new Nuxt(config);

        // Spy addTemplate
        addTemplate = nuxt.moduleContainer.addTemplate = jest.fn(nuxt.moduleContainer.addTemplate);

        await new Builder(nuxt).build();
        await nuxt.listen(3000);
    }, 60000);

    afterAll(async() => {
        await nuxt.close();
    });

    test('SSR', async() => {
        const html = await get('/');
        expect(html).toContain('Welcome to Ghost');
    });

    test('CSR', async() => {
        const window = await nuxt.renderAndGetWindow(url('/'));

        window.onNuxtReady(() => {
            const html = window.document.body.innerHTML;
            expect(html).toContain('Welcome to Ghost');
        });
    });
});