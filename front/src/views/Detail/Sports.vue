<template>
  <div class="form-container">
    <div class="form-layout">
      <el-form :model="form" label-width="120px" label-position="top">
        <el-form-item label="类内序号">
          <el-select v-model="form.selection" placeholder="请选择" :style="{ width: '35vh' }">
            <el-option label="1 获国际级体育比赛第1名等" value="1"></el-option>
            <el-option label="2 获国家级体育比赛第1名等" value="2"></el-option>
            <el-option label="3 获省市级体育比赛第1名等" value="3"></el-option>
            <el-option label="4 获校级体育比赛第1名等" value="4"></el-option>
            <el-option label="5 获校区级体育比赛第1名等" value="5"></el-option>
            <el-option label="6 获院级体育比赛第1名等" value="6"></el-option>
            <el-option label="7 参加学院组织或指定的集体活动等" value="7"></el-option>
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
import { select } from '../../api/api.js';
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
    const competitionResponse = await select({ ...params, table: 'competition' });

    // 过滤并提取 competition 表的所需字段
    const filteredCompetitionData = competitionResponse.data
        .filter(item => item.status_one === 1)
        .map(item => ({
          title: item.title,
          date: item.date_start ? new Date(item.date_start).toLocaleDateString() : null
        }));

    // 赋值给 cardsData
    cardsData.value = filteredCompetitionData;

    console.log('Competition Data:', filteredCompetitionData);

  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

const selectCard = (item) => {
  selectedCard.value = item;
  selectedCardMeta.value = {
    pid: item.pid,
    table: 'competition'
  };
};

const submitForm = async () => {
  // if (!selectedCardMeta.value.pid || !form.selection || !form.score) {
  //   console.error('表单数据不完整');
  //   return;
  // }
  //
  // try {
  //   const updateParams = {
  //     PID: selectedCardMeta.value.pid,
  //     idx: form.selection,
  //     score: form.score
  //   };
  //
  //   const response = await update({ ...updateParams, table: selectedCardMeta.value.table });
  //
  //   if (response === 1){
  //     ElMessage.success('提交成功, 如需修改请联系管理员');
  //     console.log('表单提交成功', form);
  //     alert('提交成功');
  //   } else {
  //     ElMessage.error('提交失败，请重新尝试！');
  //   }
  // } catch (error) {
  //   console.error('表单提交失败', error);
  //   alert('提交失败');
  // }
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
  height: 26vh;
  border-radius: 10px;
}

.info-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65vh;
  height: 26vh;
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
