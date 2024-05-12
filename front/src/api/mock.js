import Mock from 'mockjs';


Mock.mock(/\/mock\/auth\/login/, 'get', (options) => {  // 使用 GET 请求
    // 从参数中获取查询参数
    const { username, password } = options.urlParams;
    // 生成模拟的 token
    const token = Mock.mock('@guid');
    // 返回模拟响应对象，包含状态码、模拟数据对象和消息
    return { code: 200, data: { token } };
});


/**
@id: 生成一个随机的 ID。
@guid: 生成一个随机的 GUID。
@cname: 生成一个随机的中文名字。
@name: 生成一个随机的英文名字。
@title: 生成一个随机的标题。
@sentence: 生成一个随机的句子。
@paragraph: 生成一个随机的段落。
@date: 生成一个随机的日期。
@time: 生成一个随机的时间。
@url: 生成一个随机的 URL。
@email: 生成一个随机的邮箱地址
 **/