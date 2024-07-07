<template>
  <el-row>
    <el-table
        :data="ScoreTableData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="date" label="学年" sortable/>
      <el-table-column prop="gpa" label="平均学分绩点"/>
      <el-table-column prop="gpa_rank" label="绩点排名" sortable/>
      <el-table-column prop="cep" label="综测加分"/>
      <el-table-column prop="ce" label="综测分数"/>
      <el-table-column prop="ce_rank" label="综测排名" sortable/>
    </el-table>
  </el-row>

</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
  import { select } from '../../api/api.js';
  import {UserStore} from '../../stores/user.js';
  const userStore = UserStore()

  // 默认显示
  const ScoreTableData = ref([
    // {
    //   date: '2021',
    //   gpa: 4.07,
    //   gpa_rank: 12,
    //   cep: 3.52,
    //   ce: 4.422,
    //   ce_rank: 2,
    // },
    // {
    //   date: '2022',
    //   gpa: 4.23,
    //   gpa_rank: 2,
    //   cep: 2.02,
    //   ce: 4.432,
    //   ce_rank: 1,
    // },
    // {
    //   date: '2023',
    //   gpa: 4.57,
    //   gpa_rank: 1,
    //   cep: 7.93,
    //   ce: 5.363,
    //   ce_rank: 1,
    // },
  ]);

const form = reactive({
  pid: "",


});


</script>

<style scoped>

</style>
