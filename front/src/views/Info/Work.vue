<template>
  <el-row>
    <el-table
        :data="WorkTableData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="title" label="社会工作名"/>
      <el-table-column prop="date_start" label="开始时间" sortable/>
      <el-table-column prop="date_end" label="结束时间" sortable/>
      <el-table-column prop="link" label="证明材料">
        <template #default="scope">
          <a :href="scope.row.link" target="_blank">查看</a>
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
      添加
    </el-button>

  </el-row>

  <!-- 添加弹窗 -->
  <el-dialog v-model="dialogFormVisible" title="表单添加-社会工作类" width="460">

    <el-form :model="form" label-width="120px" label-position="top">

      <el-form-item label="社会工作名">
        <el-input v-model="form.title" placeholder="请填写社会工作名称"/>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-date-picker v-model="form.date_start" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间">
        <el-date-picker v-model="form.date_end" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="证明材料文件名">
        <el-input v-model="form.link_name" placeholder="请填写证明材料文件名"/>
      </el-form-item>

      <el-form-item label="证明材料（链接形式）">
        <el-input v-model="form.link" placeholder="请填写证明材料的链接"/>
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
import { reactive, ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import { submitSocialWork } from '../../api/api.js';
import { UserStore } from '../../stores/user.js';

const userStore = UserStore()

const WorkTableData = ref([
  // Sample data, replace with your actual data
  {
    title: '社会工作名称示例',
    date_start: '2022-01',
    date_end: '2022-06',
    link_name: '证明材料文件名示例',
    link: 'https://example.com',
    remarks: '无'
  }
]);

const dialogFormVisible = ref(false);

const form = reactive({
  comment: "",
  date_end: "",
  date_start: "",
  idx: "",
  link: "",
  link_name: "",
  pid: "",
  remarks: "",
  score: "",
  sid: "",
  status_one: "",
  status_two: "",
  title: ""
});

const submitForm = async (form) => {
  form.sid = userStore.currentUser.sid;
  form.status_one = "0";
  form.status_two = "-1";
  // console.log(form);


  // 提交表单数据
  try {
    // 调用 submitPaper 函数提交表单数据
    const response = await submitSocialWork(form);
    console.log('提交成功!', response);
    // 处理成功后的逻辑，比如关闭弹窗等
    dialogFormVisible.value = false;
  } catch (error) {
    console.error('提交失败!', error);
  }
}

// const deleteRow = (index: number) => {
//   WorkTableData.value.splice(index, 1);
// };
//
// const addRow = () => {
//   WorkTableData.value.push({ ...form });
//   resetForm();
// };
//
// const resetForm = () => {
//   form.title = '';
//   form.date_start = '';
//   form.date_end = '';
//   form.link_name = '';
//   form.link = '';
//   form.remarks = '';
// };

</script>

<style scoped>
</style>
