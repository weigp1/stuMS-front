<template>
  <el-row>
    <el-table
      :data="MoraTableData"
      style="width: 100%; max-width: 68vw; min-width: 68vw;"
      max-height="55vh"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      fit
      stripe
      highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="title" label="奖项名"/>
      <el-table-column prop="date" label="获奖时间" sortable/>
      <el-table-column prop="link" label="证明材料">
        <template #default="scope">
          <a :href="scope.row.link" target="_blank">下 载</a>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注"/>

      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button link type="primary" size="large" @click="deleteRow(scope.$index)">
            <el-icon class="el-icon--center"><Delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button
      class="mt-4"
      type="primary"
      style="position: absolute; width: 10%; height: 8%; right: 10px; bottom: 20px;"
      @click="dialogFormVisible = true"
    >
      添 加
    </el-button>
  </el-row>

  <!--添加弹窗-->
  <el-dialog v-model="dialogFormVisible" title="表单添加-思想道德类" width="460">
    <el-form :model="form" label-width="100px" label-position="top" class="centered-form">

      <el-form-item label="奖项名">
        <el-input v-model="form.title" autocomplete="off" style="width: 100%" placeholder="请填写奖项名"/>
      </el-form-item>

      <el-form-item label="获奖时间">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="请选择"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="证明材料">
        <input type="file" @change="handleFileChange" accept=".pdf" />
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.remarks" type="textarea" maxlength="50" show-word-limit placeholder="请输入备注，限制最长50字"/>
      </el-form-item>

    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(form)">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Delete } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import axios from 'axios';
import { submitMorality } from '../../api/api.js';
import { UserStore } from '../../stores/user.js'
import {uploadFile , downloadFile} from '../../api/resource.js';

const MoraTableData = ref([
  {
    title: '全国三好学生',
    date: '2022-08-22',
    link: 'https://123.com',
    remarks: '颁奖日期为08-27'
  },
  {
    title: '省级三好学生',
    date: '2022-05-22',
    link: 'https://123.com',
    remarks: '颁奖日期为06-01'
  },
  {
    title: '校级优秀共青团员',
    date: '2024-05-04',
    link: 'https://123.com',
    remarks: '无'
  },
]);

const deleteRow = (index: number) => {
  MoraTableData.value.splice(index, 1);
};

const dialogFormVisible = ref(false);
const userStore = UserStore();

const form = reactive({
  title: '',
  date: '',
  link: '',
  remarks: '',
  comment: '',
  idx: '',
  link_name: '',
  pid: '',
  score: '',
  sid: '',
  status_one: '',
  status_two: ''
});

const file = ref<File | null>(null);

const submitForm = async (form) => {
  form.sid = userStore.currentUser.sid;
  form.status_one = 0;
  form.status_two = -1;
  try {
    const response = await submitMorality(form);
    // 调用文件上传函数
    if (file.value) {
      await uploadFile('credential', form.link, file.value);
      console.log('提交成功!', response);
    }
    dialogFormVisible.value = false;
  } catch (error) {
    console.error('提交失败!', error);
  }
}

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    const currentTime = new Date().toISOString().replace(/[:.]/g, '-'); // 获取当前时间并格式化
    form.link_name = selectedFile.name;
    form.link = `${userStore.currentUser.sid}-${selectedFile.name}-${currentTime}`;
    file.value = selectedFile;
  }
}
</script>

<style scoped>
</style>
