<template>
  <el-row>
    <el-table
        :data="PaperTableData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="title" label="论文标题"/>
      <el-table-column prop="type" label="论文类型"/>
      <el-table-column prop="publish" label="发表期刊/会议"/>
      <el-table-column prop="author_level" label="作者类型"/>
      <el-table-column prop="authors" label="全部作者"/>
      <el-table-column prop="cor_author" label="通讯作者"/>
      <el-table-column prop="issn_cn" label="ISSN/CN"/>
      <el-table-column prop="factor" label="影响因子"/>
      <el-table-column prop="published_status" label="发表状态"/>
      <el-table-column prop="submission_date" label="投稿日期" sortable/>
      <el-table-column prop="received_date" label="接收日期" sortable/>
      <el-table-column prop="publication_date" label="发表日期" sortable/>
      <el-table-column prop="range" label="卷/期/页码范围"/>
      <el-table-column prop="doi_pmid" label="DOI/PMID"/>
      <el-table-column prop="CCF" label="CCF推荐情况"/>
      <el-table-column prop="partition" label="中科院分区"/>
      <el-table-column prop="inclusion" label="期刊收录情况"/>
      <el-table-column prop="publisher" label="出版单位"/>
      <el-table-column prop="language" label="论文语言"/>
      <el-table-column prop="award_flag" label="是否获最佳论文奖"/>
      <el-table-column prop="co_one" label="是否国际合作"/>
      <el-table-column prop="co_two" label="是否本单位合作"/>
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
  <el-dialog v-model="dialogFormVisible" title="表单添加-论文发表" width="500">

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
import { Delete } from "@element-plus/icons-vue";
// 默认显示
const PaperTableData = ref([

]);

const deleteRow = (index: number) => {
  PaperTableData.value.splice(index, 1);
};

const dialogFormVisible = ref(false);

const form = reactive({

});
</script>

<style scoped>

</style>
