import Mock from 'mockjs'

Mock.mock('/api/users', {
  name: '@cname',
  intro: '@word(20)'
})
