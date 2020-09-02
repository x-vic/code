module.exports = {
  '/views/vue-next/': [
    {
      title: 'vue-next',
      collapsable: false,
      children: ['reactive', 'handler', 'effect', 'createApp&mount', 'componentDetail']
    },
  ],
  '/views/others/': [
    {
      title: 'others',
      collapsable: false,
      children: ['redux-observable']
    },
  ],
  '/views/owner-react/': [
    {
      title: 'react',
      collapsable: false,
      children: ['', 'fiber', 'render&commit', 'reconciliation', 'functionComponent', 'useState']
    },
  ],
  '/views/owner-vue-next/': [
    {
      title: 'vue-next',
      collapsable: false,
      children: ['', 'createApp&mount']
    },
  ],
  '/views/owner-koa/': [
    {
      title: 'koa',
      collapsable: false,
      children: ['',]
    }
  ],
  '/views/owner-redux/': [
    {
      title: 'redux',
      collapsable: false,
      children: ['', 'react-redux',]
    }
  ],
  '/views/JS/': [
    {
      title: '前端',
      collapsable: false,
      children: ['', 'upload', 'security', 'webpack',]
    },
  ],
  '/views/functional/': [
    {
      title: '函数式编程',
      collapsable: false,
      children: ['', 'inputs', 'compose', 'functor', 'monad', 'applicative', 'transform', 'rxjs',]
    },
  ],
};
