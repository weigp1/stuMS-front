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
          <a :href="scope.row.link" target="_blank">下 载 </a>
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
        <el-input v-model="form.link" autocomplete="off" style="width: 100%" placeholder="请填写证明材料"/>
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
import { select, submitMorality } from '../../api/api.js';
import { UserStore } from '../../stores/user.js'
import {format} from "date-fns";
import { onMounted } from 'vue';

const MoraTableData = ref([
  // {
  //   title: '全国三好学生',
  //   date: '2022-08-22',
  //   link: 'https://123.com',
  //   remarks: '颁奖日期为08-27'
  // },
  // {
  //   title: '省级三好学生',
  //   date: '2022-05-22',
  //   link: 'https://123.com',
  //   remarks: '颁奖日期为06-01'
  // },
  // {
  //   title: '校级优秀共青团员',
  //   date: '2024-05-04',
  //   link: 'https://123.com',
  //   remarks: '无'
  // },
]);

const deleteRow = (index: number) => {
  MoraTableData.value.splice(index, 1);
};

const dialogFormVisible = ref(false);
const userStore = UserStore()

const form = reactive({
  title: '',
  date: '',
  link: '',
  remarks: '',
  comment: '',
  idx: '',
  link_name: '', // 这个字段感觉可以删
  pid: '',
  score: '',
  sid: '',
  status_one: '',
  status_two: ''
});

onMounted(async () => {
  try {
    // console.log("currentUser:", userStore.currentUser)
    const params = {'SID': userStore.currentUser.sid, 'table': "morality"};
    // 调用 select 接口获取数据
    const response = await select(params);
    console.log('Select 接口调用成功!', response);

    // 处理接口返回的数据，格式化日期字段为年月日（仅当 date 字段非空时）
    const formattedData = response.data.map(item => ({
      ...item,
      date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
      date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
      date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
    }));

    // 更新 ContTableData
    MoraTableData.value = formattedData;

  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }
});

const submitForm = async (form) => {
  // console.log(userStore.currentUser);
  form.sid = userStore.currentUser.sid;
  // form.comment = "xxx";
  // form.link_name = "xxx";
  // form.score = "0";
  form.status_one = 0;
  form.status_two = -1;
  // form.idx = "1";
  // 提交表单数据
  try {
    // 调用 submitMorality 函数提交表单数据
    const response = await submitMorality(form);
    console.log('提交成功!', response);
    // 处理成功后的逻辑，比如关闭弹窗等
    dialogFormVisible.value = false;

    const params = {'SID': userStore.currentUser.sid, 'table': "morality"};
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
    MoraTableData.value = formattedData;

  } catch (error) {
    console.error('提交失败!', error);
  }
}

</script>

<style scoped>
</style>
