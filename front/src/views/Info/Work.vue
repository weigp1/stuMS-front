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
          <el-button type="primary" @click="handleDownload(scope.row.link)">查 看</el-button>
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
import { reactive, ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import {deleteByPID, select, submitSocialWork} from '../../api/api.js';
import { UserStore } from '../../stores/user.js';
import { uploadFile, fileUrl } from '../../api/resource.js';
import { format } from "date-fns";
import { onMounted } from 'vue';
import { ElMessage } from "element-plus";


const userStore = UserStore()

const WorkTableData = ref([
  // Sample data, replace with your actual data
  // {
  //   title: '社会工作名称示例',
  //   date_start: '2022-01',
  //   date_end: '2022-06',
  //   link_name: '证明材料文件名示例',
  //   link: 'https://example.com',
  //   remarks: '无'
  // }
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

const file = ref<File | null>(null);

onMounted(async () => {
  try {
    // console.log("currentUser:", userStore.currentUser)
    const params = {'SID': userStore.currentUser.sid, 'table': "socialwork"};
    // 调用 select 接口获取数据
    const response = await select(params);
    console.log('Select 接口调用成功!', response);

    const filteredData = response.data.filter(item => item.status_one === 0);
    const formattedData = filteredData.map(item => ({
      ...item,
      date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
      date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
      date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
    }));

    // 更新 ContTableData
    WorkTableData.value = formattedData;

  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }
});

const deleteRow = async (index) => {
  try {
    const item = WorkTableData.value[index];
    const params = {'PID': item.pid, 'SID': userStore.currentUser.sid, 'table': "socialwork"}
    const response = await deleteByPID(params); // 假设有 deleteSocialWork 方法并传入需要删除的数据的 ID
    console.log('删除成功!', response);
    WorkTableData.value.splice(index, 1); // 删除成功后更新界面数据
  } catch (error) {
    console.error('删除失败!', error);
  }
};

const submitForm = async (form) => {
  form.sid = userStore.currentUser.sid;
  form.status_one = "0";
  form.status_two = "-1";
  // 提交表单数据
  try {
    if (file.value) {
        const currentTime = new Date().toISOString().replace(/[:.]/g, '-');
        form.link_name = file.value.name;
        form.link = `${userStore.currentUser.sid}-${currentTime}-${file.value.name}`;
    }
    // 调用 submitPaper 函数提交表单数据
    const response = await submitSocialWork(form);
    console.log('提交表单为：',form);
    if (response.data === 1) {
      ElMessage.success('提交成功, 请前往个人信息审核页面查看');
      // 处理成功后的逻辑，比如关闭弹窗等
      dialogFormVisible.value = false;
      const params = {'SID': userStore.currentUser.sid, 'table': "socialwork"};
      // 调用 select 接口获取数据
      const response2 = await select(params);
      console.log('Select 接口调用成功!', response2);

      // 处理接口返回的数据，格式化日期字段为年月日（仅当 date 字段非空时）
      const formattedData = response2.data.map(item => ({
        ...item,
        date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
        date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
        date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
      }));

      // 更新 ContTableData
      WorkTableData.value = formattedData;
      // 上传证明文件
      if (file.value) {
        await uploadFile('credential', form.link, file.value);
        file.value = null; // 上传成功后清除文件
      }
    } else {
      ElMessage.error('提交失败!');
    }

  } catch (error) {
    console.error('提交失败!', error);
  }
};

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile;
  }
};

const handleDownload = async (link) => {
  const url = await fileUrl('credential', link);;
  window.open(url, '_blank');
};

</script>

<style scoped>
</style>
