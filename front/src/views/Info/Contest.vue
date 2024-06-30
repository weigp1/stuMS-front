<template>
  <el-row>
    <el-table
        :data="ContTableData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="name" label="比赛名称"/>
      <el-table-column prop="organization" label="评奖组织单位"/>
      <el-table-column prop="date" label="获奖时间" sortable/>
      <el-table-column prop="title" label="获奖名称"/>
      <el-table-column prop="level" label="成果级别"/>
      <el-table-column prop="rank" label="比赛名次"/>
      <el-table-column prop="team" label="其他参与人员"/>
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
  <el-dialog v-model="dialogFormVisible" title="表单添加-竞赛获奖类" width="460">

    <el-form :model="form" label-width="120px" label-position="top">

      <el-form-item label="比赛类别">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option label="学科竞赛" :value="1"></el-option>
          <el-option label="文娱比赛" :value="2"></el-option>
          <el-option label="体育比赛" :value="3"></el-option>
          <el-option label="实践活动" :value="4"></el-option>
          <el-option label="征文比赛" :value="5"></el-option>
          <el-option label="其他" :value="6"></el-option>
        </el-select>
        <span style="font-size: 12px;">请严格按照比赛通知、奖状信息填写</span>
      </el-form-item>

      <el-form-item label="比赛名称">
        <el-input v-model="form.name" placeholder="请填写比赛名称"/>
        <span style="font-size: 12px;">请严格按照比赛通知、奖状信息填写，含比赛年份、届别、地区等信息</span>
      </el-form-item>

      <el-form-item label="评奖组织单位">
        <el-input v-model="form.organization" placeholder="请填写评奖组织单位"/>
      </el-form-item>

      <el-form-item label="获奖时间">
        <el-date-picker v-model="form.date" placeholder="选择时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="获奖名称">
        <el-input v-model="form.title" placeholder="请填写获奖名称"/>
        <span style="font-size: 12px;">请严格按照奖状信息填写，如有，请注明地区、组别等信息</span>
      </el-form-item>

      <el-form-item label="成果级别">
        <el-select v-model="form.level" placeholder="请选择">
          <el-option label="国际级" :value="1"></el-option>
          <el-option label="国家级" :value="2"></el-option>
          <el-option label="省部级" :value="3"></el-option>
          <el-option label="校级" :value="4"></el-option>
          <el-option label="院级" :value="5"></el-option>
          <el-option label="其他" :value="6"></el-option>
        </el-select>
        <span style="font-size: 12px;">全国性行业协会主办赛事等同省部级</span>
      </el-form-item>

      <el-form-item label="比赛名次">
        <el-select v-model="form.my_rank" placeholder="请选择">
          <el-option label="特等奖" :value="1"></el-option>
          <el-option label="一等奖" :value="2"></el-option>
          <el-option label="二等奖" :value="3"></el-option>
          <el-option label="三等奖" :value="4"></el-option>
          <el-option label="冠军" :value="5"></el-option>
          <el-option label="亚军" :value="6"></el-option>
          <el-option label="季军" :value="7"></el-option>
          <el-option label="金奖" :value="8"></el-option>
          <el-option label="银奖" :value="9"></el-option>
          <el-option label="铜奖" :value="10"></el-option>
          <el-option label="第一名" :value="11"></el-option>
          <el-option label="第二名" :value="12"></el-option>
          <el-option label="第三名" :value="13"></el-option>
          <el-option label="第四名" :value="14"></el-option>
          <el-option label="第五名" :value="15"></el-option>
          <el-option label="第六名" :value="16"></el-option>
          <el-option label="其他" :value="17"></el-option>
        </el-select>
        <span style="font-size: 12px;">冠军、金牌等同于第一名，亚军、银牌等同于第二名，季军、铜牌等同于第三名</span>
      </el-form-item>

      <el-form-item label="其他参与人员">
        <el-input v-model="form.team" placeholder="请填写其他参与人员"/>
        <span style="font-size: 12px;">姓名+学院，如小红+21310000、小明+21310001，没有就填“无”</span>
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
import {deleteByPID, select, submitCompetition} from '../../api/api.js';
import {UserStore} from '../../stores/user.js';
import {fileUrl, uploadFile} from '../../api/resource.js';
import {format} from "date-fns";
import {ElMessage} from "element-plus";


const userStore = UserStore()
const ContTableData = ref([
  // Sample data, replace with your actual data
  // {
  //   name: '数学建模竞赛',
  //   organization: '中国大学生数学建模竞赛组委会',
  //   date: '2023-05',
  //   title: '一等奖',
  //   level: '校级',
  //   rank: '一等奖',
  //   team: '小红+21310000、小明+21310001',
  //   link_name: '证明材料文件名',
  //   link: 'https://example.com',
  //   remarks: '无'
  // }
]);

const dialogFormVisible = ref(false);

const form = reactive({
  comment: "",
  date: "",
  idx: "",
  level: "",
  link: "",
  link_name: "",
  my_rank: "",
  name: "",
  organization: "",
  pid: "",
  remarks: "",
  score: "",
  sid: "",
  status_one: 0,
  status_two: -1,
  team: "",
  title: "",
  type: ""
});

const levelMaps = {
  1: '国际级',
  2: '国家级',
  3: '省部级',
  4: '校级',
  5: '院级',
  6: '其他'
};

const rankMaps = {
  1: '特等奖',
  2: '一等奖',
  3: '二等奖',
  4: '三等奖',
  5: '冠军',
  6: '亚军',
  7: '季军',
  8: '金奖',
  9: '银奖',
  10: '铜奖',
  11: '第一名',
  12: '第二名',
  13: '第三名',
  14: '第四名',
  15: '第五名',
  16: '第六名',
  17: '其他'
};

const typeMaps = {
  1: '学科竞赛',
  2: '文娱比赛',
  3: '体育比赛',
  4: '实践活动',
  5: '征文比赛',
  6: '其他'
}

const file = ref<File | null>(null);

onMounted(async () => {
  try {
    console.log("currentUser:", userStore.currentUser)
    const params = {'SID': userStore.currentUser.sid, 'table': "competition"};
    // 调用 select 接口获取数据
    const response = await select(params);
    console.log('Select 接口调用成功!', response);

    const filteredData = response.data.filter(item => item.status_one === 0);
    // 更新 ContTableData
    ContTableData.value = filteredData.map(item => ({
      ...item,
      date: format(new Date(item.date), 'yyyy-MM-dd'), // 假设 date 是需要格式化的字段
      rank: rankMaps[item.my_rank],
      level: levelMaps[item.level],
      type: typeMaps[item.type],
    }));

  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }
});

const deleteRow = async (index) => {
  try {
    const item = ContTableData.value[index];
    const params = {'PID': item.pid, 'SID': userStore.currentUser.sid, 'table': "competition"}
    const response = await deleteByPID(params); // 假设有 deleteSocialWork 方法并传入需要删除的数据的 ID
    console.log('删除成功!', response);
    ContTableData.value.splice(index, 1); // 删除成功后更新界面数据
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
    const response = await submitCompetition(form);
    console.log('提交表单为：',form);
    if (response.data === 1) {
      ElMessage.success('提交成功, 请前往个人信息审核页面查看');
      // 处理成功后的逻辑，比如关闭弹窗等
      dialogFormVisible.value = false;
      const params = {'SID': userStore.currentUser.sid, 'table': "competition"};
      const response2 = await select(params);
      // 更新 ContTableData
      ContTableData.value = response2.data.map(item => ({
        ...item,
        date: format(new Date(item.date), 'yyyy-MM-dd'), // 假设 date 是需要格式化的字段
        rank: rankMaps[item.my_rank],
        level: levelMaps[item.level],
        type: typeMaps[item.type],
        // 如果 date 不是日期类型而是字符串，需要先转换为 Date 对象
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
