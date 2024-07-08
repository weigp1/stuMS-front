<template>
  <el-row>
    <el-table
        :data="VolTableData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="title" label="活动全称"/>
      <el-table-column prop="organization" label="组织团体"/>
      <el-table-column prop="type" label="活动类型"/>
      <el-table-column prop="date_start" label="开始时间" sortable/>
      <el-table-column prop="date_end" label="结束时间" sortable/>
      <el-table-column prop="duration" label="志愿时长" sortable/>
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

  <!--添加弹窗-->
  <el-dialog v-model="dialogFormVisible" title="表单添加-志愿服务类" width="460">

    <el-form :model="form" label-width="120px" label-position="top">

      <el-form-item label="志愿活动名称">
        <el-input v-model="form.title" placeholder="请填写志愿活动名称"/>
      </el-form-item>

      <el-form-item label="志愿组织团体">
        <el-input v-model="form.organization" placeholder="请填写志愿组织团体"/>
      </el-form-item>

      <el-form-item label="活动类型">
        <el-select v-model="form.type" placeholder="请选择活动类型">
          <el-option label="助学支教" :value="1"/>
          <el-option label="文化文艺服务" :value="2"/>
          <el-option label="科学普及" :value="3"/>
          <el-option label="理论政策宣讲" :value="4"/>
          <el-option label="敬老服务" :value="5"/>
          <el-option label="助残服务" :value="6"/>
          <el-option label="文明交通" :value="7"/>
          <el-option label="卫生环保" :value="8"/>
          <el-option label="扶贫帮困" :value="9"/>
          <el-option label="体育活动" :value="10"/>
          <el-option label="迎新活动" :value="11"/>
          <el-option label="三下乡" :value="12"/>
          <el-option label="会务工作" :value="13"/>
          <el-option label="医疗服务" :value="14"/>
          <el-option label="其他" :value="15"/>
        </el-select>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-date-picker v-model="form.date_start" type="date" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间">
        <el-date-picker v-model="form.date_end" type="date" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="志愿服务时长">
        <el-input v-model="form.duration" placeholder="请填写志愿服务时长（小时）"/>
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
import {onMounted, reactive, ref} from 'vue';
import {Delete} from '@element-plus/icons-vue';
import {deleteByPID, select, submitVolunteer} from '../../api/api.js';
import {UserStore} from '../../stores/user.js';
import {fileUrl, uploadFile} from '../../api/resource.js';
import {format} from "date-fns";
import {ElMessage} from "element-plus";

const userStore = UserStore()

const VolTableData = ref([
  // Sample data, replace with your actual data
  // {
  //   title: '志愿活动名称示例',
  //   organization: '组织团体示例',
  //   type: '其他',
  //   date_start: '2022-01-01',
  //   date_end: '2022-01-07',
  //   duration: '20.5',
  //   link_name: '证明材料文件名示例',
  //   link: 'https://example.com',
  //   remarks: '无'
  // }
]);

const dialogFormVisible = ref(false);

const typeMap = {
  1: '助学支教',
  2: '文化文艺服务',
  3: '科学普及',
  4: '理论政策宣讲',
  5: '敬老服务',
  6: '助残服务',
  7: '文明交通',
  8: '卫生环保',
  9: '扶贫帮困',
  10: '体育活动',
  11: '迎新活动',
  12: '三下乡',
  13: '会务工作',
  14: '医疗服务',
  15: '其他'
};

const form = reactive({
  comment: "",
  date_end: "",
  date_start: "",
  duration: "",
  idx: "",
  link: "",
  link_name: "",
  organization: "",
  pid: "",
  remarks: "",
  sid: "",
  status_one: "",
  status_two: "",
  title: "",
  type: ""
});

const file = ref<File | null>(null);

onMounted(async () => {
  try {
    const params = {'SID': userStore.currentUser.sid, 'table': "volunteer"};
    // 调用 select 接口获取数据
    const response = await select(params);
    console.log('Select 接口调用成功!', response);

    const filteredData = response.data.filter(item => item.status_one === 1);
    // 更新 ContTableData
    VolTableData.value = filteredData.map(item => ({
      ...item,
      date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
      date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
      date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
      type: typeMap[item.type],
    }));

  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }
});

const deleteRow = async (index) => {
  try {
    const item = VolTableData.value[index];
    const params = {'PID': item.pid, 'SID': userStore.currentUser.sid, 'table': "volunteer"}
    const response = await deleteByPID(params); // 假设有 deleteSocialWork 方法并传入需要删除的数据的 ID
    console.log('删除成功!', response);
    VolTableData.value.splice(index, 1); // 删除成功后更新界面数据
  } catch (error) {
    console.error('删除失败!', error);
  }
};

const submitForm = async (form) => {
  form.sid = userStore.currentUser.sid;
  form.status_one = "0";
  form.status_two = "-1";
  // console.log(form);


  // 提交表单数据
  try {
    if (file.value) {
        const currentTime = new Date().toISOString().replace(/[:.]/g, '-');
        form.link_name = file.value.name;
        form.link = `${userStore.currentUser.sid}-${currentTime}-${file.value.name}`;
    }
    // 调用 submitPaper 函数提交表单数据
    const response = await submitVolunteer(form);
    console.log('提交表单为：',form);
    if (response.data === 1) {
      ElMessage.success('提交成功, 请前往个人信息审核页面查看');
      // 处理成功后的逻辑，比如关闭弹窗等
      dialogFormVisible.value = false;
      const params = {'SID': userStore.currentUser.sid, 'table': "volunteer"};
      // 调用 select 接口获取数据
      const response2 = await select(params);
      console.log('Select 接口调用成功!', response2);

      // 处理接口返回的数据，格式化日期字段为年月日（仅当 date 字段非空时）
      // 更新 ContTableData
      const filteredData = response2.data.filter(item => item.status_one === 1);
      // 更新 ContTableData
      VolTableData.value = filteredData.map(item => ({
        ...item,
        date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
        date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
        date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
        type: typeMap[item.type],
      }));
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
  const url = await fileUrl('credential', link);
  window.open(url, '_blank');
};
</script>

<style scoped>
</style>
