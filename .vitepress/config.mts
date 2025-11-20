import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Tech Notes',
  description: '前端技术学习笔记与总结',
  base: '/devlog-notes/',

  ignoreDeadLinks: true, // 忽略死链接

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'HTML', link: '/html/' },
      { text: 'CSS', link: '/css/' },
      { text: 'JavaScript', link: '/javascript/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'TypeScript', link: '/typescript/' },
      { text: '工程化', link: '/engineering/' },
      { text: '可视化', link: '/visualization/' },
      { text: '监控系统', link: '/monitor-system/' },
      { text: 'Git命令', link: '/git/' },
      { text: '面试总结', link: '/inbox/interview' },
      { text: '思考随笔', link: '/inbox/thoughts' },
    ],

    sidebar: {
      '/html/': [
        {
          text: 'HTML',
          items: [
            { text: '概述', link: '/html/' },
            { text: '基础语法', link: '/html/basic' },
            { text: '表单元素', link: '/html/forms' },
            { text: '语义化标签', link: '/html/semantic' },
            { text: '多媒体', link: '/html/media' },
          ],
        },
      ],

      '/css/': [
        {
          text: 'CSS',
          items: [
            { text: '概述', link: '/css/' },
            { text: '选择器', link: '/css/selectors' },
            { text: '盒模型', link: '/css/box-model' },
            { text: 'Flexbox', link: '/css/flexbox' },
            { text: 'Grid布局', link: '/css/grid' },
            { text: '响应式设计', link: '/css/responsive' },
          ],
        },
      ],

      '/javascript/': [
        {
          text: 'JavaScript',
          items: [
            { text: '概述', link: '/javascript/' },
            {
              text: '异步编程',
              items: [
                { text: 'Promise', link: '/javascript/async/promise' },
                { text: '事件循环', link: '/javascript/async/event-loop' },
                { text: 'Async/Await', link: '/javascript/async/async-await' },
              ],
            },
            {
              text: 'ES6+特性',
              items: [
                { text: 'ES6新特性', link: '/javascript/es/es6' },
                { text: 'ES Modules', link: '/javascript/es/es-modules' },
              ],
            },
          ],
        },
      ],

      '/vue/': [
        {
          text: 'Vue',
          items: [
            { text: '概述', link: '/vue/' },
            { text: '基础语法', link: '/vue/base' },
            { text: '高级特性', link: '/vue/advanced' },
            { text: 'Composition API', link: '/vue/composition-api' },
            { text: '性能优化', link: '/vue/performance' },
            { text: 'Pinia状态管理', link: '/vue/pinia' },
            { text: 'Vue Router路由', link: '/vue/router' },
          ],
        },
      ],

      '/typescript/': [
        {
          text: 'TypeScript',
          items: [
            { text: '概述', link: '/typescript/' },
            { text: '类型系统', link: '/typescript/types' },
            { text: '泛型', link: '/typescript/generics' },
            { text: '高级类型', link: '/typescript/advanced-types' },
            { text: '装饰器', link: '/typescript/decorators' },
          ],
        },
      ],

      '/engineering/': [
        {
          text: '工程化',
          items: [
            { text: '概述', link: '/engineering/' },
            { text: 'Vite', link: '/engineering/vite' },
            { text: 'Webpack', link: '/engineering/webpack' },
            { text: 'CI/CD', link: '/engineering/ci-cd' },
            { text: '部署', link: '/engineering/deploy' },
          ],
        },
      ],

      '/visualization/': [
        {
          text: '可视化',
          items: [
            { text: '概述', link: '/visualization/' },
            { text: 'ECharts', link: '/visualization/echarts' },
            { text: 'SVG', link: '/visualization/svg' },
            { text: 'Canvas', link: '/visualization/canvas' },
          ],
        },
      ],

      '/monitor-system/': [
        {
          text: '监控系统',
          items: [
            { text: '概述', link: '/monitor-system/' },
            { text: 'WebSocket', link: '/monitor-system/websocket' },
            { text: '地图转换', link: '/monitor-system/map-convert' },
          ],
        },
      ],

      '/git/': [
        {
          text: 'Git命令',
          items: [
            { text: '概述', link: '/git/' },
            { text: '基础操作', link: '/git/basic' },
            { text: '分支管理', link: '/git/branch' },
            { text: '远程操作', link: '/git/remote' },
            { text: '高级技巧', link: '/git/advanced' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],

    // 搜索配置
    search: {
      provider: 'local',
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/website20161126/devlog-notes/edit/main/:path',
      text: '在 GitHub 上编辑此页面',
    },

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    // 大纲标题
    outline: {
      label: '页面导航',
    },

    // 返回顶部
    returnToTopLabel: '回到顶部',
  },

  // Markdown 配置
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
  },

  // Vite 配置
  vite: {
    define: {
      __VUE_OPTIONS_API__: false,
    },
  },


});
