<script setup>
import {ref, computed, onMounted, watch} from 'vue';
import TopBar from "../../components/TopBar.vue";
import { ElCard, ElDialog, ElSelect, ElOption } from 'element-plus';
import {useRoute} from "vue-router";
import { select } from '../../api/api.js';
import {UserStore} from '../../stores/user.js';

// 导入图标
import YesIcon from '../../assets/status/Yes.png';
import WaitIcon from '../../assets/status/Wait.png';
import NoIcon from '../../assets/status/No.png';
import {format} from "date-fns";


const userStore = UserStore()

// personalVisible=true 表示读取个人信息，即category='personal'
const personalVisible = ref(false);

// 筛选和排序选项
const selectedOption = ref('政治思想道德类');

// 选项数据
const options = ref([
  { value: 'morality', label: '政治思想道德类' },
  { value: 'volunteer', label: '志愿服务活动类' },
  { value: 'socialwork', label: '社会工作类' },
  { value: 'competition', label: '比赛获奖类' },
  { value: 'paper', label: '论文发表类' },
  { value: 'patent', label: '专利发明类' },
  { value: 'copyright', label: '软件著作权类' },
  { value: 'publication', label: '专著出版类' },
  { value: 'exchange', label: '赴校外交流类' },
]);

// 根据 value 获取 label 的函数
function getLabelByValue(value) {
  console.log("value", value)
  const option = options.value.find(opt => opt.value === value);
  return option ? option.label : '';
}

// 弹窗控制和内容
const dialogVisible = ref(false);
const dialogContent = ref('');

let rawData = ref([]);
let response = ref([]);

// 数据加载
const fetchData = async (response) => {

  if (route.query.category === 'personal') {
    // 如果 route.query.category 的值为 'personal'，将 response 的每一条数据添加到 rawData 中
    rawData.value = response.value;
  } else if (route.query.category === 'overall') {
    // 如果 route.query.category 的值为 'overall'，筛选满足条件的数据
    rawData.value = response.value.filter(item => item.status_one === 1 && item.status_two !== -1);
  }


  console.log('Processed rawData:', rawData);
};

// 根据筛选和排序选项处理数据
// const filteredData = computed(() => {
//
//   let data = rawData.value;
//
//   // 筛选数据
//   // if (personalVisible.value) {
//   //   data = data.filter(item => item.category === 'personal');
//   // } else {
//   //   data = data.filter(item => item.category === 'overall');
//   // }
//
//   // data = data.filter(item => item.class === selectedOption.value);
//
//   return data;
// });

// 弹窗显示完整的remarks内容
const showRemarks = (remarks) => {
  dialogContent.value = remarks;
  dialogVisible.value = true;
};

const getStatusText = (status_one, status_two) => {
  console.log("status_one", status_one)
  console.log("status_two", status_two)
  let status = '';
  if(route.query.category === 'personal'){
    status = status_one;
  }
  else
    status = status_two;
  if (status === 0) return '待审核';
  if (status === 1) return '已通过';
  if (status === 2) return '已驳回';

};

const getStatusStyle = (status_one, status_two) => {
  console.log("status_one", status_one)
  console.log("status_two", status_two)
  let status = '';
  if(route.query.category === 'personal'){
    status = status_one;
  }
  else
    status = status_two;
  if (status === 0) return {color: 'orange'};
  if (status === 1) return {color: 'green'};
  if (status === 2) return {color: 'red'};

};

const getStatusIcon = (status_one, status_two) => {
  console.log("status_one", status_one)
  console.log("status_two", status_two)
  let status = '';
  if(route.query.category === 'personal'){
    status = status_one;
  }
  else
    status = status_two;
  if (status === 0) return WaitIcon;
  if (status === 1) return YesIcon;
  if (status === 2) return NoIcon;

};

const route = useRoute();

const updateVisibility = () => {
  if (route.query.category === 'personal') {
    personalVisible.value = true;
  } else if (route.query.category === 'overall') {
    personalVisible.value = false;
  }
};

watch(
    () => route.query.category,
    updateVisibility
);


const tableName = ref('morality');

watch(selectedOption, async (newValue) => {
  tableName.value = newValue; // 每次选项变化时更新 tableName 的值
  console.log(tableName.value);

  const params = {'SID': userStore.currentUser.sid, 'table': tableName.value};
  // 调用 select 接口获取数据
  const data = await select(params); // 调用 select 函数获取数据
  console.log("data: ", data);

  if (data !== null) {
    response.value = data;

    if (route.query.category === 'personal') {
      rawData.value = response.value;
    } else if (route.query.category === 'overall') {
      let filteredData = [];
      for (let i = 0; i < response.value.length; i++) {
        const item = response.value[i];
        if (item.status_one === 1 && item.status_two !== -1) {
          filteredData.push(item);
        }
      }
      rawData.value = filteredData;
    }
    console.log("rawData: ", rawData.value)
}});

onMounted(async () => {
  try {
    const params = {'SID': userStore.currentUser.sid, 'table': tableName.value};
    // 调用 select 接口获取数据
    const data = await select(params); // 调用 select 函数获取数据
    console.log("data: ", data);

    if (data !== null) {
      response.value = data;

      if (route.query.category === 'personal') {
        rawData.value = response.value;
      } else if (route.query.category === 'overall') {
        let filteredData = [];
        for (let i = 0; i < response.value.length; i++) {
          const item = response.value[i];
          if (item.status_one === 1 && item.status_two !== -1) {
            filteredData.push(item);
          }
        }
        rawData.value = filteredData;
      }

      console.log("rawData: ", rawData.value)

    // fetchData(response.data);

    // // 模拟数据加载
    // fetchData();
    // // console.log("currentUser:", userStore.currentUser)
    // const params = {'SID': userStore.currentUser.sid, 'table': "patent"};
    // // 调用 select 接口获取数据
    // const response = await select(params);
    // console.log('Select 接口调用成功!', response);
    //
    // const filteredData = response.data.filter(item => item.status_one === 0);
    // // 更新 ContTableData
    // PatentTableData.value = filteredData.map(item => ({
    //   ...item,
    //   date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
    //   date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
    //   date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
    //   acceptance_date: item.acceptance_date ? format(new Date(item.acceptance_date), 'yyyy-MM-dd') : null,
    //   empower_date: item.empower_date ? format(new Date(item.empower_date), 'yyyy-MM-dd') : null,
    //   release_date: item.release_date ? format(new Date(item.release_date), 'yyyy-MM-dd') : null,
    //   transferred_date: item.transferred_date ? format(new Date(item.transferred_date), 'yyyy-MM-dd') : null,
    //   type: typeMap[item.type],
    //   acceptance: acceptanceMap[item.acceptance],
    //   my_release: my_releaseMap[item.my_release],
    //   empower: empowerMap[item.empower],
    //   transferred: transferredMap[item.transferred]
    // }));

  }} catch (error) {
    console.error('Select 接口调用失败!', error);
  }
});

</script>

<template>
  <div class="box">
    <TopBar/>
    <div class="content">
      <div class="filter-bar">
        <el-select v-model="selectedOption" filterable placeholder="请选择">
          <el-option
              class="select_item"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="card-container">
        <el-card v-for="item in rawData" :key="item.status_one" class="card" shadow="hover"
                 @click="showRemarks(item.remarks)">
          <div class="card-content">
            <div class="status-icon">
              <img :src="getStatusIcon(item.status_one, item.status_two)" alt="status icon"/>
            </div>
            <div class="card-text">
              <p class="info-line"><span class="label">类别:&nbsp</span> <span>{{ getLabelByValue(tableName.value) }}</span></p>
              <p class="info-line"><span class="label">提交审核日期:&nbsp</span> <span>{{ 20240630 }}</span></p>
              <p class="info-line"><span class="label">奖项:&nbsp</span> <span>{{ item.title }}</span></p>
              <p class="info-line"><span class="label">状态:&nbsp</span> <span :style="getStatusStyle(item.status_one, item.status_two)">{{ getStatusText(item.status_one, item.status_two) }}</span></p>
            </div>
          </div>
        </el-card>
      </div>

      <el-dialog v-model="dialogVisible" title="审核意见">
        <div class="dialog-content">
          <p>{{ dialogContent }}</p>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<style scoped>
.box {
  top: 0;
  min-height: 130vh;
  width: 100%;
  background-image: url("../../assets/background.jpg");
  background-size: cover;
  background-attachment: fixed;
}

.content {
  top: 15vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
}

.el-select {
  min-width: 200px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}

.card {
  width: 50vh;
  min-width: 50vh;
  margin-bottom: 1rem;
  border-radius: 20px;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.9);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.card-text .info-line .label {
  font-weight: bold;
  white-space: nowrap;
}

.status-icon {
  flex: 1;
  display: flex;
}

.status-icon img {
  width: 10vh;
  height: auto;
  flex-direction: column;
  justify-content: center;
  left: 3vh;
}

.card-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.card p {
  margin: 0.3rem 0;
}

.card-text .info-line {
  display: flex;
  justify-content: space-between;
  margin-top: 1vh;
  margin-bottom: 1vh;
}

.card-text .info-line span:first-child {
  font-weight: bold;
}

.dialog-content {
  min-height: 60vh;
  overflow-y: auto;
}

@media (max-width: 1000px) {
  .card {
    width: 45%;
  }
}

@media (max-width: 600px) {
  .card {
    width: 100%;
  }
}
</style>
