export const config = {
}

// 后台用户类别选项
export const userTypeOptions = [
  { label: '班长', value: 1 },
  { label: '班主任', value: 2 },
  { label: '超级管理员', value: 3 },
]

export const userTypeMap = {
  1: { name: '班长', tag: 'success' },
  2: { name: '班主任', tag: 'info' },
  3: { name: '超级管理员', tag: 'warning' },
}

// 年级选项
export const gradeOptions = [
  { label: '2021级', value: '1' },
  { label: '2022级', value: '2' },
  { label: '2023级', value: '3' },
  { label: '2024级', value: '4' },
  { label: '2025级', value: '5' },
  { label: '2026级', value: '6' },
  { label: '2027级', value: '7' },
  { label: '2028级', value: '8' },
  { label: '2029级', value: '9' },
  { label: '2030级', value: '10' },
  // { label: '2031级', value: 11 },
  // { label: '2032级', value: 12 },
  // { label: '2033级', value: 13 },
  // { label: '2034级', value: 14 },
  // { label: '2035级', value: 15 },
  // { label: '2036级', value: 16 },
  // { label: '2037级', value: 17 },
  // { label: '2038级', value: 18 },
  // { label: '2039级', value: 19 },
  // { label: '2040级', value: 20 },
]

export const gradeMap = {
  '1': { name: '2021级', tag: 'success' },
  '2': { name: '2022级', tag: 'info' },
  '3': { name: '2023级', tag: 'warning' },
  '4': { name: '2024级', tag: 'error' },
  '5': { name: '2025级', tag: 'default' },
  '6': { name: '2026级', tag: 'success' },
  '7': { name: '2027级', tag: 'info' },
  '8': { name: '2028级', tag: 'warning' },
  '9': { name: '2029级', tag: 'error' },
  '10': { name: '2030级', tag: 'default' },
}

// 班级选项
export const user_classOptions = [
  // { label: '无', value: '11' },
  { label: '1班', value: '1' },
  { label: '2班', value: '2' },
  { label: '3班', value: '3' },
  { label: '4班', value: '4' },
  // { label: '5班', value: 5 },
  // { label: '6班', value: 6 },
  // { label: '7班', value: 7 },
  // { label: '8班', value: 8 },
  // { label: '9班', value: 9 },
  // { label: '10班', value: 10 },
]

export const user_classMap = {
  // '11': { name: '无', tag: 'info' },
  '1': { name: '1班', tag: 'warning' },
  '2': { name: '2班', tag: 'error' },
  '3': { name: '3班', tag: 'default' },
  '4': { name: '4班', tag: 'success' },
  // 5: { name: '5班', tag: 'info' },
  // 6: { name: '6班', tag: 'warning' },
  // 7: { name: '7班', tag: 'error' },
  // 8: { name: '8班', tag: 'default' },
  // 9: { name: '9班', tag: 'success' },
  // 10: { name: '10班', tag: 'info' },
}

// 学生类别选项
export const studentTypeOptions = [
  { label: '境内生', value: 1 },
  { label: '港澳台生', value: 2 },
  { label: '国际生', value: 3 },
]

export const studentTypeMap = {
  1: { name: '境内生', tag: 'success' },
  2: { name: '港澳台生', tag: 'info' },
  3: { name: '国际生', tag: 'warning' },
}

// 培养层次选项
export const levelTypeOptions = [
  { label: '本科生', value: 1 },
  { label: '硕士', value: 2 },
  { label: '博士', value: 3 },
]

export const levelTypeMap = {
  1: { name: '本科生', tag: 'success' },
  2: { name: '硕士', tag: 'info' },
  3: { name: '博士', tag: 'warning' },
}


// 政治面貌选项
export const outlookTypeOptions = [
  { label: '党员', value: 1 },
  { label: '预备党员', value: 2 },
  { label: '共青团员', value: 3 },
  { label: '群众', value: 4 },
  { label: '其它', value: 5 },
]

export const outlookTypeMap = {
  1: { name: '党员', tag: 'success' },
  2: { name: '预备党员', tag: 'info' },
  3: { name: '共青团员', tag: 'warning' },
  4: { name: '群众', tag: 'error' },
  5: { name: '其它', tag: 'default' },
}
