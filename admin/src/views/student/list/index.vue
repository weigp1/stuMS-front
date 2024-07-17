// TODO: 批量导入学生

<script setup>
import { h, onMounted, ref } from 'vue'
import {  NUpload, NButton,NPopconfirm , NCheckbox, NCheckboxGroup, NForm, NFormItem, NImage, NInput, NSelect, NSpace, NSwitch, NTag } from 'naive-ui'
import * as XLSX from 'xlsx'

import CommonPage from '@/components/common/CommonPage.vue'
import QueryItem from '@/components/crud/QueryItem.vue'
import CrudModal from '@/components/crud/CrudModal.vue'
import CrudTable from '@/components/crud/CrudTable.vue'

import { user_classMap, user_classOptions, gradeMap, gradeOptions, levelTypeMap, levelTypeOptions, studentTypeMap, studentTypeOptions, outlookTypeMap, outlookTypeOptions } from '@/assets/config'
import { convertImgUrl, formatDate } from '@/utils'
import { useCRUD } from '@/composables'
import api from '@/api'
import { useUserStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

defineOptions({ name: '学生列表' })
const userStore = useUserStore()
const router = useRouter()

const $table = ref(null)
const queryItems = ref({
  SID: '',
  name: '',
  type: '',
  level: '',
  outlook: '',
  grade: userStore.grade,
  user_class: userStore.user_class,
  overall: '',
  personal: '',
})

const {
  modalVisible,
  modalLoading,
  handleSave,
  handleAdd,
  handleDelete,
  modalForm,
  modalFormRef,
} = useCRUD({
  name: '学生',
  doCreate: api.saveStudent,
  doDelete: api.deleteUser,
  doUpdate: api.saveStudent,
  refresh: () => $table.value?.handleSearch(),
})

const customRequest = async ({ file, onProgress, onFinish, onError }) => {
  try {
    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        onProgress({ percent });
      }
    };
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // 定义列名映射
      const columnMapping = {
        "gender": (value) => ({ '男': 1, '女': 2 }[value] || '未知'),
        "type": (value) => ({ '境内生':1, '港澳台生':2, '国际生':3}[value] || '未知'),
        "grade": (value) => ({ '2021级': '1', '2022级': '2', '2023级': '3', '2024级': '4', '2025级': '5', '2026级': '6', '2027级': '7', '2028级': '8', '2029级': '9', '2030级': '10' }[value] || '未知'),
        "user_class": (value) => ({ '1班': '1', '2班': '2', '3班': '3', '4班': '4' }[value] || '未知'),
        "level": (value) => ({ '本科生': 1, '硕士': 2, '博士': 3 }[value] || '未知'),
        "outlook": (value) => ({ '党员': 1, '预备党员': 2, '共青团员': 3, '群众': 4, '其它': 5 }[value] || '未知'),
      };

      const json = XLSX.utils.sheet_to_json(worksheet, { raw: false }).map(row =>
        Object.keys(row).reduce((acc, key) => {
          acc[key] = columnMapping[key] ? columnMapping[key](row[key]) : row[key];
          return acc;
        }, {})
      );

      console.log(json);
      // Here you can replace this part with the actual API call
      // to your backend service that handles the file upload.
      // console.log(json);

      try {
        const response = await api.saveStudent(json); // Assuming `api.importStudents` is your API call
        if (response.code === 200) {
          window.$message.success('导入成功！');
          onFinish();
          $table.value?.handleSearch(); // Reload table data
        } else {
          window.$message.error('导入失败：' + response.msg);
          onError();
        }
      } catch (error) {
        window.$message.error('导入异常');
        onError();
      }
    };
    reader.onerror = () => {
      $message.error('文件读取出错');
      onError();
    };
    reader.readAsBinaryString(file.file);
  } catch (error) {
    $message.error('操作失败');
    onError();
  }
};


// 学生上传前检查类型
// function beforeUpload(data) {
//   if (!data.file.name.endsWith('.xlsx')) {
//     $message.error('只能上传 .xlsx 格式的文件，请重新上传')
//     return false
//   }
//   return true
// }
// 检查上传文件类型
// function beforeUpload({ file }) {
//   const isXlsx = file.name.endsWith('.xlsx')
//   if (!isXlsx) {
//     window.$message.error('只能上传 .xlsx 格式的文件，请重新上传')
//   }
//   return isXlsx
// }

// // 处理文件上传
// async function handleFileUpload({ file }) {
//   const reader = new FileReader()
//   reader.onload = async (e) => {
//     const data = e.target.result
//     const workbook = XLSX.read(data, { type: 'binary' })
//     const firstSheetName = workbook.SheetNames[0]
//     const worksheet = workbook.Sheets[firstSheetName]
//     const json = XLSX.utils.sheet_to_json(worksheet)
//     // 发送数据到后端
//     console.log(json)
//     // try {
//     //   const response = await api.importStudents(json)
//     //   if (response.code === 0) {
//     //     window.$message.success('导入成功！')
//     //   } else {
//     //     window.$message.error('导入失败：' + response.msg)
//     //   }
//     // } catch (error) {
//     //   window.$message.error('导入异常')
//     // }
//   }
//   reader.readAsBinaryString(file)
// }

// // 学生上传后的操作
// function afterUpload({ event }) {
//   const respStr = (event?.target).response
//   const res = JSON.parse(respStr)
//   if (res.code === 0) {
//     $table.value?.handleSearch()
//     $message.success('导入成功！')
//   }
//   else {
//     $message.error('导入失败！')
//   }
// }

onMounted(() => {
  // api.getRoleOption().then(resp => roleOptions.value = resp.data)
  if (userStore.role === 2  || userStore.role === 1) {
    // 设置queryItems的值
    queryItems.grade = userStore.grade
    queryItems.user_class = userStore.user_class
  }
  $table.value?.handleSearch()
})


// 定义mockGetData函数
const mockGetData = async (params) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 返回模拟的数据结构
  return {
    data: {
      page_data: [
      {sid: '2021001', name: '张三', type: 1, nation: '汉族', identity: '123456789012345678', birthday: '2000-01-01', level: 1, grade: 2021, user_class: 2, outlook: 1, dorm: '8号楼101室', user_native: '江苏省南京市', tel: '13800000000', wechat: 'zhangsan2021', email: 'zhangsan@example.com', address: '江苏省南京市江宁区', emergency_name: '李四', emergency_tel: '13900000000'},
      {sid: '2021002', name: '李四', type: 2, nation: '壮族', identity: '223456789012345678', birthday: '2001-02-02', level: 2, grade: 2021, user_class: 3, outlook: 1, dorm: '9号楼102室', user_native: '浙江省杭州市', tel: '13811111111', wechat: 'lisi2021', email: 'lisi@example.com', address: '浙江省杭州市西湖区', emergency_name: '王五', emergency_tel: '13911111111'},
      {sid: '2021003', name: '王五', type: 1, nation: '回族', identity: '323456789012345678', birthday: '2002-03-03', level: 1, grade: 2021, user_class: 4, outlook: 1, dorm: '10号楼103室', user_native: '四川省成都市', tel: '13822222222', wechat: 'wangwu2021', email: 'wangwu@example.com', address: '四川省成都市武侯区', emergency_name: '赵六', emergency_tel: '13922222222'},
      {sid: '2021009', name: '赵九', type: 1, nation: '满族', identity: '923456789012345678', birthday: '2000-09-09', level: 1, grade: 2021, user_class: 2, outlook: 1, dorm: '8号楼109室', user_native: '湖北省武汉市', tel: '13899999999', wechat: 'zhaojiu2021', email: 'zhaojiu@example.com', address: '湖北省武汉市洪山区', emergency_name: '钱十', emergency_tel: '13999999999'},
      {sid: '2021010', name: '钱十', type: 2, nation: '蒙古族', identity: '023456789012345678', birthday: '2001-10-10', level: 2, grade: 2021, user_class: 3, outlook: 1, dorm: '9号楼110室', user_native: '广东省广州市', tel: '13800000000', wechat: 'qianshi2021', email: 'qianshi@example.com', address: '广东省广州市越秀区', emergency_name: '孙十一', emergency_tel: '13900000001'}
        // 更多模拟数据...
      ],
      total: 5,
    }
  };
};

const columns = [
  { type: 'selection', width: 15, fixed: 'left' },
  {
    title: '序号',
    key: 'pid',
    width: 40,
    align: 'center',
    ellipsis: { tooltip: true },
    render(row) {
      return h('span', row.pid)
    },
  },
  {
    title: '学号',
    key: 'sid',
    width: 80,
    align: 'center',
    ellipsis: { tooltip: true },
    render(row) {
      // return h('span', row.info?.sid)
      return h('span', row.sid)
    },
  },
  {
    title: '姓名',
    key: 'name',
    width: 60,
    align: 'center',
    render(row) {
        // return h('span', row.info?.name)
        return h('span', row.name)
    },
  },
  {
    title: '学生类别',
    key: 'type',
    width: 60,
    align: 'center',
    render(row) {
      return h(
        NTag,
        { type: studentTypeMap[row.type]?.tag },
        { default: () => studentTypeMap[row.type]?.name || '未知' },
      )
    },
  },
  {
    title: '出生日期',
    key: 'birthday',
    width: 80,
    align: 'center',
    // render(row) {
    //   // return h('span', row.info?.birthday)
    //   return h('span', row.birthday)
    // },
    render(row) {
      const date = new Date(row.birthday);
      const year = date.getFullYear();
      // getMonth() 返回的月份是从0开始的，所以需要+1
      const month = date.getMonth() + 1;
      // 使用模板字符串来格式化输出，确保月份始终是两位数
      return h('span', `${year}-${month.toString().padStart(2, '0')}`);
    },
  },
  // TODO: 修改为选择式
  {
    title: '培养层次',
    key: 'level',
    width: 60,
    align: 'center',
    render(row) {
      // return h('span', row.info?.level)
      return h(
        NTag,
        { type: levelTypeMap[row.level]?.tag },
        { default: () => levelTypeMap[row.level]?.name || '未知' },
      )
    },
  },
  // TODO: 修改为选择式
  {
    title: '年级',
    key: 'grade',
    width: 80,
    align: 'center',
    render(row) {
      // return h('span', row.info?.grade)
      return h(
        NTag,
        { type: gradeMap[row.grade]?.tag },
        { default: () => gradeMap[row.grade]?.name || '未知' },
      )
    },
  },
  {
    title: '班级',
    key: 'user_class',
    width: 40,
    align: 'center',
    render(row) {

      return h(
        NTag,
        { type: user_classMap[row.user_class]?.tag },
        { default: () => user_classMap[row.user_class]?.name || '未知' },
      )
      // return h('span', row.info?.user_class)
    },
  },
  {
    title: '政治面貌',
    key: 'outlook',
    width: 60,
    align: 'center',
    render(row) {
      return h(
        NTag,
        { type: outlookTypeMap[row.outlook]?.tag },
        { default: () => outlookTypeMap[row.outlook]?.name || '未知' },
      )
    },
  },
  {
    title: '宿舍',
    key: 'dorm',
    width: 80,
    align: 'center',
    render(row) {
      // return h('span', row.info?.dorm)
      return h('span', row.dorm)
    },
  },
  {
    title: '电话',
    key: 'tel',
    width: 80,
    align: 'center',
    render(row) {
      // return h('span', row.info?.tel)
      return h('span', row.tel)
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 120,
    align: 'center',
    fixed: 'right',
    render(row) {
      const isSuper = userStore.role === 3
      const noMonitor = userStore.role !== 1
      return [
      noMonitor &&
      h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;', 
            secondary: true,
            onClick: () => router.push({ name: 'StudentInfo', params: { sid: row.sid } }), // 携带参数前往 学生详情信息 页面
          },
          { default: () => '查看', icon: () => h('i', { class: 'i-majesticons:eye-line' }) },
        ),
        // 根据条件判断是否渲染删除按钮
        isSuper &&
        h(
          NPopconfirm,
          { onPositiveClick: () => handleDelete([row.sid], false),
            // 下面要保留吗,不
            // onNegativeClick: () => {},
          },
          {
            trigger: () =>
              h(
                NButton,
                { size: 'small', type: 'error', style: 'margin-left: 15px;' },
                { default: () => '删除', icon: () => h('i', { class: 'i-material-symbols:delete-outline' }) },
              ),
            default: () => h('div', {}, '确定删除该学生账号吗?'),
          },
        ),
      ].filter(Boolean) // 过滤掉 falsy 值，确保只渲染允许的元素
    },
  },
]
// TODO: status若为0，表面学生未确认信息，则该行为红色
</script>

<template>
  <CommonPage title="学生列表">
    <!-- 班主任和班长不能新增、导入、删除学生 -->
    <template #action v-if= "!(userStore.role === 1 || userStore.role === 2)" >
      <NButton type="primary" @click="handleAdd">
        <template #icon>
          <i class="i-material-symbols:add" />
        </template>
        新建学生
      </NButton>
      <NButton
        type="error"
        :disabled="!$table?.selections.length"
        @click="handleDelete($table?.selections)"
      >
        <template #icon>
          <span class="i-material-symbols:playlist-remove" />
        </template>
        批量删除
      </NButton>

      <div class="inline-block">
        <NUpload
          action="#"
          :custom-request="customRequest"
          :multiple="true"
          accept=".xls,.xlsx"
        >
          <NButton type="success">
            <template #icon>
              <i class="i-mdi:import" />
            </template>
            批量导入
          </NButton>
        </NUpload>

      </div>
    </template>

    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :columns="columns"
      :get-data="api.getStudents"
    >
    <!--get-data="mockGetData"  -->
      <template #queryBar>
        <QueryItem label="学号" :label-width="40" :content-width="160">
          <NInput
            v-model:value="queryItems.SID"
            clearable
            type="text"
            placeholder="请输入学号"
            @keydown.enter="$table?.handleSearch()"
          />
        </QueryItem>
        <QueryItem label="姓名" :label-width="60" :content-width="160">
          <NInput
            v-model:value="queryItems.name"
            clearable
            type="text"
            placeholder="请输入姓名"
            @keydown.enter="$table?.handleSearch()"
          />
        </QueryItem>
        <QueryItem v-if="!(userStore.role === 2 || userStore.role === 1)" label="年级" :label-width="60" :content-width="160" >
          <NSelect
            v-model:value="queryItems.grade"
            clearable
            filterable
            placeholder="请选择年级"
            :options="gradeOptions"
            @update:value="$table?.handleSearch()"
          />
        </QueryItem>
        <QueryItem v-if="!(userStore.role === 2 || userStore.role === 1)" label="班级" :label-width="60" :content-width="160">
          <NSelect
            v-model:value="queryItems.user_class"
            clearable
            filterable
            placeholder="请选择班级"
            :options="user_classOptions"
            @update:value="$table?.handleSearch()"
          />
        </QueryItem>
        <QueryItem label="学生类别" :label-width="70" :content-width="160">
          <NSelect
            v-model:value="queryItems.type"
            clearable
            filterable
            placeholder="请选择学生类别"
            :options="studentTypeOptions"
            @update:value="$table?.handleSearch()"
          />
        </QueryItem>
        <QueryItem label="培养层次" :label-width="70" :content-width="160">
          <NSelect
            v-model:value="queryItems.level"
            clearable
            filterable
            placeholder="请选择培养层次"
            :options="levelTypeOptions"
            @update:value="$table?.handleSearch()"
          />
        </QueryItem>
        <QueryItem label="政治面貌" :label-width="70" :content-width="160">
          <NSelect
            v-model:value="queryItems.outlook"
            clearable
            filterable
            placeholder="请选择政治面貌"
            :options="outlookTypeOptions"
            @update:value="$table?.handleSearch()"
          />
        </QueryItem>
      </template>
    </CrudTable>

    <CrudModal
  v-model:visible="modalVisible"
  :title="modalTitle"
  :loading="modalLoading"
  @save="handleSave"
>
  <NForm
    ref="modalFormRef"
    label-placement="left"
    label-align="left"
    :label-width="80"
    :model="modalForm"
  >
    <NFormItem label="学/工号" path="SID">
      <NInput
        v-model:value="modalForm.sid"
        clearable
        placeholder="请输入学/工号"
      />
    </NFormItem>
    <NFormItem label="姓名" path="name">
      <NInput
        v-model:value="modalForm.name"
        clearable
        placeholder="请输入姓名"
      />
    </NFormItem>
    <NFormItem label="类型" path="type">
      <NSelect
        v-model:value="modalForm.type"
        clearable
        placeholder="请选择类型"
        :options="typeOptions"
      />
    </NFormItem>
    <NFormItem label="性别" path="gender">
      <NSelect
        v-model:value="modalForm.gender"
        clearable
        placeholder="请选择性别"
        :options="genderOptions"
      />
    </NFormItem>
    <NFormItem label="民族" path="nation">
      <NSelect
        v-model:value="modalForm.nation"
        clearable
        placeholder="请选择民族"
        :options="nationOptions"
      />
    </NFormItem>
    <NFormItem label="身份证号" path="identity">
      <NInput
        v-model:value="modalForm.identity"
        clearable
        placeholder="请输入身份证号"
      />
    </NFormItem>
    <NFormItem label="出生日期" path="birthday">
      <NInput
        v-model:value="modalForm.birthday"
        clearable
        placeholder="请输入出生日期"
      />
    </NFormItem>
    <NFormItem label="年级" path="grade">
      <NSelect
        v-model:value="modalForm.grade"
        clearable
        placeholder="请选择年级"
        :options="gradeOptions"
      />
    </NFormItem>
    <NFormItem label="班级" path="user_class">
      <NSelect
        v-model:value="modalForm.user_class"
        clearable
        placeholder="请选择班级"
        :options="user_classOptions"
      />
    </NFormItem>
    <NFormItem label="层次" path="level">
      <NInput
        v-model:value="modalForm.level"
        clearable
        placeholder="请输入层次"
      />
    </NFormItem>
    <NFormItem label="政治面貌" path="outlook">
      <NSelect
        v-model:value="modalForm.outlook"
        clearable
        placeholder="请选择政治面貌"
        :options="outlookOptions"
      />
    </NFormItem>
    <NFormItem label="宿舍号" path="dorm">
      <NInput
        v-model:value="modalForm.dorm"
        clearable
        placeholder="请输入宿舍号"
      />
    </NFormItem>
    <NFormItem label="籍贯" path="user_native">
      <NInput
        v-model:value="modalForm.user_native"
        clearable
        placeholder="请输入籍贯"
      />
    </NFormItem>
    <NFormItem label="电话" path="tel">
      <NInput
        v-model:value="modalForm.tel"
        clearable
        placeholder="请输入电话"
      />
    </NFormItem>
    <NFormItem label="家庭住址" path="address">
      <NInput
        v-model:value="modalForm.address"
        clearable
        placeholder="请输入家庭住址"
      />
    </NFormItem>
    <NFormItem label="紧急联系人" path="emergency_name">
      <NInput
        v-model:value="modalForm.emergency_name"
        clearable
        placeholder="请输入紧急联系人姓名"
      />
    </NFormItem>
    <NFormItem label="紧急联系电话" path="emergency_tel">
      <NInput
        v-model:value="modalForm.emergency_tel"
        clearable
        placeholder="请输入紧急联系电话"
      />
    </NFormItem>
    <NFormItem label="微信" path="wechart">
      <NInput
        v-model:value="modalForm.wechart"
        clearable
        placeholder="请输入微信号"
      />
    </NFormItem>
    <NFormItem label="邮箱" path="email">
      <NInput
        v-model:value="modalForm.email"
        clearable
        placeholder="请输入邮箱"
      />
    </NFormItem>
  </NForm>
</CrudModal>

  </CommonPage>
</template>
