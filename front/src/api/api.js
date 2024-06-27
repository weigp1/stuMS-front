/* 项目api的管理 */

import request from './request';

/* 登录相关 */
function login(params)
{
  return request({
    url: '/auth-service/auth/login/user',
    method: 'GET',
    withCredentials: true,
    mock: false,
    params: params,
  });
}

// (params: { 'Email': input_email.value}
function sendVerificationCode(params)
{
  return request({
    url: '/auth-service/mail/send',
    method: 'GET',
    mock: false,
    params: params,
  });
}

function confirmVerificationCode(params)
{
  return request({
    url: '/auth-service/mail/valid',
    method: 'GET',
    mock: false,
    params: params,
  });
}

/* 用户相关 */
function getUser(params)
{
  return request({
  url: '/user-service/user/one-user',
  method: 'GET',
  mock: false,
  params: params,
  });
}

function select(params)
{
  return request({
    url: '/score-service/score/common',
    method: 'GET',
    mock: false,
    params: params,
  });
}

function deleteByPID(params)
{
  return request({
    url: '/score-service/score/common',
    method: 'DELETE',
    mock: false,
    params: params,
  });
}

function submitMorality(params)
{
  return request({
    url: '/score-service/score/morality',
    method: 'POST',
    mock: false,
    data: params,
  });
}

function submitPaper(params)
{
  return request({
    url: '/score-service/score/paper',
    method: 'POST',
    mock: false,
    data: params,
  });
}

function submitCompetition(params)
{
  return request({
    url: '/score-service/score/competition',
    method: 'POST',
    mock: false,
    data: params,
  });
}

function submitPatent(params)
{
  return request({
    url: '/score-service/score/patent',
    method: 'POST',
    mock: false,
    data: params,
  });
}

function submitPublication(params)
{
  return request({
    url: '/score-service/score/publication',
    method: 'POST',
    mock: false,
    data: params,
  });
}

function submitSocialWork(params)
{
  return request({
    url: '/score-service/score/socialwork',
    method: 'POST',
    mock: false,
    data: params,
  });
}

function submitVolunteer(params)
{
  return request({
    url: '/score-service/score/volunteer',
    method: 'POST',
    mock: false,
    data: params,
  });
}

function submitExchange(params)
{
  return request({
    url: '/score-service/score/exchange',
    method: 'POST',
    mock: false,
    data: params,
  });
}

function submitCopyright(params)
{
  return request({
    url: '/score-service/score/copyright',
    method: 'POST',
    mock: false,
    data: params,
  });
}


// /* 综测相关 */
//
// /* 无参，返回politics_standard表格的所有数据 */
// function selectPolitics()
// {
//   return request({
//   url: '',
//   method: 'GET',
//   mock: false,
//   });
// }
//
// /* 无参，返回practice_standard表格的所有数据 */
// function selectPractice()
// {
//   return request({
//   url: '',
//   method: 'GET',
//   mock: false,
//   });
// }
//
// /* 无参，返回socialWork_standard表格的所有数据 */
// function selectSocialWork()
// {
//   return request({
//   url: '',
//   method: 'GET',
//   mock: false,
//   });
// }
//
// /* 无参，返回study_standard表格的所有数据 */
// function selectStudy()
// {
//   return request({
//   url: '',
//   method: 'GET',
//   mock: false,
//   });
// }
//
// /**
//  * 提交综测填报信息politics表单
//  * 参数：params（politics表除主键外的所有字段）
//  * 返回：
// */
// function submitPolitics(params)
// {
//   return request({
//     url: '',
//     method: 'POST',
//     mock: false,
//     params: params
//   })
// }
//
// /**
//  * 提交综测填报信息practice表单
//  * 参数：params（practice表除主键外的所有字段）
//  * 返回：
// */
// function submitPractice(params)
// {
//   return request({
//     url: '',
//     method: 'POST',
//     mock: false,
//     params: params
//   })
// }
//
// /**
//  * 提交综测填报信息socialWork表单
//  * 参数：params（socialWork表除主键外的所有字段）
//  * 返回：
// */
// function submitSocialWork(params)
// {
//   return request({
//     url: '',
//     method: 'POST',
//     mock: false,
//     params: params
//   })
// }
//
// /**
//  * 提交综测填报信息study表单
//  * 参数：params（study表除主键外的所有字段）
//  * 返回：
// */
// function submitStudy(params)
// {
//   return request({
//     url: '',
//     method: 'POST',
//     mock: false,
//     params: params
//   })
// }
//
// /**
//  * 根据学生id返回politics综测填报信息
//  * 参数：params（SID）
//  * 返回：相关填报信息的列表
// */
// function selectPoliticsRecords(params)
// {
//   return request({
//     url: '',
//     method: 'POST',
//     mock: false,
//     params: params
//   })
// }
//
// /**
//  * 根据学生id返回practice综测填报信息
//  * 参数：params（SID）
//  * 返回：相关填报信息的列表
// */
// function selectPracticeRecords(params)
// {
//   return request({
//     url: '',
//     method: 'POST',
//     mock: false,
//     params: params
//   })
// }
//
// /**
//  * 根据学生id返回socialWork综测填报信息
//  * 参数：params（SID）
//  * 返回：相关填报信息的列表
// */
// function selectSocialWorkRecords(params)
// {
//   return request({
//     url: '',
//     method: 'POST',
//     mock: false,
//     params: params
//   })
// }
//
// /**
//  * 根据学生id返回study综测填报信息
//  * 参数：params（SID）
//  * 返回：相关填报信息的列表
// */
// function selectStudyRecords(params)
// {
//   return request({
//     url: '',
//     method: 'POST',
//     mock: false,
//     params: params
//   })
// }

/* 分数相关 */

export {
  login, sendVerificationCode, confirmVerificationCode, getUser, select, deleteByPID, submitMorality, submitPaper, submitCompetition,
  submitPatent, submitPublication, submitSocialWork, submitVolunteer, submitExchange, submitCopyright
};
