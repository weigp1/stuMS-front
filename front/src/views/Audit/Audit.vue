<script setup>
import {ref, computed, onMounted, watch} from 'vue';
import TopBar from "../../components/TopBar.vue";
import { ElCard, ElDialog, ElSelect, ElOption } from 'element-plus';
import {useRoute} from "vue-router";
import { UserStore } from '../../stores/user.js';
import { select } from '../../api/api.js';
import { format } from "date-fns";
import { ElMessage } from "element-plus";

// 导入图标
import YesIcon from '../../assets/status/Yes.png';
import WaitIcon from '../../assets/status/Wait.png';
import NoIcon from '../../assets/status/No.png';

// 模拟从数据库读取的数据
const rawData = ref([]);

// personalVisible=true 表示读取个人信息，即category='personal'
const personalVisible = ref(false);

// 筛选和排序选项
const selectedOption = ref('政治思想道德类');

// 选项数据
const options = ref([
  { value: '政治思想道德类', label: '政治思想道德类' },
  { value: '文体实践类', label: '文体实践类' },
  { value: '社会工作类', label: '社会工作类' },
  { value: '学习、竞赛及科研成果类', label: '学习、竞赛及科研成果类' },
]);

// 弹窗控制和内容
const dialogVisible = ref(false);
const dialogContent = ref('');
const userStore = UserStore();

// 模拟数据加载
const fetchData = async () => {
  try {
    const params = { 'SID': userStore.currentUser.sid, 'table': "morality" };
    const response = await select(params);
    const formattedData = response.data.map(item => ({
      date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
      link: item.link,
      link_name: item.link_name,
      score: item.score,
      status: item.status_one === 1 ? item.status_two : item.status_one,
      name: item.title,
      category: item.status_one === 1 ? 'overall' : 'personal',
      remarks: item.remarks,
      class: '政治思想道德类'
      }));
    rawData.value.push(...formattedData);
  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }

  try {
    const params = { 'SID': userStore.currentUser.sid, 'table': "morality" };
    const response = await select(params);
    const formattedData = response.data.map(item => ({
      date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
      link: item.link,
      link_name: item.link_name,
      score: item.score,
      status: item.status_one === 1 ? item.status_two : item.status_one,
      name: item.title,
      category: item.status_one === 1 ? 'overall' : 'personal',
      remarks: item.remarks,
      class: '政治思想道德类'
      }));
    rawData.value.push(...formattedData);
  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }


  // // 创建10条示例数据
  // rawData.value = [
  //   { id: 1, class: '政治思想道德类', date: '2023-01-25', name: '全国三好学生', remarks: '', status: 0, category: 'personal' },
  //   { id: 2, class: '政治思想道德类', date: '2023-02-11', name: '全国优秀共青团员', remarks: '材料真实，批准通过', status: 1, category: 'personal' },
  //   { id: 3, class: '社会工作类', date: '2023-03-01', name: '奖项3', remarks: '备注3', status: 0, category: 'personal' },
  //   { id: 4, class: '学习、竞赛及科研成果类', date: '2023-04-01', name: '奖项4', remarks: '备注4', status: 1, category: 'overall' },
  //   { id: 5, class: '政治思想道德类', date: '2023-05-22', name: '校青马班结课', remarks: '材料真实，批准通过', status: 1, category: 'personal' },
  //   { id: 6, class: '文体实践类', date: '2023-06-01', name: '奖项6', remarks: '备注6', status: 2, category: 'overall' },
  //   { id: 7, class: '社会工作类', date: '2023-07-01', name: '奖项7', remarks: '备注7', status: 2, category: 'personal' },
  //   { id: 8, class: '学习、竞赛及科研成果类', date: '2023-08-01', name: '奖项8', remarks: '备注8', status: 2, category: 'overall' },
  //   { id: 9, class: '政治思想道德类', date: '2023-09-27', name: '院优秀团支书', remarks: '材料有误，请重新提交', status: 2, category: 'personal' },
  //   { id: 10, class: '文体实践类', date: '2023-10-01', name: '奖项10', remarks: '备注10', status: 0, category: 'overall' },
  //   { id: 11, class: '政治思想道德类', date: '2023-11-15', name: '校优秀共产党院', remarks: '', status: 0, category: 'overall' },
  //   { id: 12, class: '政治思想道德类', date: '2024-11-09', name: '校三好学生', remarks: '', status: 0, category: 'personal' },
  //   { id: 13, class: '政治思想道德类', date: '2024-12-02', name: '校优秀毕业生', remarks: '材料真实，批准通过', status: 1, category: 'personal' },
  //   { id: 14, class: '政治思想道德类', date: '2024-12-03', name: '校优秀毕业论文', remarks: '材料真实，批准通过', status: 1, category: 'personal' }
  // ];
  
};

// 根据筛选和排序选项处理数据
const filteredData = computed(() => {

  let data = rawData.value;

  // 筛选数据
  if (personalVisible.value) {
    data = data.filter(item => item.category === 'personal');
  } else {
    data = data.filter(item => item.category === 'overall');
  }

  data = data.filter(item => item.class === selectedOption.value);

  return data;
});

// 弹窗显示完整的remarks内容
const showRemarks = (remarks) => {
  dialogContent.value = remarks;
  dialogVisible.value = true;
};

const getStatusText = (status) => {
  if (status === 0) return '待审核';
  if (status === 1) return '已通过';
  if (status === 2) return '已驳回';
};

const getStatusStyle = (status) => {
  if (status === 0) return {color: 'orange'};
  if (status === 1) return {color: 'green'};
  if (status === 2) return {color: 'red'};
};

const getStatusIcon = (status) => {
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

onMounted(() => {
  fetchData();
  updateVisibility();
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
        <el-card v-for="item in filteredData" :key="item.date" class="card" shadow="hover"
                 @click="showRemarks(item.remarks)">
          <div class="card-content">
            <div class="status-icon">
              <img :src="getStatusIcon(item.status)" alt="status icon"/>
            </div>
            <div class="card-text">
              <p class="info-line"><span class="label">类别:&nbsp</span> <span>{{ item.class }}</span></p>
              <p class="info-line"><span class="label">日期:&nbsp</span> <span>{{ item.date }}</span></p>
              <p class="info-line"><span class="label">奖项:&nbsp</span> <span>{{ item.name }}</span></p>
              <p class="info-line"><span class="label">状态:&nbsp</span> <span :style="getStatusStyle(item.status)">{{ getStatusText(item.status) }}</span></p>
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
