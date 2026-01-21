import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // 字符串使用单引号
      quotes: ['error', 'single', { avoidEscape: true }],
      // 语句结尾不使用分号
      semi: ['error', 'never'],
      // 对象/导入的花括号内必须有空格
      'object-curly-spacing': ['error', 'always'],
      // 逗号后必须有一个空格，逗号前不能有空格
      'comma-spacing': ['error', { before: false, after: true }],
      // 对象字面量的键值之间必须有一个空格
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      // 禁止连续多个空格
      'no-multi-spaces': ['error'],
      // 注释符号后必须保留一个空格
      'spaced-comment': ['error', 'always'],
      // 必须使用 === 和 !==
      eqeqeq: ['error', 'always'],
      // 二元运算符左右必须有空格（含赋值运算符）
      'space-infix-ops': ['error'],
      // 关键字前后必须有空格（如 if / else）
      'keyword-spacing': ['error', { before: true, after: true }],
      // 块级花括号前必须有空格
      'space-before-blocks': ['error', 'always'],
      // 类型注解的冒号后必须有空格
      '@stylistic/type-annotation-spacing': [
        'error',
        { before: false, after: true },
      ],
      // 允许使用 any 类型
      '@typescript-eslint/no-explicit-any': 'off',
      // import 顺序：第三方库 > 绝对路径 > 相对路径
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@?\\w'],
            ['^(@/|@src/|src/)'],
            ['^\\.'],
          ],
        },
      ],
    },
  },
])
