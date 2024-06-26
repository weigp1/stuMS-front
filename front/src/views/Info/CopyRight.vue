<template>
  <el-row>
    <el-table
        :data="SoftwareCopyrightData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="title" label="软件著作权名称"/>
      <el-table-column prop="author_level" label="第几发明人"/>
      <el-table-column prop="team" label="全部完成人"/>
      <el-table-column prop="application_status" label="申请状态"/>
      <el-table-column prop="date" label="该状态时间" sortable/>
      <el-table-column prop="link_name" label="证明材料文件名"/>
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
  <el-dialog v-model="dialogFormVisible" title="表单添加-软件著作权发明" width="460">
    <el-form :model="form" label-width="90px" label-position="top" class="centered-form">

      <el-form-item label="软件著作权名称">
        <el-input v-model="form.title" autocomplete="off" style="width: 100%" placeholder="请输入软件著作权名称"/>
      </el-form-item>

      <el-form-item label="第几发明人">
        <el-select v-model="form.author_level" placeholder="请选择发明人类型" style="width: 100%">
          <el-option label="通讯" :value="1"></el-option>
          <el-option label="一作" :value="2"></el-option>
          <el-option label="通讯+一作" :value="3"></el-option>
          <el-option label="通讯+共同一作" :value="4"></el-option>
          <el-option label="共同一作" :value="5"></el-option>
          <el-option label="二作" :value="6"></el-option>
          <el-option label="其他" :value="7"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="全部完成人">
        <el-input v-model="form.team" autocomplete="off" style="width: 100%" placeholder="请完整填写全部完成人"/>
        <span style="font-size: 12px;">请按发明人顺序完整填写</span>
      </el-form-item>

      <el-form-item label="申请状态">
        <el-select v-model="form.application_status" placeholder="请选择申请状态" style="width: 100%">
          <el-option label="申请中" :value="1"></el-option>
          <el-option label="收到证书" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="该状态时间">
        <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="请选择该状态时间"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="证明材料文件名">
        <el-input v-model="form.link_name" autocomplete="off" style="width: 100%" placeholder="请输入证明材料文件名"/>
      </el-form-item>

      <el-form-item label="证明材料">
        <el-input v-model="form.link" autocomplete="off" style="width: 100%" placeholder="请输入证明材料的链接"/>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.remarks" type="textarea" autocomplete="off" maxlength="50" show-word-limit style="width: 100%" placeholder="选填，限制最长50字"/>
      </el-form-item>

    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
            type="primary"
            @click="submitForm(form)">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { Delete } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { submitCopyright } from '../../api/api.js';
import { UserStore } from '../../stores/user.js';

const userStore = UserStore()

// 默认显示
const SoftwareCopyrightData = ref([
  {
    title: '智能管理系统',
    author_level: '一作',
    team: '张三, 李四, 王五',
    application_status: '申请中',
    date: '2024-05-04',
    link_name: '智能管理系统申请通知书',
    link: 'https://example.com/software1',
    remarks: '无'
  },
  // 更多数据...
]);

// const deleteRow = (index: number) => {
//   SoftwareCopyrightData.value.splice(index, 1);
// };

const dialogFormVisible = ref(false);

const form = reactive({
  application_status: "",
  author_level: "",
  comment: "",
  date: "",
  idx: "",
  link: "",
  link_name: "",
  pid: "",
  remarks: "",
  score: "",
  sid: "",
  status_one: "",
  status_two: "",
  team: "",
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
    const response = await submitCopyright(form);
    console.log('提交成功!', response);
    // 处理成功后的逻辑，比如关闭弹窗等
    dialogFormVisible.value = false;
  } catch (error) {
    console.error('提交失败!', error);
  }
}

</script>

<style scoped>
</style>
