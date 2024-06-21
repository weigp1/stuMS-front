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
      <el-table-column prop="organization" label="评奖组织"/>
      <el-table-column prop="date" label="获奖时间" sortable/>
      <el-table-column prop="title" label="获奖名称"/>
      <el-table-column prop="level" label="成果级别"/>
      <el-table-column prop="rank" label="比赛名次"/>
      <el-table-column prop="team" label="其他参与人员"/>
      <el-table-column prop="link" label="证明材料"/>
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
      添 加
    </el-button>

  </el-row>

  <!--添加弹窗-->
  <el-dialog v-model="dialogFormVisible" title="表单添加-竞赛获奖类" width="500">

    <el-form :model="form">

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
import {reactive, ref} from "vue";
import {Delete} from "@element-plus/icons-vue";
// 默认显示
const ContTableData = ref([

]);

const dialogFormVisible = ref(false);

const deleteRow = (index: number) => {
  ContTableData.value.splice(index, 1);
}

const form = reactive({

});


</script>

<style scoped>

</style>
