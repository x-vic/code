module.exports = {
  type: 'HomePageOne',
  // logo: '/icon_vuepress_reco.png',
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  // 自动形成侧边导航
  sidebar: 'auto',
  // 侧边栏深度
  sidebarDepth: 2,
  displayAllHeaders: true, // 自动提取锚点链接
  // 最后更新时间
  lastUpdated: '上次更新', // string | boolean
  // 作者
  author: 'Vic',
  startYear: '2020',
  comment: {
    type: 'valine',
    appId: 'RJWm2XhTmAA3kXA5k8q3kGKD-gzGzoHsz',
    appKey: 'MCNl516YKivtqhEAmr8YaMtY'
  },
  // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
  // repo: 'https://www.github.com/yesixuan/vue-code',
  docsDir: 'docs',
  docsBranch: 'master',
  // editLinks: true
  markdown: {
    // 启用流程图功能
    flowchart: true,
  },
}
