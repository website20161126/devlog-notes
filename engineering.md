# 前端工程化

> 前端工程化是指通过工具和流程来提高前端开发效率、代码质量和可维护性的方法论。

## 📚 学习路径

### 构建工具
- [Vite 现代构建工具](/engineering/vite)
- [Webpack 模块打包](/engineering/webpack)
- [Rollup 库打包](#rollup)
- [Parcel 零配置](#parcel)

### 开发流程
- [CI/CD 持续集成](/engineering/ci-cd)
- [代码规范](#代码规范)
- [自动化测试](#自动化测试)
- [部署策略](/engineering/deploy)

## 🛠️ 构建工具对比

### Vite vs Webpack

| 特性 | Vite | Webpack |
|------|------|---------|
| 启动速度 | ⚡ 极快 | 🐢 较慢 |
| 热更新 | ⚡ 毫秒级 | 🔄 秒级 |
| 配置复杂度 | 🟢 简单 | 🟡 中等 |
| 生态成熟度 | 🟡 发展中 | 🟢 成熟 |
| 生产构建 | 🟢 优秀 | 🟢 优秀 |

### Vite 配置示例

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils')
    }
  },
  
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['lodash', 'axios', 'dayjs']
        }
      }
    }
  }
})
```

### Webpack 配置示例

```javascript
// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    clean: true
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        }
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin()
  ],
  
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json']
  }
}
```

## 📏 代码规范

### ESLint 配置

```json
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-console": "warn",
    "no-debugger": "error",
    "no-unused-vars": "error",
    "prefer-const": "error",
    "no-var": "error",
    "vue/multi-word-component-names": "off",
    "vue/no-unused-vars": "error"
  }
}
```

### Prettier 配置

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### Git Hooks (Husky)

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,ts,vue}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{css,scss,less}": [
      "prettier --write",
      "git add"
    ]
  }
}
```

## 🧪 自动化测试

### Jest 配置

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/*.(test|spec).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!src/main.js',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
}
```

### 单元测试示例

```javascript
// tests/unit/Counter.spec.js
import { mount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('Counter.vue', () => {
  test('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = mount(Counter, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })

  test('increments count when button is clicked', async () => {
    const wrapper = mount(Counter)
    const button = wrapper.find('button')
    
    expect(wrapper.vm.count).toBe(0)
    
    await button.trigger('click')
    
    expect(wrapper.vm.count).toBe(1)
  })
})
```

### E2E 测试 (Cypress)

```javascript
// cypress/integration/app.spec.js
describe('Application', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the main page', () => {
    cy.get('h1').should('contain', 'Welcome')
  })

  it('should navigate to about page', () => {
    cy.get('a[href="/about"]').click()
    cy.url().should('include', '/about')
    cy.get('h1').should('contain', 'About')
  })
})
```

## 🚀 CI/CD 流程

### GitHub Actions 配置

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run tests
        run: npm run test:unit
      
      - name: Build project
        run: npm run build
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install and build
        run: |
          npm ci
          npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📦 包管理

### package.json 最佳实践

```json
{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "description": "An awesome frontend project",
  "main": "src/main.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src --ext .js,.ts,.vue",
    "lint:fix": "eslint src --ext .js,.ts,.vue --fix",
    "format": "prettier --write src/**/*.{js,ts,vue,css,scss}",
    "type-check": "vue-tsc --noEmit"
  },
  "dependencies": {
    "vue": "^3.3.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.0",
    "vite": "^4.3.0",
    "typescript": "^5.0.0",
    "vue-tsc": "^1.6.0",
    "eslint": "^8.40.0",
    "@vue/eslint-config-typescript": "^11.0.0",
    "prettier": "^2.8.0",
    "jest": "^29.5.0",
    "@vue/test-utils": "^2.3.0"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  }
}
```

## 🔧 开发工具

### VS Code 配置

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "vue": "html"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "vetur.validation.template": false,
  "vetur.validation.script": false,
  "vetur.validation.style": false
}
```

### 推荐扩展

```json
// .vscode/extensions.json
{
  "recommendations": [
    "vue.volar",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 🔗 相关链接

- [Vite 详解](/engineering/vite)
- [Webpack 深入](/engineering/webpack)
- [CI/CD 实践](/engineering/ci-cd)
- [部署策略](/engineering/deploy)
- [前端工程化最佳实践](https://github.com/fi3ework/blog/issues/12)

---

> 💡 **学习建议**: 工程化是现代前端开发的必备技能，建议从构建工具开始，逐步掌握代码规范、测试和部署流程。通过实际项目实践，建立完整的工程化思维。