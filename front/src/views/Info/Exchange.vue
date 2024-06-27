<template>
  <el-row>
    <el-table
        :data="OverseasExchangeData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="title" label="项目名称"/>
      <el-table-column prop="type" label="事由类型"/>
      <el-table-column prop="funding_source" label="经费来源"/>
      <el-table-column prop="country" label="前往国家/地区"/>
      <el-table-column prop="city" label="前往城市"/>
      <el-table-column prop="institution" label="前往院校/机构名称"/>
      <el-table-column prop="duration" label="项目期限"/>
      <el-table-column prop="date_start" label="出发时间" sortable/>
      <el-table-column prop="date_end" label="返校时间" sortable/>
      <el-table-column prop="current_status" label="目前状态"/>
      <el-table-column prop="flag1" label="是否已完成申报/报备"/>
      <el-table-column prop="flag2" label="是否已参加行前教育"/>
      <el-table-column prop="flag3" label="是否已签订承诺书"/>
      <el-table-column prop="flag4" label="是否已开展谈心谈话"/>
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
  <el-dialog v-model="dialogFormVisible" title="表单添加-赴外交流" width="460">
    <el-form :model="form" label-width="90px" label-position="top" class="centered-form">

      <el-form-item label="项目名称">
        <el-input v-model="form.title" autocomplete="off" style="width: 100%" placeholder="请输入项目名称"/>
      </el-form-item>

      <el-form-item label="事由类型">
        <el-select v-model="form.type" placeholder="请选择事由类型" style="width: 100%">
          <el-option label="交换项目" :value="1"></el-option>
          <el-option label="学术会议" :value="2"></el-option>
          <el-option label="短期学术交流" :value="3"></el-option>
          <el-option label="短期课程" :value="4"></el-option>
          <el-option label="汉语教师志愿者" :value="5"></el-option>
          <el-option label="实习" :value="6"></el-option>
          <el-option label="竞赛" :value="7"></el-option>
          <el-option label="其他" :value="8"></el-option>
        </el-select>
        <span style="font-size: 12px;">若“事由类型”选其他，请在备注中填写</span>
      </el-form-item>

      <el-form-item label="经费来源">
        <el-input v-model="form.funding_source" autocomplete="off" style="width: 100%" placeholder="请输入经费来源"/>
      </el-form-item>

      <el-form-item label="前往国家/地区">
        <el-input v-model="form.country" autocomplete="off" style="width: 100%" placeholder="请输入前往国家/地区"/>
      </el-form-item>

      <el-form-item label="前往城市">
        <el-input v-model="form.city" autocomplete="off" style="width: 100%" placeholder="请输入前往城市"/>
      </el-form-item>

      <el-form-item label="前往院校/机构名称">
        <el-input v-model="form.institution" autocomplete="off" style="width: 100%" placeholder="请输入前往院校/机构名称"/>
      </el-form-item>

      <el-form-item label="项目期限">
        <el-select v-model="form.duration" placeholder="请选择项目期限" style="width: 100%">
          <el-option label="长期（180天以上）" :value="1"></el-option>
          <el-option label="短期（180天以下）" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="出发时间">
        <el-date-picker
            v-model="form.date_start"
            type="date"
            placeholder="请选择出发时间"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="返校时间">
        <el-date-picker
            v-model="form.date_end"
            type="date"
            placeholder="请选择返校时间"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="目前状态">
        <el-select v-model="form.current_status" placeholder="请选择目前状态" style="width: 100%">
          <el-option label="已返校" :value="1"></el-option>
          <el-option label="在外" :value="2"></el-option>
          <el-option label="即将赴外" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否已完成申报/报备">
        <el-radio-group v-model="form.flag1" style="width: 100%">
          <el-radio label="是" :value="1">是</el-radio>
          <el-radio label="否" :value="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否已参加行前教育">
        <el-radio-group v-model="form.flag2" style="width: 100%">
          <el-radio label="是" :value="1">是</el-radio>
          <el-radio label="否" :value="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否已签订承诺书">
        <el-radio-group v-model="form.flag3" style="width: 100%">
          <el-radio label="是" :value="1">是</el-radio>
          <el-radio label="否" :value="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否已开展谈心谈话">
        <el-radio-group v-model="form.flag4" style="width: 100%">
          <el-radio label="是" :value="1">是</el-radio>
          <el-radio label="否" :value="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="证明材料文件名">
        <el-input v-model="form.link_name" autocomplete="off" style="width: 100%" placeholder="请输入证明材料文件名"/>
      </el-form-item>

      <el-form-item label="证明材料">
        <el-input v-model="form.link" autocomplete="off" style="width: 100%" placeholder="请输入证明材料的链接"/>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.remarks" type="textarea" autocomplete="off" maxlength="50" show-word-limit style="width: 100%" placeholder="选填，限制最长50字"/>
        <span style="font-size: 12px;">若“事由类型”选其他，请在备注中填写</span>
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
import { select, submitExchange } from '../../api/api.js';
import { UserStore } from '../../stores/user.js';
import {format} from "date-fns";
import { onMounted } from 'vue';

const userStore = UserStore()
// 默认显示
const OverseasExchangeData = ref([
  // {
  //   title: '交换项目',
  //   type: '交换项目',
  //   funding_source: '校内资助',
  //   country: '美国',
  //   city: '纽约',
  //   institution: '纽约大学',
  //   duration: '长期（180天以上）',
  //   date_start: '2023-01-01',
  //   date_end: '2023-12-31',
  //   current_status: '已返校',
  //   flag1: '是',
  //   flag2: '是',
  //   flag3: '是',
  //   flag4: '是',
  //   link_name: '交换项目证明',
  //   link: 'https://example.com/exchange1',
  //   remarks: '无'
  // },
  // 更多数据...
]);

// const deleteRow = (index: number) => {
//   OverseasExchangeData.value.splice(index, 1);
// };

const dialogFormVisible = ref(false);

const typeMap = {
  1: '交换项目',
  2: '学术会议',
  3: '短期学术交流',
  4: '短期课程',
  5: '汉语教师志愿者',
  6: '实习',
  7: '竞赛',
  8: '其他'
};

const judgeMap = {
  1: '是',
  2: '否'
};

const durationMap = {
  1: '长期（180天以上）',
  2: '短期（180天以下）'
};

const statusMap = {
  1: '已返校',
  2: '在外',
  3: '即将赴外'
};


const form = reactive({
  city: "",
  comment: "",
  country: "",
  current_status: "",
  date_end: "",
  date_start: "",
  duration: "",
  flag1: "",
  flag2: "",
  flag3: "",
  flag4: "",
  funding_source: "",
  institution: "",
  link: "",
  link_name: "",
  pid: "",
  remarks: "",
  sid: "",
  status_one: "",
  status_two: "",
  title: "",
  type: ""
});




onMounted(async () => {
  try {
    console.log("currentUser:", userStore.currentUser)
    const params = {'SID': userStore.currentUser.sid, 'table': "exchange"};
    // 调用 select 接口获取数据
    const response = await select(params);
    console.log('Select 接口调用成功!', response);

    // 处理接口返回的数据，格式化日期字段为年月日（仅当 date 字段非空时）
    const formattedData = response.data.map(item => ({
      ...item,
      date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
      date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
      date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
      type: typeMap[item.type],
      duration: durationMap[item.duration],
      flag1: judgeMap[item.flag1],
      flag2: judgeMap[item.flag2],
      flag3: judgeMap[item.flag3],
      flag4: judgeMap[item.flag4],
      current_status: statusMap[item.current_status]
    }));

    // 更新 ContTableData
    OverseasExchangeData.value = formattedData;

  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }
});


const submitForm = async (form) => {
  form.sid = userStore.currentUser.sid;
  form.status_one = "0";
  form.status_two = "-1";
  // console.log(form);


  // 提交表单数据
  try {
    // 调用 submitPaper 函数提交表单数据
    const response = await submitExchange(form);
    console.log('提交成功!', response);
    // 处理成功后的逻辑，比如关闭弹窗等
    dialogFormVisible.value = false;
    const params = {'SID': userStore.currentUser.sid, 'table': "exchange"};
    const response2 = await select(params);
    // 处理接口返回的数据，格式化日期字段为年月日（仅当 date 字段非空时）
    const formattedData = response2.data.map(item => ({
      ...item,
      date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
      date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
      date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
      type: typeMap[item.type],
      duration: durationMap[item.duration],
      flag1: judgeMap[item.flag1],
      flag2: judgeMap[item.flag2],
      flag3: judgeMap[item.flag3],
      flag4: judgeMap[item.flag4],
      current_status: statusMap[item.current_status]
    }));

    // 更新 ContTableData
    OverseasExchangeData.value = formattedData;
  } catch (error) {
    console.error('提交失败!', error);
  }
}

</script>

<style scoped>

</style>
