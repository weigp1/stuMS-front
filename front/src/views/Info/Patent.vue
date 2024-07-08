<template>
  <el-row>
    <el-table
        :data="PatentTableData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="title" label="专利名称"/>
      <el-table-column prop="type" label="专利类型"/>
      <el-table-column prop="application_num" label="专利申请号"/>
      <el-table-column prop="certificate_num" label="专利证书编号"/>
      <el-table-column prop="team" label="全部发明人"/>
      <el-table-column prop="acceptance" label="是否已受理"/>
      <el-table-column prop="acceptance_date" label="受理时间" sortable/>
      <el-table-column prop="my_release" label="是否已公开"/>
      <el-table-column prop="release_date" label="公开时间" sortable/>
      <el-table-column prop="empower" label="是否已授权"/>
      <el-table-column prop="empower_date" label="授权时间" sortable/>
      <el-table-column prop="transferred" label="是否已转让"/>
      <el-table-column prop="transferred_date" label="转让时间" sortable/>
      <el-table-column prop="transferred_income" label="转让收入" sortable/>
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
  <el-dialog v-model="dialogFormVisible" title="表单添加-专利" width="460">
    <el-form :model="form" label-width="90px" label-position="top" class="centered-form">

      <el-form-item label="专利名称">
        <el-input v-model="form.title" autocomplete="off" style="width: 100%" placeholder="请输入专利名称"/>
      </el-form-item>

      <el-form-item label="专利类型">
        <el-select v-model="form.type" placeholder="请选择专利类型" style="width: 100%">
          <el-option label="发明专利" :value="1"></el-option>
          <el-option label="实用新型" :value="2"></el-option>
          <el-option label="外观设计" :value="3"></el-option>
          <el-option label="PCT国际申请" :value="4"></el-option>
          <el-option label="其他" :value="5"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="专利申请号">
        <el-input v-model="form.application_num" autocomplete="off" style="width: 100%" placeholder="请输入专利申请号"/>
      </el-form-item>

      <el-form-item label="专利证书编号">
        <el-input v-model="form.certificate_num" autocomplete="off" style="width: 100%" placeholder="请输入专利证书编号"/>
      </el-form-item>

      <el-form-item label="全部发明人">
        <el-input v-model="form.team" autocomplete="off" style="width: 100%" placeholder="请按申请人顺序完整填写"/>
        <span style="font-size: 12px;">请按申请人顺序完整填写</span>
      </el-form-item>

      <el-form-item label="是否已受理">
        <el-radio-group v-model="form.acceptance">
          <el-radio label="是" :value="1">是</el-radio>
          <el-radio label="否" :value="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="form.acceptance === 1 " label="受理时间">
        <el-date-picker
            v-model="form.acceptance_date"
            type="date"
            placeholder="请选择受理时间"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="是否已公开">
        <el-radio-group v-model="form.my_release">
          <el-radio label="是" :value="1">是</el-radio>
          <el-radio label="否" :value="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="form.my_release === 1" label="公开时间">
        <el-date-picker
            v-model="form.release_date"
            type="date"
            placeholder="请选择公开时间"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="是否已授权">
        <el-radio-group v-model="form.empower">
          <el-radio label="是" :value="1">是</el-radio>
          <el-radio label="否" :value="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="form.empower === 1" label="授权时间">
        <el-date-picker
            v-model="form.empower_date"
            type="date"
            placeholder="请选择授权时间"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="是否已转让">
        <el-radio-group v-model="form.transferred">
          <el-radio label="是" :value="1">是</el-radio>
          <el-radio label="否" :value="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="form.transferred === 1" label="转让时间">
        <el-date-picker
            v-model="form.transferred_date"
            type="date"
            placeholder="请选择转让时间"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item v-if="form.transferred === 1" label="转让收入">
        <el-input v-model="form.transferred_income" autocomplete="off" style="width: 100%" placeholder="请输入转让收入"/>
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
import {deleteByPID, select, submitPatent} from '../../api/api.js';
import {UserStore} from '../../stores/user.js';
import {fileUrl, uploadFile} from '../../api/resource.js';
import {format} from "date-fns";
import {ElMessage} from "element-plus";

const userStore = UserStore()

const dialogFormVisible = ref(false);
// 默认显示
const PatentTableData = ref([
  // {
  //   title: '智能家居控制系统',
  //   type: '发明专利',
  //   application_num: 'CN123456789A',
  //   certificate_num: 'CN123456789B',
  //   team: '张三, 李四, 王五',
  //   acceptance: '是',
  //   acceptance_date: '2023-01-15',
  //   my_release: '是',
  //   release_date: '2023-06-20',
  //   empower: '是',
  //   empower_date: '2023-12-25',
  //   transferred: '否',
  //   transferred_date: '',
  //   transferred_income: '',
  //   link_name: '智能家居控制系统专利证书',
  //   link: 'https://example.com/patent1',
  //   remarks: '暂无'
  // },
]);

const typeMap = {
  1: '发明专利',
  2: '实用新型',
  3: '外观设计',
  4: 'PCT国际申请',
  5: '其他'
};

const acceptanceMap = {
  1: '是',
  2: '否'
};

const my_releaseMap = {
  1: '是',
  2: '否'
};

const empowerMap = {
  1: '是',
  2: '否'
};

const transferredMap = {
  1: '是',
  2: '否'
};


const form = reactive({
    acceptance: "",
    acceptance_date: "",
    application_num: "",
    certificate_num: "",
    comment: "",
    empower: "",
    empower_date: "",
    idx: "",
    link: "",
    link_name: "",
    my_release: "",
    pid: "",
    release_date: "",
    remarks: "",
    score: "",
    sid: "",
    status_one: 0,
    status_two: -1,
    team: "",
    title: "",
    transferred: "",
    transferred_date: "",
    type: ""
  });

const file = ref<File | null>(null);

onMounted(async () => {
  try {
    // console.log("currentUser:", userStore.currentUser)
    const params = {'SID': userStore.currentUser.sid, 'table': "patent"};
    // 调用 select 接口获取数据
    const response = await select(params);
    console.log('Select 接口调用成功!', response);

    const filteredData = response.data.filter(item => item.status_one === 1);
    // 更新 ContTableData
    PatentTableData.value = filteredData.map(item => ({
      ...item,
      date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
      date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
      date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
      acceptance_date: item.acceptance_date ? format(new Date(item.acceptance_date), 'yyyy-MM-dd') : null,
      empower_date: item.empower_date ? format(new Date(item.empower_date), 'yyyy-MM-dd') : null,
      release_date: item.release_date ? format(new Date(item.release_date), 'yyyy-MM-dd') : null,
      transferred_date: item.transferred_date ? format(new Date(item.transferred_date), 'yyyy-MM-dd') : null,
      type: typeMap[item.type],
      acceptance: acceptanceMap[item.acceptance],
      my_release: my_releaseMap[item.my_release],
      empower: empowerMap[item.empower],
      transferred: transferredMap[item.transferred]
    }));

  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }
});

const deleteRow = async (index) => {
  try {
    const item = PatentTableData.value[index];
    const params = {'PID': item.pid, 'SID': userStore.currentUser.sid, 'table': "patent"}
    const response = await deleteByPID(params); // 假设有 deleteSocialWork 方法并传入需要删除的数据的 ID
    console.log('删除成功!', response);
    PatentTableData.value.splice(index, 1); // 删除成功后更新界面数据
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
    const response = await submitPatent(form);
    console.log('提交表单为：',form);
    if (response.data === 1) {
      ElMessage.success('提交成功, 请前往个人信息审核页面查看');
      // 处理成功后的逻辑，比如关闭弹窗等
      dialogFormVisible.value = false;
      const params = {'SID': userStore.currentUser.sid, 'table': "patent"};

      // 调用 select 接口获取数据
      const response2 = await select(params);
      console.log('Select 接口调用成功!', response2);

      // 处理接口返回的数据，格式化日期字段为年月日（仅当 date 字段非空时）
      // 更新 ContTableData
      const filteredData = response2.data.filter(item => item.status_one === 1);
      // 更新 ContTableData
      PatentTableData.value = filteredData.map(item => ({
        ...item,
        date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
        date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
        date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
        acceptance_date: item.acceptance_date ? format(new Date(item.acceptance_date), 'yyyy-MM-dd') : null,
        empower_date: item.empower_date ? format(new Date(item.empower_date), 'yyyy-MM-dd') : null,
        release_date: item.release_date ? format(new Date(item.release_date), 'yyyy-MM-dd') : null,
        transferred_date: item.transferred_date ? format(new Date(item.transferred_date), 'yyyy-MM-dd') : null,
        type: typeMap[item.type],
        acceptance: acceptanceMap[item.acceptance],
        my_release: my_releaseMap[item.my_release],
        empower: empowerMap[item.empower],
        transferred: transferredMap[item.transferred]
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
