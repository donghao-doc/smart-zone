# ESLint 配置

目标：用 ESLint 统一代码风格，减少格式化分歧，提升可读性与可维护性。

## 适用范围

- 仅对 `**/*.{ts,tsx}` 生效。
- 配置文件为 `eslint.config.js`（Flat Config + ESM）。

## 规则片段（与当前配置一致）

> 仅展示与格式化相关的规则片段；完整配置以 `eslint.config.js` 为准。

```js [eslint.config.js]
import { defineConfig } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default defineConfig([
  {
    plugins: {
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
```

## 常用格式化规则

### 单引号与无分号

```js
export default defineConfig([
  {
    rules: {
      // 字符串使用单引号
      quotes: ['error', 'single', { avoidEscape: true }],
      // 语句结尾不使用分号
      semi: ['error', 'never'],
    },
  },
])
```

示例：

```ts
const name = 'smart-zone'
```

### 花括号空格

```js
export default defineConfig([
  {
    rules: {
      // 对象/导入的花括号内必须有空格
      'object-curly-spacing': ['error', 'always'],
    },
  },
])
```

示例：

```ts
import { useState } from 'react'
const style = { width: '100%' }
```

### 逗号与空格

```js
export default defineConfig([
  {
    rules: {
      // 逗号后必须有一个空格，逗号前不能有空格
      'comma-spacing': ['error', { before: false, after: true }],
      // 禁止连续多个空格
      'no-multi-spaces': ['error'],
    },
  },
])
```

示例：

```ts
const list = [1, 2, 3]
```

### 键值冒号空格

```js
export default defineConfig([
  {
    rules: {
      // 对象字面量的键值之间必须有一个空格
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    },
  },
])
```

示例：

```ts
const style = { width: '100%' }
```

### import 顺序规则（simple-import-sort）

```js
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default defineConfig([
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // import 顺序：第三方库 > 绝对路径 > 相对路径
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@?\\w'], // 匹配第三方包与以 `@` 开头的作用域包
            ['^(@/|@src/|src/)'], // 匹配项目内的绝对路径别名
            ['^\\.'], // 匹配相对路径（含样式文件）
          ],
        },
      ],
    },
  },
])
```

示例：

```ts
import { useState } from 'react'
import { Button } from 'antd'

import logo from '@/assets/logo.png'

import './login.scss'
```
