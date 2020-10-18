module.exports = {
    coveragePathIgnorePatterns: ['/node_modules/'],

    rootDir: 'src',

    // The test environment that will be used for testing
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

    testPathIgnorePatterns: ['/node_modules/'],
};
