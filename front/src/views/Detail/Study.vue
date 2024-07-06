<template>
  <div class="form-container">
    <div class="form-layout">
      <el-form :model="form" label-width="120px" label-position="top">
        <el-form-item label="类内序号">
          <el-select v-model="form.selection" placeholder="请选择" :style="{ width: '35vh' }">
            <el-option label="1 获国际级大学生学习竞赛特等奖等" value="1"></el-option>
            <el-option label="2 获国家级大学生学习竞赛特等奖等" value="2"></el-option>
            <el-option label="3 获省级大学生学习竞赛一等奖等" value="3"></el-option>
            <el-option label="4 获校级大学生学习竞赛一等奖等" value="4"></el-option>
            <el-option label="5 获院级大学生学习竞赛一等奖等" value="5"></el-option>
            <el-option label="6 CCF-A类论文(第一作者)等" value="6"></el-option>
            <el-option label="7 著作(第一作者)等" value="7"></el-option>
            <el-option label="8 发明专利(第一作者)等" value="8"></el-option>
            <el-option label="9 CCF-CSP成绩400-449分等" value="9"></el-option>
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
  awardInfo: '',
  score: ''
});

const cardsData = ref([]);
const selectedCard = ref(null);
const selectedCardMeta = ref({ pid: null, table: '' });

const fetchData = async () => {
  try {
    const params = { 'SID': userStore.currentUser.sid };

    const competitionResponse = await select({ ...params, table: 'competition' });
    const paperResponse = await select({ ...params, table: 'paper' });
    const patentResponse = await select({ ...params, table: 'patent' });
    const copyrightResponse = await select({ ...params, table: 'copyright' });
    const publicationResponse = await select({ ...params, table: 'publication' });

    const filteredCompetitionData = competitionResponse.data
        .filter(item => item.status_one === 1 && item.type === 1)
        .map(item => ({
          pid: item.pid,
          title: item.name,
          date: item.date ? new Date(item.date).toLocaleDateString() : null,
          table: 'competition'
        }));

    const filteredPaperData = paperResponse.data
        .filter(item => item.status_one === 1)
        .map(item => ({
          pid: item.pid,
          title: item.title,
          date: item.publication_date ? new Date(item.publication_date).toLocaleDateString() : null,
          table: 'paper'
        }));

    const filteredPatentData = patentResponse.data
        .filter(item => item.status_one === 1)
        .map(item => ({
          pid: item.pid,
          title: item.title,
          date: item.acceptance_date ? new Date(item.acceptance_date).toLocaleDateString() : null,
          table: 'patent'
        }));

    const filteredCopyrightData = copyrightResponse.data
        .filter(item => item.status_one === 1)
        .map(item => ({
          pid: item.pid,
          title: item.title,
          date: item.date ? new Date(item.date).toLocaleDateString() : null,
          table: 'copyright'
        }));

    const filteredPublicationData = publicationResponse.data
        .filter(item => item.status_one === 1)
        .map(item => ({
          pid: item.pid,
          title: item.title,
          date: item.date ? new Date(item.date).toLocaleDateString() : null,
          table: 'publication'
        }));

    // 合并数据
    cardsData.value = [...filteredCompetitionData, ...filteredPaperData, ...filteredPatentData, ...filteredCopyrightData, ...filteredPublicationData];

    console.log('Competition Data:', filteredCompetitionData);
    console.log('Paper Data:', filteredPaperData);
    console.log('Patent Data:', filteredPatentData);
    console.log('Copyright Data:', filteredCopyrightData);
    console.log('Publication Data:', filteredPublicationData);

  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

const selectCard = (item) => {
  selectedCard.value = item;
  selectedCardMeta.value = {
    pid: item.pid,
    table: item.table
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
