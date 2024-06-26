<script setup>
import { ref, computed, onMounted } from 'vue';
import TopBar from "../../components/TopBar.vue";
import { ElTable, ElTableColumn, ElDialog } from 'element-plus';

// 模拟从数据库读取的数据
const rawData = ref([]);

// 筛选和排序选项
const selectedOption = ref('政治思想道德类');
const sortBy = ref('time');
const selectedCategory = ref('personal');

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
    { id: 10, class: '文体实践类', date: '2023-10-01', name: '奖项10', remarks: '备注10', status: 0, category: 'overall' }
  ];
};

// 根据筛选和排序选项处理数据
const filteredData = computed(() => {
  let data = rawData.value;

  // 根据选中的类别过滤数据
  if (selectedCategory.value === 'personal') {
    data = data.filter(item => item.category === 'personal');
  } else if (selectedCategory.value === 'overall') {
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
  if (status === 0) return { color: 'black' };
  if (status === 1) return { color: 'green' };
  if (status === 2) return { color: 'red' };
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="box">
    <TopBar />
    <br>
    <br>
    <br>
    <br>
    <div class="content">
      <div class="filter-bar">
        <button @click="selectedCategory = 'personal'" :class="{ active: selectedCategory === 'personal' }">个人成绩</button>
        <button @click="selectedCategory = 'overall'" :class="{ active: selectedCategory === 'overall' }">综测成绩</button>
      </div>

      <div class="options">
        <select v-model="selectedOption">
          <option value="政治思想道德类">政治思想道德类</option>
          <option value="文体实践类">文体实践类</option>
          <option value="社会工作类">社会工作类</option>
          <option value="学习、竞赛及科研成果类">学习、竞赛及科研成果类</option>
        </select>
      </div>

      <el-table :data="filteredData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="class" label="类别" width="200"></el-table-column>
        <el-table-column prop="date" label="日期" sortable width="200"></el-table-column>
        <el-table-column prop="name" label="奖项" width="800"></el-table-column>
        <el-table-column prop="status" label="状态" sortable width="100">
          <template #default="scope">
            <span :style="getStatusStyle(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="审核意见" width="100">
          <template #default="scope">
            <div>
              <label v-if="scope.row.remarks.length > 3" @click="showRemarks(scope.row.remarks)">....</label>
              <span v-else>{{ scope.row.remarks }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="options" label="操作" width="100"></el-table-column>
      </el-table>

      <el-dialog v-model="dialogVisible" title="审核意见">
        <p>{{ dialogContent }}</p>
      </el-dialog>

    </div>
  </div>
</template>

<style scoped>
.box {
  height: 100vh;
  background-image: url("../../assets/background.jpg");
}

.content {
  padding: 1rem;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.filter-bar button {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
}

.filter-bar button.active {
  background-color: #007bff;
  color: white;
}

.options {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.options select {
  margin-right: 1rem;
}


.radio-group label {
  margin-right: 1rem;
}

label {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
</style>
