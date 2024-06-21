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
      <el-table-column prop="publish" label="发表期刊/会议">
        <template #default="scope">
          <span>{{ scope.row.publish }}</span>
          <br />
        </template>
      </el-table-column>
      <el-table-column prop="author_level" label="作者类型"/>
      <el-table-column prop="authors" label="全部作者">
        <template #default="scope">
          <span>{{ scope.row.authors }}</span>
          <br />
        </template>
      </el-table-column>
      <el-table-column prop="corresponding_author" label="通讯作者"/>
      <el-table-column prop="issn_cn" label="ISSN/CN"/>
      <el-table-column prop="factor" label="影响因子"/>
      <el-table-column prop="published_status" label="发表状态"/>
      <el-table-column prop="submission_date" label="投稿日期" sortable/>
      <el-table-column prop="received_date" label="接收日期" sortable/>
      <el-table-column prop="publication_date" label="发表日期" sortable/>
      <el-table-column prop="range" label="卷/期/页码范围">
        <template #default="scope">
          <span>{{ scope.row.range }}</span>
          <br />
        </template>
      </el-table-column>
      <el-table-column prop="DOI_PMID" label="DOI/PMID"/>
      <el-table-column prop="CCF" label="CCF推荐情况"/>
      <el-table-column prop="partition" label="中科院分区"/>
      <el-table-column prop="inclusion" label="期刊收录情况"/>
      <el-table-column prop="publisher" label="出版单位"/>
      <el-table-column prop="language" label="论文语言"/>
      <el-table-column prop="award_flag" label="是否获最佳论文奖"/>
      <el-table-column prop="collaborative_one" label="是否国际合作"/>
      <el-table-column prop="collaborative_two" label="是否本单位合作"/>
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
  <el-dialog v-model="dialogFormVisible" title="表单添加-论文发表" width="460" draggable>
    <el-form :model="form" label-width="90px" label-position="top" class="centered-form">

      <el-form-item label="论文标题">
        <el-input v-model="form.title" autocomplete="off" style="width: 100%" placeholder="请输入论文标题"/>
      </el-form-item>

      <el-form-item label="论文类型">
        <el-select v-model="form.type" placeholder="请选择论文类型" style="width: 100%">
          <el-option label="会议论文" value="会议论文"></el-option>
          <el-option label="期刊论文" value="期刊论文"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发表期刊/会议">
        <el-input v-model="form.publish" autocomplete="off" style="width: 100%" placeholder="请填写发表期刊或会议名"/>
        <span style="font-size: 12px;">请填写全称</span>
      </el-form-item>

      <el-form-item label="作者类型">
        <el-select v-model="form.author_level" placeholder="请选择作者类型" style="width: 100%">
          <el-option label="通讯" value="通讯"></el-option>
          <el-option label="一作" value="一作"></el-option>
          <el-option label="通讯+一作" value="通讯+一作"></el-option>
          <el-option label="通讯+共同一作" value="通讯+共同一作"></el-option>
          <el-option label="共同一作" value="共同一作"></el-option>
          <el-option label="二作" value="二作"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="全部作者">
        <el-input v-model="form.authors" autocomplete="off" style="width: 100%" placeholder="请填写全部作者"/>
        <span style="font-size: 12px;">请按署名顺序完整填写中文名，如小红、小明</span>
      </el-form-item>

      <el-form-item label="通讯作者">
        <el-input v-model="form.corresponding_author" autocomplete="off" style="width: 100%" placeholder="请输入通讯作者姓名"/>
      </el-form-item>

      <el-form-item label="ISSN/CN">
        <el-input v-model="form.issn_cn" autocomplete="off" style="width: 100%" placeholder="请输入ISSN或CN号"/>
      </el-form-item>

      <el-form-item label="影响因子">
        <el-input v-model="form.factor" autocomplete="off" style="width: 100%" placeholder="请输入影响因子"/>
      </el-form-item>

      <el-form-item label="发表状态">
        <el-select v-model="form.published_status" placeholder="请选择发表状态" style="width: 100%">
          <el-option label="已投稿" value="已投稿"></el-option>
          <el-option label="已接收" value="已接收"></el-option>
          <el-option label="正式发表" value="正式发表"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="投稿日期">
        <el-date-picker
            v-model="form.submission_date"
            type="date"
            placeholder="请选择投稿日期"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="接收日期">
        <el-date-picker
            v-model="form.received_date"
            type="date"
            placeholder="请选择接收日期"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="发表日期">
        <el-date-picker
            v-model="form.publication_date"
            type="date"
            placeholder="请选择发表日期"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="卷/期/页码范围">
        <el-input v-model="form.range" autocomplete="off" style="width: 100%" placeholder="请输入卷/期/页码范围"/>
        <span style="font-size: 12px;">如未正式发表请留空</span>
      </el-form-item>

      <el-form-item label="DOI/PMID">
        <el-input v-model="form.DOI_PMID" autocomplete="off" style="width: 100%" placeholder="请输入DOI或PMID"/>
      </el-form-item>

      <el-form-item label="CCF推荐情况">
        <el-select v-model="form.CCF" placeholder="请选择CCF推荐情况" style="width: 100%">
          <el-option label="CCF-A" value="CCF-A"></el-option>
          <el-option label="CCF-B" value="CCF-B"></el-option>
          <el-option label="CCF-C" value="CCF-C"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="中科院分区">
        <el-select v-model="form.partition" placeholder="请选择中科院分区" style="width: 100%">
          <el-option label="一区" value="一区"></el-option>
          <el-option label="二区" value="二区"></el-option>
          <el-option label="三区" value="三区"></el-option>
          <el-option label="不适用" value="不适用"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="期刊收录情况">
        <el-select v-model="form.inclusion" placeholder="请选择期刊收录情况" style="width: 100%">
          <el-option label="CSSCI" value="CSSCI"></el-option>
          <el-option label="CSCD" value="CSCD"></el-option>
          <el-option label="SCI" value="SCI"></el-option>
          <el-option label="SSCI" value="SSCI"></el-option>
          <el-option label="EI" value="EI"></el-option>
          <el-option label="A&HCI" value="A&HCI"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="出版单位">
        <el-input v-model="form.publisher" autocomplete="off" style="width: 100%" placeholder="请输入出版单位"/>
      </el-form-item>

      <el-form-item label="论文语言">
        <el-input v-model="form.language" autocomplete="off" style="width: 100%" placeholder="请输入论文语言"/>
      </el-form-item>

      <el-form-item label="是否获最佳论文奖">
        <el-radio-group v-model="form.award_flag">
          <el-radio label="是">是</el-radio>
          <el-radio label="否">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否国际合作">
        <el-select v-model="form.collaborative_one" placeholder="请选择是否国际合作" style="width: 100%">
          <el-option label="国外合作" value="国外合作"></el-option>
          <el-option label="港澳台合作" value="港澳台合作"></el-option>
          <el-option label="非国际合作" value="非国际合作"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否本单位合作">
        <el-select v-model="form.collaborative_two" placeholder="请选择是否本单位合作" style="width: 100%">
          <el-option label="校内合作" value="校内合作"></el-option>
          <el-option label="院内合作" value="院内合作"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="证明材料文件名">
        <el-input v-model="form.link_name" autocomplete="off" style="width: 100%" placeholder="请输入证明材料文件名"/>
      </el-form-item>

      <el-form-item label="证明材料">
        <el-input v-model="form.link" autocomplete="off" style="width: 100%" placeholder="请输入证明材料的链接"/>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.remarks" type="textarea" autocomplete="off" maxlength="50" show-word-limit style="width: 100%" placeholder="选填，限制最长50字"/>
      </el-form-item>

    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
            type="primary"
            @click="dialogFormVisible = false; addRow()">
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
  // 示例数据
  {
    title: '示例论文标题',
    type: '期刊论文',
    publish: '示例期刊',
    author_level: '通讯',
    authors: '小红、小明',
    corresponding_author: '小红',
    issn_cn: '1234-5678',
    factor: 3.5,
    published_status: '正式发表',
    submission_date: '2022-01-01',
    received_date: '2022-02-01',
    publication_date: '2022-03-01',
    range: '10(1):1-10',
    DOI_PMID: '10.1234/example.doi',
    CCF: 'CCF-A',
    partition: '一区',
    inclusion: 'SCI',
    publisher: '示例出版社',
    language: '中文',
    award_flag: '是',
    collaborative_one: '非国际合作',
    collaborative_two: '校内合作',
    link_name: '证明材料文件名',
    link: 'https://example.com',
    remarks: '无'
  }
  // 更多数据...
]);

const deleteRow = (index: number) => {
  PaperTableData.value.splice(index, 1);
};

const dialogFormVisible = ref(false);

const form = reactive({
  title: '',
  type: '',
  publish: '',
  author_level: '',
  authors: '',
  corresponding_author: '',
  issn_cn: '',
  factor: 0,
  published_status: '',
  submission_date: '',
  received_date: '',
  publication_date: '',
  range: '',
  DOI_PMID: '',
  CCF: '',
  partition: '',
  inclusion: '',
  publisher: '',
  language: '',
  award_flag: '',
  collaborative_one: '',
  collaborative_two: '',
  link_name: '',
  link: '',
  remarks: ''
});

const addRow = () => {
  PaperTableData.value.push({ ...form });
  resetForm();
};

const resetForm = () => {
  Object.keys(form).forEach(key => {
    form[key] = '';
  });
  form.factor = 0;
};
</script>

<style scoped>

</style>
