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
        <el-button type="primary" @click="submitForm">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Delete } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { deleteByPID, select, submitMorality } from '../../api/api.js';
import { UserStore } from '../../stores/user.js';
import { uploadFile, fileUrl } from '../../api/resource.js';
import { format } from "date-fns";
import { onMounted } from 'vue';
import { ElMessage } from "element-plus";

const MoraTableData = ref([]);

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

onMounted(async () => {
  try {
    const params = { 'SID': userStore.currentUser.sid, 'table': "morality" };
    const response = await select(params);

    const filteredData = response.data.filter(item => item.status_one === 1);
    const formattedData = filteredData.map(item => ({
      ...item,
      date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
      date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
      date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
    }));

    MoraTableData.value = formattedData;

  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }
});


const deleteRow = async (index) => {
  try {
    const item = MoraTableData.value[index];
    const params = { 'PID': item.pid, 'SID': userStore.currentUser.sid, 'table': "morality" };
    const response = await deleteByPID(params);
    console.log('删除成功!', response);
    MoraTableData.value.splice(index, 1);
  } catch (error) {
    console.error('删除失败!', error);
  }
};

const submitForm = async () => {
  form.sid = userStore.currentUser.sid;
  form.status_one = 0;
  form.status_two = -1;
  try {
    if (file.value) {
        const currentTime = new Date().toISOString().replace(/[:.]/g, '-');
        form.link_name = file.value.name;
        form.link = `${userStore.currentUser.sid}-${currentTime}-${file.value.name}`;
    }
    const response = await submitMorality(form);
    console.log('提交表单为：',form);
    if (response.data === 1) {
      ElMessage.success('提交成功, 请前往个人信息审核页面查看');
      dialogFormVisible.value = false;
      const params = { 'SID': userStore.currentUser.sid, 'table': "morality" };
      const response2 = await select(params);
      const formattedData = response2.data.map(item => ({
        ...item,
        date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
        date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
        date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
      }));
      MoraTableData.value = formattedData;
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
