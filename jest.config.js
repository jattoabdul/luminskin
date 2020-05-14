module.exports = {
  globalSetup: '<rootDir>/jest.setup.js',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  // watchman: false,
  // 'coverageReporters': ['html', 'text-summary'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  // collectCoverageFrom: ['<rootDir>/**/*.(vue|js)'],
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue'
  ],
  transformIgnorePatterns: [
    // eslint-disable-next-line no-useless-escape
    '/node_modules/(?!@babel\/runtime)',
    '/node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic|esm)',
    'node_modules/(?!(babel-jest|jest-vue-preprocessor)/)'
  ],
  forceExit: !!process.env.CI
}
