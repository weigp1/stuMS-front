<template>
  <el-row>
    <el-table
        :data="MoraTableData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="title" label="奖项名"/>
      <el-table-column prop="date" label="获奖时间" sortable/>
      <el-table-column prop="link" label="证明材料">
        <template #default="scope">
          <a :href="scope.row.link" target="_blank">下 载 </a>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"/>

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
      添 加
    </el-button>
  </el-row>

  <!--添加弹窗-->
  <el-dialog v-model="dialogFormVisible" title="表单添加-思想道德类" width="500">

    <el-form :model="form">

      <el-form-item label="奖项名" label-width="100px">
        <el-input v-model="form.title" autocomplete="off" style="width: 60%"/>
      </el-form-item>

      <el-form-item label="获奖时间" label-width="100px">
          <el-date-picker
              v-model="form.date"
              type="date"
              label="date"
              placeholder=""
              style="width: 60%"
          />
      </el-form-item>

      <el-form-item label="证明材料" label-width="100px">
        <el-input v-model="form.link" autocomplete="off" style="width: 60%"/>
      </el-form-item>

      <el-form-item  label="备注" label-width="100px">
        <el-input v-model="form.remark" autocomplete="off" style="width: 60%"/>
      </el-form-item>

    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
            type="primary"
            @click="dialogFormVisible = false">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { Delete } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";

// 默认显示
const MoraTableData = ref([
  {
    title: '全国三好学生',
    date: '2022-08-22',
    link: 'https://123.com',
    remark: '颁奖日期为08-27'
  },
  {
    title: '省级三好学生',
    date: '2022-05-22',
    link: 'https://123.com',
    remark: '颁奖日期为06-01'
  },
  {
    title: '校级优秀共青团员',
    date: '2024-05-04',
    link: 'https://123.com',
    remark: '无'
  },
]);

const deleteRow = (index: number) => {
  MoraTableData.value.splice(index, 1);
};

const dialogFormVisible = ref(false);

const form = reactive({
  title: '',
  date: '',
  link: '',
  remark: ''
});

</script>

<style scoped>
</style>
