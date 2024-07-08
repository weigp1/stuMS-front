<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { ElCard, ElDialog, ElSelect, ElOption } from 'element-plus';
import { useRoute } from "vue-router";
import { UserStore } from '../../stores/user.js';
import { select } from '../../api/api.js';
import { format } from "date-fns";
import { fileUrl } from '../../api/resource.js';
// 导入图标
import YesIcon from '../../assets/status/Yes.png';
import WaitIcon from '../../assets/status/Wait.png';
import NoIcon from '../../assets/status/No.png';
import TopBar from "../../components/TopBar.vue";

// 模拟从数据库读取的数据
const rawData = ref([]);

// personalVisible=true 表示读取个人信息，即category='personal'
const personalVisible = ref(false);

// 筛选和排序选项
const selectedOption = ref('政治思想道德');

// 选项数据
const options = ref([
  { value: '政治思想道德', label: '政治思想道德' },
  { value: '社会工作', label: '社会工作' },
  { value: '竞赛成果', label: '竞赛成果' },
  { value: '论文成果', label: '论文成果' },
  { value: '专利成果', label: '专利成果' },
  { value: '软件著作权', label: '软件著作权' },
  { value: '专著出版', label: '专著出版' },
]);

// 弹窗控制和内容
const dialogVisible = ref(false);
const dialogContent = ref('');
const userStore = UserStore();

const categories = [
  { table: "morality", class: "政治思想道德" },
  { table: "volunteer", class: "政治思想道德" },
  { table: "socialwork", class: "社会工作" },
  { table: "competition", class: "竞赛成果" },
  { table: "paper", class: "论文成果" },
  { table: "patent", class: "专利成果" },
  { table: "copyright", class: "软件著作权" },
  { table: "publication", class: "专著出版" },
];

// 根据所选类别获取数据
const fetchData = async (categoryClass) => {
  try {
    rawData.value = [];
    const selectedCategories = categories.filter(category => category.class === categoryClass);
    for (const category of selectedCategories) {
      const params = { 'SID': userStore.currentUser.sid, 'table': category.table };
      const response = await select(params);
      const formattedData = response.data.map(item => ({
        ...item,
        date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
        link: item.link,
        link_name: item.link_name,
        score: item.score,
        status: item.status_two === 0 ? item.status_two : item.status_one,
        name: item.title,
        category: item.status_two === 0 ? 'overall' : 'personal',
        comment: item.comment,
        class: category.class
      }));
      rawData.value.push(...formattedData);
    }
  } catch (error) {
    console.error(error);
  }
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

  return data;
});

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

// 监听 route.query.category 的变化
watch(() => route.query.category, (newCategory) => {
  updateVisibility();
  fetchData(selectedOption.value);
});

onMounted(() => {
  updateVisibility();
  fetchData(selectedOption.value);
});

// 弹窗显示完整的remarks内容
const showRemarks = (comment) => {
  dialogContent.value = comment;
  dialogVisible.value = true;
};

const handleDownload = async (link) => {
  const url = await fileUrl('credential', link);
  window.open(url, '_blank');
};

</script>

<template>
  <div class="box">
    <TopBar></TopBar>
    <div class="content">
      <div class="filter-bar">
        <el-select v-model="selectedOption" filterable placeholder="请选择" @change="fetchData(selectedOption)">
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
        <el-card v-for="item in filteredData" :key="item.date" class="card" shadow="hover">
          <div class="card-content">
            <div class="status-icon">
              <img :src="getStatusIcon(item.status)" alt="status icon" />
            </div>
            <div class="card-text">
              <p class="info-line"><span class="label">类别:&nbsp</span> <span>{{ item.class }}</span></p>
              <p class="info-line"><span class="label">日期:&nbsp</span> <span>{{ item.date }}</span></p>
              <p class="info-line"><span class="label">奖项:&nbsp</span> <span>{{ item.name }}</span></p>
              <p class="info-line">
                <span class="label">
                  <el-button type="primary" @click="showRemarks(item.comment)" style="font-size: 1.9vh;margin-top: 0.5vh;">审核意见</el-button>
                </span> 
                <span>
                <el-button type="primary" @click="handleDownload(item.link)" style="font-size: 1.9vh;margin-top: 0.5vh;">证明材料</el-button>
                </span>
              </p>
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
  width: 100%;
  min-height: 150vh; /* 确保背景图至少覆盖整个视口高度 */
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
  margin-left: -3vh;
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
  justify-content: center;
  
}

.card-text .info-line {
  width: 25vh;
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
