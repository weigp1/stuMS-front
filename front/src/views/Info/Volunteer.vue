<template>
  <el-row>
    <el-table
        :data="VolTableData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="title" label="活动全称"/>
      <el-table-column prop="organization" label="组织团体"/>
      <el-table-column prop="type" label="活动类型"/>
      <el-table-column prop="date_start" label="开始时间" sortable/>
      <el-table-column prop="date_end" label="结束时间" sortable/>
      <el-table-column prop="duration" label="志愿时长" sortable/>
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

  <!--添加弹窗-->
  <el-dialog v-model="dialogFormVisible" title="表单添加-志愿服务类" width="460">

    <el-form :model="form" label-width="120px" label-position="top">

      <el-form-item label="志愿活动名称">
        <el-input v-model="form.title" placeholder="请填写志愿活动名称"/>
      </el-form-item>

      <el-form-item label="志愿组织团体">
        <el-input v-model="form.organization" placeholder="请填写志愿组织团体"/>
      </el-form-item>

      <el-form-item label="活动类型">
        <el-select v-model="form.type" placeholder="请选择活动类型">
          <el-option label="助学支教" value="助学支教"/>
          <el-option label="文化文艺服务" value="文化文艺服务"/>
          <el-option label="科学普及" value="科学普及"/>
          <el-option label="理论政策宣讲" value="理论政策宣讲"/>
          <el-option label="敬老服务" value="敬老服务"/>
          <el-option label="助残服务" value="助残服务"/>
          <el-option label="文明交通" value="文明交通"/>
          <el-option label="卫生环保" value="卫生环保"/>
          <el-option label="扶贫帮困" value="扶贫帮困"/>
          <el-option label="体育活动" value="体育活动"/>
          <el-option label="迎新活动" value="迎新活动"/>
          <el-option label="三下乡" value="三下乡"/>
          <el-option label="会务工作" value="会务工作"/>
          <el-option label="医疗服务" value="医疗服务"/>
          <el-option label="其他" value="其他"/>
        </el-select>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-date-picker v-model="form.date_start" type="date" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间">
        <el-date-picker v-model="form.date_end" type="date" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="志愿服务时长">
        <el-input v-model="form.duration" placeholder="请填写志愿服务时长（小时）"/>
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

const VolTableData = ref([
  // Sample data, replace with your actual data
  {
    title: '志愿活动名称示例',
    organization: '组织团体示例',
    type: '其他',
    date_start: '2022-01-01',
    date_end: '2022-01-07',
    duration: '20.5',
    link_name: '证明材料文件名示例',
    link: 'https://example.com',
    remarks: '无'
  }
]);

const dialogFormVisible = ref(false);

const form = reactive({
  title: '',
  organization: '',
  type: '',
  date_start: '',
  date_end: '',
  duration: '',
  link_name: '',
  link: '',
  remarks: ''
});

const deleteRow = (index: number) => {
  VolTableData.value.splice(index, 1);
};

const addRow = () => {
  VolTableData.value.push({ ...form });
  resetForm();
};

const resetForm = () => {
  form.title = '';
  form.organization = '';
  form.type = '';
  form.date_start = '';
  form.date_end = '';
  form.duration = '';
  form.link_name = '';
  form.link = '';
  form.remarks = '';
};

</script>

<style scoped>
</style>
