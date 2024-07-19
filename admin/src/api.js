import { request } from '@/utils'

export default {
  // refreshToken: () => request.post('/auth/refreshToken', null, { noNeedTip: true }),
  // getHomeInfo: () => request.get('/home'), // 获取首页信息

  login: (params = {}) => request.get('/auth-service/auth/login/backend_user', {params}, { noNeedToken: true }),
  // TODO:
  // logout: () => request.get('/logout'), // 放弃使用

  // 前台学生相关接口
  status_ONE:params => {
    const queryString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
    return request.put(`/score-service//score/admin/status_one?${queryString}`);
  },
  status_TWO:params => {
    const queryString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
    return request.put(`/score-service//score/admin/status_two?${queryString}`);
  },
  getStudents: (params = {}) => {
    // 如果 sid 存在并且为空，则删除它
    if (params.SID === '') {
      delete params.SID;
    }
    if (params.name === '') {
      delete params.name;
    }
    if (params.grade === '') {
      delete params.grade;
    }
    if (params.level === '') {
      delete params.level;
    }
    if (params.outlook === '') {
      delete params.outlook;
    }
    if (params.overall === '') {
      delete params.overall;
    }
    if (params.personal === '') {
      delete params.personal;
    }
    if (params.type === '') {
      delete params.type;
    }
    if (params.user_class === '') {
      delete params.user_class;
    }
    // 发送请求
    return request.get('/user-service/user/all-users', { params });
  },
  // updateStudent: data => request.post('/student', data),
  // TODO:
  getStudent: (params = {}) => request.get('/user-service/user/one-user', { params }),
  deleteStudent: (params = []) => request.delete('/user-service/user/stu_userinfo', { params }), // 删除1个或多个用户

  select: (params = []) => request.get('/score-service/score/common', { params }), // 获取某个学生的审核事项
  update_one: (params = []) => request.put('/score-service/score/common/status_one', { params }), // 进行个人信息审核，更新状态1
  update_two: (params = []) => request.put('/score-service/score/common/status_two', { params }), // 进行综测信息审核，更新状态2
  // deleteStudent: (params = []) => request.delete('/user-service/user/stu_userinfo', { params }), // 删除1个或多个用户

  deleteBackendUser: (params = []) => request.delete('/user-service/backend_user/user', { params }), // 删除1个或多个用户

  // 后台用户相关接口
  getUserInfo: (params = {}) => request.get('/user-service/backend_user/user', { params }),  // 根据sid返回该用户信息供全局user变量保存
  getUsers: (params = {}) => {
    if (params.name === '') {
      delete params.name;
    }
    if (params.SID === '') {
      delete params.SID;
    }
    if (params.user_class === '') {
      delete params.user_class;
    }
    if (params.grade === '') {
      delete params.grade;
    }
    if (params.role === '') {
      delete params.role;
    }
    // 发送请求
    return request.get('/user-service/backend_user/all-users', { params })
  },
  updateCurrentPassword: params => {
    const queryString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
    return request.put(`/auth-service/auth/backend_password?${queryString}`);
  },// 修改当前用户密码
  // TODO:
  // updateCurrent: data => request.put('/user/current', data), // 更新当前用户信息
  // updateCurrentPassword: params => request.put('/auth-service/auth/backend_password', params), // 修改当前用户密码,根据邮箱发送验证码

  UpdateUser: params => {
    // 修改参数中的 `sid` 字段为 `SID`
    // const updatedParams = { ...params };
    const updatedParams = { ...params, SID: params.sid };
    delete updatedParams.sid; // 删除原来的 `sid` 字段

    // 修改参数中的 `pid` 字段为 `PID`
    updatedParams.PID = params.pid;
    delete updatedParams.pid; // 删除原来的 `pid` 字段

    if(updatedParams.password  === '' || updatedParams.password === null)
       delete updatedParams.password;


    // 构建查询字符串
    const queryString = Object.keys(updatedParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(updatedParams[key])}`)
        .join('&');

    // 发起 PUT 请求
    return request.put(`/user-service/backend_user/user?${queryString}`);
  },

  saveUser: data => request.post('/user-service/backend_user/user', data), // 根据sid增加 || 修改用户信息
  saveStudent: data => request.post('/user-service/user/stu_userinfo', data), // 根据sid增加 || 修改学生信息
  deleteUser: (params = []) => request.delete('/user-service/user/stu_userinfo', { params }), // 删除1个或多个用户
  getBackendUserNum: () => request.get('/user-service/backend_user/user-num'), // 获取用户数量
  getUserNum: () => request.get('/user-service/user/user-num'), // 获取用户数量
}
