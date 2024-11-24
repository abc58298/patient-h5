module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    // 小程序全局变量
    uni: true,
    wx: true,
    WechatMiniprogram: true,
    getCurrentPages: true,
    getApp: true,
    UniApp: true,
    UniHelper: true,
    App: true,
    Page: true,
    Component: true,
    AnyObject: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    extraFileExtensions: ['.vue'], // 支持 .vue 文件
  },
  rules: {
    "vue/multi-word-component-names": "off",
    camelcase: "off", // 关闭驼峰命名规则
    "no-underscore-dangle": "off", // 关闭下划线检测规则
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        printWidth: 120,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
    'vue/multi-word-component-names': ['off'],
    'vue/no-setup-props-destructure': ['off'],
    'vue/no-deprecated-html-element-is': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'], // 关闭未使用变量规则
    '@typescript-eslint/no-unused-expressions': ['off'],
    '@typescript-eslint/no-require-imports': 'off', // 显式禁用 require 导入规则
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off']
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.vue'], // 覆盖 TypeScript 文件
      rules: {
        '@typescript-eslint/no-require-imports': 'off', // 强制禁用 require 导入规则
      },
    },
  ],
}
