<template>
  <div class="form-container">
    <div class="form-layout">
      <el-form :model="form" label-width="120px" label-position="top">
        <el-form-item label="类内序号">
          <el-select v-model="form.selection" placeholder="请选择" :style="{ width: '35vh' }">
            <el-option label="1 全国三好学生等" value="1"></el-option>
            <el-option label="2 全国先进集体一般成员等" value="2"></el-option>
            <el-option label="3 见义勇为受表彰者等" value="3"></el-option>
            <el-option label="4 做社会公益受表彰者等" value="4"></el-option>
            <el-option label="5 省级先进集体一般成员等" value="5"></el-option>
            <el-option label="6 校级马研班优秀学员等" value="6"></el-option>
            <el-option label="7 校级优良学风标兵班其他负责人等" value="7"></el-option>
            <el-option label="8 校级优秀党员等" value="8"></el-option>
            <el-option label="9 校级优良学风标兵班一般成员等" value="9"></el-option>
            <el-option label="10 校级优良学风班一般成员等" value="10"></el-option>
            <el-option label="11 校级文明宿舍成员等" value="11"></el-option>
            <el-option label="12 义务献血者等" value="12"></el-option>
            <el-option label="13 公益类活动等" value="13"></el-option>
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
    const moralityResponse = await select({ ...params, table: 'morality' });
    const volunteerResponse = await select({ ...params, table: 'volunteer' });

    // 过滤并提取 morality 表的所需字段
    const filteredMoralityData = moralityResponse.data
        .filter(item => item.status_one === 1)
        .map(item => ({
          title: item.title,
          date: item.date ? new Date(item.date).toLocaleDateString() : null
        }));

    // 过滤并提取 volunteer 表的所需字段
    const filteredVolunteerData = volunteerResponse.data
        .filter(item => item.status_one === 1)
        .map(item => ({
          title: item.title,
          date: item.date_start ? new Date(item.date_start).toLocaleDateString() : null
        }));

    // 合并数据
    cardsData.value = [...filteredMoralityData, ...filteredVolunteerData];

    console.log('Morality Data:', filteredMoralityData);
    console.log('Volunteer Data:', filteredVolunteerData);

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
