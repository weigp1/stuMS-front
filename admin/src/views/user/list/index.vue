<script setup>
import { h, onMounted, ref, computed } from 'vue'
import { NButton, NPopconfirm, NCheckbox, NCheckboxGroup, NForm, NFormItem, NImage, NInput, NSelect, NSpace, NSwitch, NTag } from 'naive-ui'

import CommonPage from '@/components/common/CommonPage.vue'
import QueryItem from '@/components/crud/QueryItem.vue'
import CrudModal from '@/components/crud/CrudModal.vue'
import CrudTable from '@/components/crud/CrudTable.vue'
import { useCRUD } from '@/composables'

import { user_classMap, user_classOptions, gradeMap, gradeOptions, userTypeMap, userTypeOptions } from '@/assets/config'
import { convertImgUrl, formatDate } from '@/utils'
import api from '@/api'
import { useUserStore } from '@/store'

defineOptions({ name: '管理员列表' })
const userStore = useUserStore()

const $table = ref(null)
const queryItems = ref({
  SID: '',
  name: '',
  role: '',
  grade: userStore.grade,
  user_class: userStore.user_class,
})


// 计算属性，用于判断NSelect是否应该被禁用
const isDisabled = computed(() => {
  return userStore.role === 2;
});

const whatRole = computed(() => {
  if (userStore.role === 2) {
    return 1
  } else {
    return 
  }
});

onMounted(() => {
  $table.value?.handleSearch()
})

const initForm = {
  SID: '',
  password: '',
  name: '',
  role: whatRole.value,
  grade: userStore.grade,
  user_class: userStore.user_class,
}

const {
  modalVisible,
  modalLoading,
  modalTitle,
  handleSave,
  handleAdd,
  handleEdit,
  handleDelete,
  modalForm,
  modalFormRef,
} = useCRUD({
  name: '管理员',
  initForm,
  doCreate: api.saveUser,
  doUpdate: api.UpdateUser,
  doDelete: api.deleteBackendUser,
  refresh: () => $table.value?.handleSearch(),
})

const columns = [
{ type: 'selection', width: 15, fixed: 'left' },
  {
    title: '序号',
    key: 'pid',
    width: 20,
    align: 'center',
    ellipsis: { tooltip: true },
    render(row) {
      return h('span', row.pid)
    },
  },
  {
    title: '学/工号',
    key: 'sid',
    width: 60,
    align: 'center',
    ellipsis: { tooltip: true },
    render(row) {
      return h('span', row.sid)
    },
  },
  {
    title: '姓名',
    key: 'name',
    width: 60,
    align: 'center',
    ellipsis: { tooltip: true },
    render(row) {
      return h('span', row.name)
    },
  },
  {
    title: '身份',
    key: 'role',
    width: 40,
    align: 'center',
    render(row) {
      return h(
        NTag,
        { type: userTypeMap[row.role]?.tag },
        { default: () => userTypeMap[row.role]?.name || '未知' },
      )
    },
  },
  {
    title: '年级',
    key: 'grade',
    width: 40,
    align: 'center',
    render(row) {
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
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 60,
    align: 'center',
    fixed: 'right',
    render(row) {
      return [
      h(
          NButton,
          { size: 'small', type: 'primary', onClick: () => handleEdit(row) },
          { default: () => '编辑', icon: () => h('i', { class: 'i-material-symbols:edit-outline' }) },
        ),
      h(
          NPopconfirm,
          { onPositiveClick: () => handleDelete([row.sid], false) },
          {
            trigger: () => h(
              NButton,
              { size: 'small', type: 'error', style: 'margin-left: 15px;' },
              { default: () => '删除', icon: () => h('i', { class: 'i-material-symbols:delete-outline' }) },
            ),
            default: () => h('div', {}, '确定删除该管理员吗?'),
          },
        ),
      ]
    },
  },
]
</script>

<template>
  <CommonPage title="管理员列表">
    <template #action >
      <NButton type="primary" @click="handleAdd">
        <template #icon>
          <i class="i-material-symbols:add" />
        </template>
        新增管理员
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

    </template>


    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :columns="columns"
      :get-data="api.getUsers"
    >
      <template #queryBar>
        <QueryItem label="学/工号" :label-width="40" :content-width="160">
          <NInput
            v-model:value="queryItems.SID"
            clearable
            type="text"
            placeholder="请输入学/工号"
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
        <QueryItem label="身份" :label-width="70" :content-width="160">
          <NSelect
            v-model:value="queryItems.role"
            clearable
            filterable
            placeholder="请选择身份"
            :options="userTypeOptions"
            @update:value="$table?.handleSearch()"
          />
        </QueryItem>
        <QueryItem v-if="!isDisabled" label="年级" :label-width="60" :content-width="160">
          <NSelect
            v-model:value="queryItems.grade"
            clearable
            filterable
            placeholder="请选择年级"
            :options="gradeOptions"
            @update:value="$table?.handleSearch()"
          />
        </QueryItem>
        <QueryItem v-if="!isDisabled" label="班级" :label-width="60" :content-width="160">
          <NSelect
            v-model:value="queryItems.user_class"
            clearable
            filterable
            placeholder="请选择班级"
            :options="user_classOptions"
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
    <NFormItem label="密码" path="password">
      <NInput
        v-model:value="modalForm.password"
        clearable
        placeholder="请输入密码"
        minlength="6"
      />
    </NFormItem>
    <NFormItem label="姓名" path="name">
      <NInput
        v-model:value="modalForm.name"
        clearable
        placeholder="请输入姓名"
      />
    </NFormItem>
    <NFormItem label="身份" path="role">
      <NSelect
        v-if="userStore.role === 2"
        v-model:value= "modalForm.role"
        disabled
        :options="userTypeOptions"
      />
      <NSelect
        v-else
        v-model:value="modalForm.role"
        clearable
        filterable
        placeholder="请选择身份"
        :options="userTypeOptions"
      />
    </NFormItem>
    <NFormItem label="年级" path="grade">
      <NSelect
        v-if="isDisabled"
        v-model:value= "modalForm.grade"
        disabled
        :options="gradeOptions"
      />
      <NSelect
        v-else
        v-model:value="modalForm.grade"
        clearable
        filterable
        placeholder="请选择年级"
        :options="gradeOptions"
      />
    </NFormItem>
    <NFormItem label="班级" path="user_class">
      <NSelect
        v-if="isDisabled"
        v-model:value= "modalForm.user_class"
        disabled
        :options="user_classOptions"
      />
      <NSelect
        v-else
        v-model:value= "modalForm.user_class"
        clearable
        placeholder="请选择班级"
        :options="user_classOptions"
      />
    </NFormItem>
  </NForm>
</CrudModal>
  </CommonPage>
</template>
