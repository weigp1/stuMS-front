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

      <el-form-item label="证明材料">
        <input type="file" @change="handleFileChange" accept=".pdf" />
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
import {Delete} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import {deleteByPID, select, submitCopyright} from '../../api/api.js';
import {UserStore} from '../../stores/user.js';
import {fileUrl, uploadFile} from '../../api/resource.js';
import {format} from "date-fns";
import {ElMessage} from "element-plus";


const userStore = UserStore()

// 默认显示
const SoftwareCopyrightData = ref([
  // {
  //   title: '智能管理系统',
  //   author_level: '一作',
  //   team: '张三, 李四, 王五',
  //   application_status: '申请中',
  //   date: '2024-05-04',
  //   link_name: '智能管理系统申请通知书',
  //   link: 'https://example.com/software1',
  //   remarks: '无'
  // },
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

const statusMaps = {
  1: "申请中",
  2: "收到证书"
};

const levelMaps = {
  1: "通讯",
  2: "一作",
  3: "通讯+一作",
  4: "通讯+共同一作",
  5: "共同一作",
  6: "二作",
  7: "其他"
};


const file = ref<File | null>(null);

onMounted(async () => {
  try {
    console.log("currentUser:", userStore.currentUser)
    const params = {'SID': userStore.currentUser.sid, 'table': "copyright"};
    // 调用 select 接口获取数据
    const response = await select(params);
    console.log('Select 接口调用成功!', response);

    const filteredData = response.data.filter(item => item.status_one === 0);
    // 更新 ContTableData
    SoftwareCopyrightData.value = filteredData.map(item => ({
      ...item,
      date: format(new Date(item.date), 'yyyy-MM-dd'), // 假设 date 是需要格式化的字段
      application_status: statusMaps[item.application_status],
      author_level: levelMaps[item.author_level],
      // 如果 date 不是日期类型而是字符串，需要先转换为 Date 对象
    }));

  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }
});

const deleteRow = async (index) => {
  try {
    const item = SoftwareCopyrightData.value[index];
    const params = {'PID': item.pid, 'SID': userStore.currentUser.sid, 'table': "copyright"}
    const response = await deleteByPID(params); // 假设有 deleteSocialWork 方法并传入需要删除的数据的 ID
    console.log('删除成功!', response);
    SoftwareCopyrightData.value.splice(index, 1); // 删除成功后更新界面数据
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
    const response = await submitCopyright(form);
    console.log('提交表单为：',form);
    if (response.data === 1) {
      ElMessage.success('提交成功, 请前往个人信息审核页面查看');
      // 处理成功后的逻辑，比如关闭弹窗等
      dialogFormVisible.value = false;
      const params = {'SID': userStore.currentUser.sid, 'table': "copyright"};
      const response2 = await select(params);
      // 更新 ContTableData
      SoftwareCopyrightData.value = response2.data.map(item => ({
        ...item,
        date: format(new Date(item.date), 'yyyy-MM-dd'),
        application_status: statusMaps[item.application_status],
        author_level: levelMaps[item.author_level],
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
