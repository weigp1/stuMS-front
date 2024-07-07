<template>
  <div class="form-container">
    <div class="form-layout">
      <el-form :model="form" label-width="120px" label-position="top">
        <el-form-item label="类内序号">
          <el-select v-model="form.selection" placeholder="请选择" :style="{ width: '35vh' }">
            <el-option label="1 院团委副书记等" value="1"></el-option>
            <el-option label="2 校学生会主席团成员等" value="2"></el-option>
            <el-option label="3 校学生会部门主要负责人等" value="3"></el-option>
            <el-option label="4 校学生会部门第二负责人等" value="4"></el-option>
            <el-option label="5 学院社团部门主要负责人等" value="5"></el-option>
            <el-option label="6 校级马研班优秀学员等" value="6"></el-option>
            <el-option label="7 校学生会工作人员等" value="7"></el-option>
            <el-option label="8 班委委员等" value="8"></el-option>
            <el-option label="9 新生朋辈领航员等" value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申报分值" label-position="top" :style="{ width: '35vh' }">
          <el-input v-model="form.score" :style="{ width: '100%' }"></el-input>
        </el-form-item>
        <span style="display: flex; justify-content: center; position: relative;">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="() => switchScene(1)">返回</el-button>
        </span>
      </el-form>
    </div>

    <div class="info-layout">
      <div v-if="!selectedCard" class="info-placeholder">请选择申报的综测项</div>
      <div v-else class="info-details">
        <p class="info-title">已选择进行申报的综测项：</p>
        <el-card class="selected-card-layout">
          <p>奖项名：{{ selectedCard.title }}</p>
          <p>(开始)时间：{{ selectedCard.date }}</p>
        </el-card>
      </div>
    </div>
  </div>

  <div class="cards-container">
    <el-row :gutter="20" type="flex" align="middle">
      <el-col :span="8" v-for="(item, index) in cardsData" :key="index">
        <el-card class="card-layout" @click="selectCard(item)">
          <div>
            <p>奖项名：{{ item.title }}</p>
            <p>(开始)时间：{{ item.date }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import {select, submit_idx_score, submit_status2} from '../../api/api.js';
import { UserStore } from '../../stores/user.js';
import { ElMessage } from "element-plus";

const userStore = UserStore();

const form = reactive({
  selection: '',
  score: ''
});

const cardsData = ref([]);
const selectedCard = ref(null);
const selectedCardMeta = ref({ pid: null, table: '' });

const fetchData = async () => {
  try {
    const params = { 'SID': userStore.currentUser.sid };
    const socialWorkResponse = await select({ ...params, table: 'socialwork' });

    // 过滤并提取 SocialWork 表的所需字段
    const filteredSocialWorkData = socialWorkResponse.data
        .filter(item => item.status_one === 1)
        .map(item => ({
          pid: item.pid,
          title: item.title,
          date: item.date_start ? new Date(item.date_start).toLocaleDateString() : null
        }));

    // 赋值给 cardsData
    cardsData.value = filteredSocialWorkData;

    console.log('SocialWork Data:', filteredSocialWorkData);

  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

const selectCard = (item) => {
  selectedCard.value = item;
  selectedCardMeta.value = {
    pid: item.pid,
    table: 'socialwork'
  };
};

const submitForm = async () => {
  if (!selectedCardMeta.value.pid || !form.selection || !form.score) {
    console.log("pid: ", selectedCardMeta.value.pid)
    console.log("idx: ", form.selection)
    console.log("score: ", form.score)
    console.error('表单数据不完整');
    return;
  }

  const updateParams = {
    PID: selectedCardMeta.value.pid,
    SID: userStore.currentUser.sid,
    idx: parseInt(form.selection, 10),
    score: parseFloat(form.score),
    table: selectedCardMeta.value.table
  };

  const updateStatus = {
    PID: selectedCardMeta.value.pid,
    SID: userStore.currentUser.sid,
    status_two: 0,
    table: selectedCardMeta.value.table
  };

  let response1 = await submit_idx_score({ ...updateParams });
  let response2 = await submit_status2({ ...updateStatus });

  const code1 = response1.code;
  const code2 = response2.code;

  if (code1 === 200 && code2 === 200){
    ElMessage.success('提交成功, 如需修改请联系管理员');
    console.log('表单提交成功', form);

    // 清除输入框的值
    form.selection = '';
    form.score = '';
    selectedCard.value = null;
    selectedCardMeta.value = { pid: null, table: '' };

  } else {
    ElMessage.error('提交失败，请重新尝试！');
  }
};

onMounted(fetchData);

defineProps<{
  switchScene: (scene: number) => void;
}>();

</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2%;
  width: 65vw;
  top: 10vh;
  margin: 0 auto;
}

.form-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  width: 65vh;
  height: 30vh;
  border-radius: 10px;
}

.info-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65vh;
  height: 30vh;
  border-radius: 10px;
  background-color: rgba(240, 240, 240, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 2%;
  position: relative;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  top: 15vh;
  width: 80%;
  margin: 0 auto;
}

.card-layout{
  width: 40vh;
  min-width: 40vh;
  border-radius: 20px;
  height: 100%;
  margin: 15px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card-layout:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.9);
}

.info-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #aaa;
}

.info-details {
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
}

.info-title {
  position: absolute;
  top: 30px;
  left: 60px;
}

.selected-card-layout{
  width: 40vh;
  min-width: 40vh;
  border-radius: 20px;
}

@media (max-width: 1200px) {
  .form-container {
    flex-direction: column;
    align-items: center;
  }

  .form-layout, .info-layout {
    width: 80%;
    margin: 10px 0;
  }
}

@media (max-width: 768px) {
  .form-layout, .info-layout {
    width: 90%;
    padding: 10%;
  }
}

@media (max-width: 480px) {
  .form-layout, .info-layout {
    width: 100%;
    padding: 15%;
  }
}
</style>
