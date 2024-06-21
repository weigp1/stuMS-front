<template>
  <el-row>
    <el-table
        :data="OverseasExchangeData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="title" label="项目名称"/>
      <el-table-column prop="type" label="事由类型"/>
      <el-table-column prop="funding_source" label="经费来源"/>
      <el-table-column prop="country" label="前往国家/地区"/>
      <el-table-column prop="city" label="前往城市"/>
      <el-table-column prop="institution" label="前往院校/机构名称"/>
      <el-table-column prop="duration" label="项目期限"/>
      <el-table-column prop="date_start" label="出发时间" sortable/>
      <el-table-column prop="date_end" label="返校时间" sortable/>
      <el-table-column prop="current_status" label="目前状态"/>
      <el-table-column prop="flag1" label="是否已完成申报/报备"/>
      <el-table-column prop="flag2" label="是否已参加行前教育"/>
      <el-table-column prop="flag3" label="是否已签订承诺书"/>
      <el-table-column prop="flag4" label="是否已开展谈心谈话"/>
      <el-table-column prop="link_name" label="证明材料文件名"/>
      <el-table-column prop="link" label="证明材料">
        <template #default="scope">
          <a :href="scope.row.link" target="_blank">下 载 </a>
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
      添 加
    </el-button>
  </el-row>

  <!--添加弹窗-->
  <el-dialog v-model="dialogFormVisible" title="表单添加-赴外交流" width="460">
    <el-form :model="form" label-width="90px" label-position="top" class="centered-form">

      <el-form-item label="项目名称">
        <el-input v-model="form.title" autocomplete="off" style="width: 100%" placeholder="请输入项目名称"/>
      </el-form-item>

      <el-form-item label="事由类型">
        <el-select v-model="form.type" placeholder="请选择事由类型" style="width: 100%">
          <el-option label="交换项目" value="交换项目"></el-option>
          <el-option label="学术会议" value="学术会议"></el-option>
          <el-option label="短期学术交流" value="短期学术交流"></el-option>
          <el-option label="短期课程" value="短期课程"></el-option>
          <el-option label="汉语教师志愿者" value="汉语教师志愿者"></el-option>
          <el-option label="实习" value="实习"></el-option>
          <el-option label="竞赛" value="竞赛"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
        <span style="font-size: 12px;">若“事由类型”选其他，请在备注中填写</span>
      </el-form-item>

      <el-form-item label="经费来源">
        <el-input v-model="form.funding_source" autocomplete="off" style="width: 100%" placeholder="请输入经费来源"/>
      </el-form-item>

      <el-form-item label="前往国家/地区">
        <el-input v-model="form.country" autocomplete="off" style="width: 100%" placeholder="请输入前往国家/地区"/>
      </el-form-item>

      <el-form-item label="前往城市">
        <el-input v-model="form.city" autocomplete="off" style="width: 100%" placeholder="请输入前往城市"/>
      </el-form-item>

      <el-form-item label="前往院校/机构名称">
        <el-input v-model="form.institution" autocomplete="off" style="width: 100%" placeholder="请输入前往院校/机构名称"/>
      </el-form-item>

      <el-form-item label="项目期限">
        <el-select v-model="form.duration" placeholder="请选择项目期限" style="width: 100%">
          <el-option label="长期（180天以上）" value="长期（180天以上）"></el-option>
          <el-option label="短期（180天以下）" value="短期（180天以下）"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="出发时间">
        <el-date-picker
            v-model="form.date_start"
            type="date"
            placeholder="请选择出发时间"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="返校时间">
        <el-date-picker
            v-model="form.date_end"
            type="date"
            placeholder="请选择返校时间"
            style="width: 100%"
        />
        <el-checkbox v-model="form.is_still" label="至今">至今</el-checkbox>
      </el-form-item>

      <el-form-item label="目前状态">
        <el-select v-model="form.current_status" placeholder="请选择目前状态" style="width: 100%">
          <el-option label="已返校" value="已返校"></el-option>
          <el-option label="在外" value="在外"></el-option>
          <el-option label="即将赴外" value="即将赴外"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否已完成申报/报备">
        <el-radio-group v-model="form.flag1" style="width: 100%">
          <el-radio label="是">是</el-radio>
          <el-radio label="否">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否已参加行前教育">
        <el-radio-group v-model="form.flag2" style="width: 100%">
          <el-radio label="是">是</el-radio>
          <el-radio label="否">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否已签订承诺书">
        <el-radio-group v-model="form.flag3" style="width: 100%">
          <el-radio label="是">是</el-radio>
          <el-radio label="否">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否已开展谈心谈话">
        <el-radio-group v-model="form.flag4" style="width: 100%">
          <el-radio label="是">是</el-radio>
          <el-radio label="否">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="证明材料文件名">
        <el-input v-model="form.link_name" autocomplete="off" style="width: 100%" placeholder="请输入证明材料文件名"/>
      </el-form-item>

      <el-form-item label="证明材料">
        <el-input v-model="form.link" autocomplete="off" style="width: 100%" placeholder="请输入证明材料的链接"/>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.remarks" type="textarea" autocomplete="off" maxlength="50" show-word-limit style="width: 100%" placeholder="选填，限制最长50字"/>
        <span style="font-size: 12px;">若“事由类型”选其他，请在备注中填写</span>
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
const OverseasExchangeData = ref([
  {
    title: '交换项目',
    type: '交换项目',
    funding_source: '校内资助',
    country: '美国',
    city: '纽约',
    institution: '纽约大学',
    duration: '长期（180天以上）',
    date_start: '2023-01-01',
    date_end: '2023-12-31',
    current_status: '已返校',
    flag1: '是',
    flag2: '是',
    flag3: '是',
    flag4: '是',
    link_name: '交换项目证明',
    link: 'https://example.com/exchange1',
    remarks: '无'
  },
  // 更多数据...
]);

const deleteRow = (index: number) => {
  OverseasExchangeData.value.splice(index, 1);
};

const dialogFormVisible = ref(false);

const form = reactive({
  title: '',
  type: '',
  funding_source: '',
  country: '',
  city: '',
  institution: '',
  duration: '',
  date_start: '',
  date_end: '',
  current_status: '',
  flag1: '',
  flag2: '',
  flag3: '',
  flag4: '',
  link_name: '',
  link: '',
  remarks: '',
  is_still: false
});

</script>

<style scoped>

</style>
