<template>
  <el-row>
    <el-table
        :data="ContTableData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="name" label="比赛名称"/>
      <el-table-column prop="organization" label="评奖组织单位"/>
      <el-table-column prop="date" label="获奖时间" sortable/>
      <el-table-column prop="title" label="获奖名称"/>
      <el-table-column prop="level" label="成果级别"/>
      <el-table-column prop="rank" label="比赛名次"/>
      <el-table-column prop="team" label="其他参与人员"/>
      <el-table-column prop="link" label="证明材料">
        <template #default="scope">
          <a :href="scope.row.link" target="_blank">查看</a>
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
      添加
    </el-button>

  </el-row>

  <!-- 添加弹窗 -->
  <el-dialog v-model="dialogFormVisible" title="表单添加-竞赛获奖类" width="460">

    <el-form :model="form" label-width="120px" label-position="top">

      <el-form-item label="比赛类别">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option label="学科竞赛" value="学科竞赛"></el-option>
          <el-option label="文娱比赛" value="文娱比赛"></el-option>
          <el-option label="体育比赛" value="体育比赛"></el-option>
          <el-option label="实践活动" value="实践活动"></el-option>
          <el-option label="征文比赛" value="征文比赛"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
        <span style="font-size: 12px;">请严格按照比赛通知、奖状信息填写</span>
      </el-form-item>

      <el-form-item label="比赛名称">
        <el-input v-model="form.name" placeholder="请填写比赛名称"/>
        <span style="font-size: 12px;">请严格按照比赛通知、奖状信息填写，含比赛年份、届别、地区等信息</span>
      </el-form-item>

      <el-form-item label="评奖组织单位">
        <el-input v-model="form.organization" placeholder="请填写评奖组织单位"/>
      </el-form-item>

      <el-form-item label="获奖时间">
        <el-date-picker v-model="form.date" placeholder="选择时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="获奖名称">
        <el-input v-model="form.title" placeholder="请填写获奖名称"/>
        <span style="font-size: 12px;">请严格按照奖状信息填写，如有，请注明地区、组别等信息</span>
      </el-form-item>

      <el-form-item label="成果级别">
        <el-select v-model="form.level" placeholder="请选择">
          <el-option label="国际级" value="国际级"></el-option>
          <el-option label="国家级" value="国家级"></el-option>
          <el-option label="省部级" value="省部级"></el-option>
          <el-option label="校级" value="校级"></el-option>
          <el-option label="院级" value="院级"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
        <span style="font-size: 12px;">全国性行业协会主办赛事等同省部级</span>
      </el-form-item>

      <el-form-item label="比赛名次">
        <el-select v-model="form.rank" placeholder="请选择">
          <el-option label="特等奖" value="特等奖"></el-option>
          <el-option label="一等奖" value="一等奖"></el-option>
          <el-option label="二等奖" value="二等奖"></el-option>
          <el-option label="三等奖" value="三等奖"></el-option>
          <el-option label="冠军" value="冠军"></el-option>
          <el-option label="亚军" value="亚军"></el-option>
          <el-option label="季军" value="季军"></el-option>
          <el-option label="金奖" value="金奖"></el-option>
          <el-option label="银奖" value="银奖"></el-option>
          <el-option label="铜奖" value="铜奖"></el-option>
          <el-option label="第一名" value="第一名"></el-option>
          <el-option label="第二名" value="第二名"></el-option>
          <el-option label="第三名" value="第三名"></el-option>
          <el-option label="第四名" value="第四名"></el-option>
          <el-option label="第五名" value="第五名"></el-option>
          <el-option label="第六名" value="第六名"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
        <span style="font-size: 12px;">冠军、金牌等同于第一名，亚军、银牌等同于第二名，季军、铜牌等同于第三名</span>
      </el-form-item>

      <el-form-item label="其他参与人员">
        <el-input v-model="form.team" placeholder="请填写其他参与人员"/>
        <span style="font-size: 12px;">姓名+学院，如小红+21310000、小明+21310001，没有就填“无”</span>
      </el-form-item>

      <el-form-item label="证明材料文件名">
        <el-input v-model="form.link_name" placeholder="请填写证明材料文件名"/>
      </el-form-item>

      <el-form-item label="证明材料（链接形式）">
        <el-input v-model="form.link" placeholder="请填写证明材料的链接"/>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.remarks" type="textarea" maxlength="50" show-word-limit placeholder="请输入备注，限制最长50字"/>
      </el-form-item>

    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false; addRow()">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';

const ContTableData = ref([
  // Sample data, replace with your actual data
  {
    name: '数学建模竞赛',
    organization: '中国大学生数学建模竞赛组委会',
    date: '2023-05',
    title: '一等奖',
    level: '校级',
    rank: '一等奖',
    team: '小红+21310000、小明+21310001',
    link_name: '证明材料文件名',
    link: 'https://example.com',
    remarks: '无'
  }
]);

const dialogFormVisible = ref(false);

const form = reactive({
  type: '',
  name: '',
  organization: '',
  date: '',
  title: '',
  level: '',
  rank: '',
  team: '',
  link_name: '',
  link: '',
  remarks: ''
});

const deleteRow = (index: number) => {
  ContTableData.value.splice(index, 1);
};

const addRow = () => {
  ContTableData.value.push({ ...form });
  resetForm();
};

const resetForm = () => {
  form.type = '';
  form.name = '';
  form.organization = '';
  form.date = '';
  form.title = '';
  form.level = '';
  form.rank = '';
  form.team = '';
  form.link_name = '';
  form.link = '';
  form.remarks = '';
};

</script>

<style scoped>

</style>
