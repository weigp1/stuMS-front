import Mock from 'mockjs'
 
// mock的配置
Mock.setup({
  // 随机延时500-1000毫秒
  timeout: '500-1000'
})


// 拦截请求
Mock.mock(/mock\/test/, 'get', () => {
    const arr = []
    arr.push(Mock.mock({
      id: '@id',
      name: '@cname'
    }))
    return {code: 101,  data: arr, msg: '获取数据成功',}
})