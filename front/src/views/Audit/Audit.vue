<script setup>
import {ref, computed, onMounted, watch} from 'vue';
import TopBar from "../../components/TopBar.vue";
import { ElCard, ElDialog, ElSelect, ElOption } from 'element-plus';
import {useRoute} from "vue-router";

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

// 模拟数据加载
const fetchData = () => {
  // 创建10条示例数据
  rawData.value = [
    { id: 1, class: '政治思想道德类', date: '2023-01-01', name: '奖项1', remarks: '备注1', status: 0, category: 'personal' },
    { id: 2, class: '政治思想道德类', date: '2023-02-01', name: '奖项2', remarks: '备注2', status: 1, category: 'personal' },
    { id: 3, class: '社会工作类', date: '2023-03-01', name: '奖项3', remarks: '备注3', status: 0, category: 'personal' },
    { id: 4, class: '学习、竞赛及科研成果类', date: '2023-04-01', name: '奖项4', remarks: '备注4', status: 1, category: 'overall' },
    { id: 5, class: '政治思想道德类', date: '2023-05-01', name: '奖项5', remarks: '备注555', status: 1, category: 'personal' },
    { id: 6, class: '文体实践类', date: '2023-06-01', name: '奖项6', remarks: '备注6', status: 2, category: 'overall' },
    { id: 7, class: '社会工作类', date: '2023-07-01', name: '奖项7', remarks: '备注7', status: 2, category: 'personal' },
    { id: 8, class: '学习、竞赛及科研成果类', date: '2023-08-01', name: '奖项8', remarks: '备注8', status: 2, category: 'overall' },
    { id: 9, class: '政治思想道德类', date: '2023-09-01', name: '奖项9', remarks: '备注99999', status: 2, category: 'personal' },
    { id: 10, class: '文体实践类', date: '2023-10-01', name: '奖项10', remarks: '备注10', status: 0, category: 'overall' },
    { id: 11, class: '政治思想道德类', date: '2023-11-01', name: '奖项11', remarks: '备注1111', status: 0, category: 'overall' },
    { id: 12, class: '政治思想道德类', date: '2024-11-01', name: '奖项12', remarks: '备注123331', status: 0, category: 'personal' }
  ];
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
        <el-card v-for="item in filteredData" :key="item.id" class="card" shadow="hover"
                 @click="showRemarks(item.remarks)">
          <div class="card-content">
            <div class="status-icon">
              <img :src="getStatusIcon(item.status)" alt="status icon"/>
            </div>
            <div class="card-text">
              <p>类别: {{ item.class }}</p>
              <p>日期: {{ item.date }}</p>
              <p>奖项: {{ item.name }}</p>
              <p :style="getStatusStyle(item.status)">状态: {{ getStatusText(item.status) }}</p>
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
  min-height: 100vh;
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

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
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
}

.card p {
  margin: 0.5rem 0;
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
