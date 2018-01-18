// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    amd: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ["eslint:recommended", "plugin:vue/recommended"],
  // required to lint *.vue files
  plugins: ['html', 'vue'],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // Ignore no-unused-vars for variable 'state' and 'response', for Vuex compatibility
    'no-unused-vars': ['error', {
      'argsIgnorePattern': '^response$|^state$'
    }],
  }
}
