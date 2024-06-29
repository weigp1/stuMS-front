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
      <el-table-column prop="issn_CN" label="ISSN/CN"/>
      <el-table-column prop="factor" label="影响因子"/>
      <el-table-column prop="published_status" label="发表状态"/>
      <el-table-column prop="submission_date" label="投稿日期" sortable/>
      <el-table-column prop="received_date" label="接收日期" sortable/>
      <el-table-column prop="publication_date" label="发表日期" sortable/>
      <el-table-column prop="my_range" label="卷/期/页码范围">
        <template #default="scope">
          <span>{{ scope.row.my_range }}</span>
          <br />
        </template>
      </el-table-column>
      <el-table-column prop="doi_PMID" label="DOI/PMID"/>
      <el-table-column prop="ccf" label="CCF推荐情况"/>
      <el-table-column prop="my_partition" label="中科院分区"/>
      <el-table-column prop="inclusion" label="期刊收录情况"/>
      <el-table-column prop="publisher" label="出版单位"/>
      <el-table-column prop="language" label="论文语言"/>
      <el-table-column prop="award_flag" label="是否获最佳论文奖"/>
      <el-table-column prop="collaborative_one" label="是否国际合作"/>
      <el-table-column prop="collaborative_two" label="是否本单位合作"/>
      <el-table-column prop="link" label="证明材料">
        <template #default="scope">
          <el-button type="primary" @click="handleDownload(scope.row.link)">查 看</el-button>
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
  <el-dialog v-model="dialogFormVisible" title="表单添加-论文发表" width="460">
    <el-form :model="form" label-width="90px" label-position="top" class="centered-form">

      <el-form-item label="论文标题">
        <el-input v-model="form.title" autocomplete="off" style="width: 100%" placeholder="请输入论文标题"/>
      </el-form-item>

      <el-form-item label="论文类型">
        <el-select v-model="form.type" placeholder="请选择论文类型" style="width: 100%">
          <el-option label="会议论文" :value="1"></el-option>
          <el-option label="期刊论文" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发表期刊/会议">
        <el-input v-model="form.publish" autocomplete="off" style="width: 100%" placeholder="请填写发表期刊或会议名"/>
        <span style="font-size: 12px;">请填写全称</span>
      </el-form-item>

      <el-form-item label="作者类型">
        <el-select v-model="form.author_level" placeholder="请选择作者类型" style="width: 100%">
          <el-option label="通讯" :value="1"></el-option>
          <el-option label="一作" :value="2"></el-option>
          <el-option label="通讯+一作" :value="3"></el-option>
          <el-option label="通讯+共同一作" :value="4"></el-option>
          <el-option label="共同一作" :value="5"></el-option>
          <el-option label="二作" :value="6"></el-option>
          <el-option label="其他" :value="7"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="全部作者">
        <el-input v-model="form.authors" autocomplete="off" style="width: 100%" placeholder="请填写全部作者"/>
        <span style="font-size: 12px;">请按署名顺序完整填写中文名</span>
      </el-form-item>

      <el-form-item label="通讯作者">
        <el-input v-model="form.corresponding_author" autocomplete="off" style="width: 100%" placeholder="请输入通讯作者姓名"/>
      </el-form-item>

      <el-form-item label="ISSN/CN">
        <el-input v-model="form.issn_CN" autocomplete="off" style="width: 100%" placeholder="请输入ISSN或CN号"/>
      </el-form-item>

      <el-form-item label="影响因子">
        <el-input v-model="form.factor" autocomplete="off" style="width: 100%" placeholder="请输入影响因子"/>
      </el-form-item>

      <el-form-item label="发表状态">
        <el-select v-model="form.published_status" placeholder="请选择发表状态" style="width: 100%">
          <el-option label="已投稿" :value="1"></el-option>
          <el-option label="已接收" :value="2"></el-option>
          <el-option label="正式发表" :value="3"></el-option>
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
        <el-input v-model="form.my_range" autocomplete="off" style="width: 100%" placeholder="请输入卷/期/页码范围"/>
        <span style="font-size: 12px;">如未正式发表请留空</span>
      </el-form-item>

      <el-form-item label="DOI/PMID">
        <el-input v-model="form.doi_PMID" autocomplete="off" style="width: 100%" placeholder="请输入DOI或PMID"/>
      </el-form-item>

      <el-form-item label="CCF推荐情况">
        <el-select v-model="form.ccf" placeholder="请选择CCF推荐情况" style="width: 100%">
          <el-option label="CCF-A" :value="1"></el-option>
          <el-option label="CCF-B" :value="2"></el-option>
          <el-option label="CCF-C" :value="3"></el-option>
          <el-option label="其他"   :value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="中科院分区">
        <el-select v-model="form.my_partition" placeholder="请选择中科院分区" style="width: 100%">
          <el-option label="一区" :value="1"></el-option>
          <el-option label="二区" :value="2"></el-option>
          <el-option label="三区" :value="3"></el-option>
          <el-option label="不适用" :value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="期刊收录情况">
        <el-select v-model="form.inclusion" placeholder="请选择期刊收录情况" style="width: 100%">
          <el-option label="CSSCI" :value="1"></el-option>
          <el-option label="CSCD" :value="2"></el-option>
          <el-option label="SCI" :value="3"></el-option>
          <el-option label="SSCI" :value="4"></el-option>
          <el-option label="EI" :value="5"></el-option>
          <el-option label="A&HCI" :value="6"></el-option>
          <el-option label="其他" :value="7"></el-option>
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
          <el-radio label="是" :value="1">是</el-radio>
          <el-radio label="否" :value="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否国际合作">
        <el-select v-model="form.collaborative_one" placeholder="请选择是否国际合作" style="width: 100%">
          <el-option label="国外合作" :value="1"></el-option>
          <el-option label="港澳台合作" :value="2"></el-option>
          <el-option label="非国际合作" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否本单位合作">
        <el-select v-model="form.collaborative_two" placeholder="请选择是否本单位合作" style="width: 100%">
          <el-option label="校内合作" :value="1"></el-option>
          <el-option label="院内合作" :value="2"></el-option>
          <el-option label="否" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="证明材料">
        <input type="file" @change="handleFileChange" accept=".pdf" />
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
            @click="submitForm(form)">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import { Delete } from "@element-plus/icons-vue";
import {deleteByPID, select, submitPaper} from '../../api/api.js';
import { UserStore } from '../../stores/user.js';
import { uploadFile, fileUrl } from '../../api/resource.js';
import { format } from "date-fns";
import { onMounted } from 'vue';
import { ElMessage } from "element-plus";

// 默认显示
const PaperTableData = ref([
  // 示例数据
  // {
  //   title: '示例论文标题',
  //   type: '期刊论文',
  //   publish: '示例期刊',
  //   author_level: '通讯',
  //   authors: '小红、小明',
  //   corresponding_author: '小红',
  //   issn_cn: '1234-5678',
  //   factor: 3.5,
  //   published_status: '正式发表',
  //   submission_date: '2022-01-01',
  //   received_date: '2022-02-01',
  //   publication_date: '2022-03-01',
  //   range: '10(1):1-10',
  //   DOI_PMID: '10.1234/example.doi',
  //   CCF: 'CCF-A',
  //   partition: '一区',
  //   inclusion: 'SCI',
  //   publisher: '示例出版社',
  //   language: '中文',
  //   award_flag: '是',
  //   collaborative_one: '非国际合作',
  //   collaborative_two: '校内合作',
  //   link_name: '证明材料文件名',
  //   link: 'https://example.com',
  //   remarks: '无'
  // }
  // 更多数据...
]);

const typeMap = {
  1: '会议论文',
  2: '期刊论文'
};

const statusMap = {
  1: '已投稿',
  2: '已接收',
  3: '正式发表'
};

const authorLevelMap = {
  1: '通讯',
  2: '一作',
  3: '通讯+一作',
  4: '通讯+共同一作',
  5: '共同一作',
  6: '二作',
  7: '其他'
};

const CCFMap = {
  1: 'CCF-A',
  2: 'CCF-B',
  3: 'CCF-C',
  4: '其他'
};

const partitionMap = {
  1: '一区',
  2: '二区',
  3: '三区',
  4: '不适用'
};

const inclusionMap = {
  1: 'CSSCI',
  2: 'CSCD',
  3: 'SCI',
  4: 'SSCI',
  5: 'EI',
  6: 'A&HCI',
  7: '其他'
};

const collaborativeOneMap = {
  1: '国外合作',
  2: '港澳台合作',
  3: '非国际合作'
};

const collaborativeTwoMap = {
  1: '校内合作',
  2: '院内合作',
  3: '否'
};

const awardFlagMap = {
  1: '是',
  2: '否'
};


const dialogFormVisible = ref(false);

const form = reactive({
  author_level: '',
  authors: '',
  award_flag: '',
  ccf: '',
  collaborative_one: '',
  collaborative_two: '',
  comment: '',
  corresponding_author: '',
  doi_PMID: '',
  factor: '',
  idx: '',
  inclusion: '',
  issn_CN: '',
  language: '',
  link: '',
  link_name: '',
  my_partition: '',
  my_range: '',
  pid: '',
  publication_date: '',
  publish: '',
  published_status: '',
  publisher: '',
  received_date: '',
  remarks: '',
  score: '',
  sid: '',
  status_one: '',
  status_two: '',
  submission_date: '',
  title: '',
  type: ''
});

// const addRow = () => {
//   PaperTableData.value.push({ ...form });
//   dialogFormVisible.value = false;
//   resetForm();
// };

// const resetForm = () => {
//   Object.keys(form).forEach(key => {
//     form[key] = '';
//   });
//   form.factor = 0;
// };


const userStore = UserStore()

const file = ref<File | null>(null);

onMounted(async () => {
  try {
    // console.log("currentUser:", userStore.currentUser)
    const params = {'SID': userStore.currentUser.sid, 'table': "paper"};
    // 调用 select 接口获取数据
    const response = await select(params);
    console.log('Select 接口调用成功!', response);

    const filteredData = response.data.filter(item => item.status_one === 0);
    const formattedData = filteredData.map(item => ({
      ...item,
      date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
      date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
      date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
      publication_date: item.publication_date ? format(new Date(item.publication_date), 'yyyy-MM-dd') : null,
      received_date: item.received_date ? format(new Date(item.received_date), 'yyyy-MM-dd') : null,
      submission_date: item.submission_date ? format(new Date(item.submission_date), 'yyyy-MM-dd') : null,
      type: typeMap[item.type],
      published_status: statusMap[item.published_status],
      author_level: authorLevelMap[item.author_level],
      ccf: CCFMap[item.ccf],
      my_partition: partitionMap[item.my_partition],
      inclusion: inclusionMap[item.inclusion],
      collaborative_one: collaborativeOneMap[item.collaborative_one],
      collaborative_two: collaborativeTwoMap[item.collaborative_two],
      award_flag: awardFlagMap[item.award_flag],
    }));

    // 更新 ContTableData
    PaperTableData.value = formattedData;

  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }
});

const deleteRow = async (index) => {
  try {
    const item = PaperTableData.value[index];
    const params = {'PID': item.pid, 'SID': userStore.currentUser.sid, 'table': "paper"}
    const response = await deleteByPID(params); // 假设有 deleteSocialWork 方法并传入需要删除的数据的 ID
    console.log('删除成功!', response);
    PaperTableData.value.splice(index, 1); // 删除成功后更新界面数据
  } catch (error) {
    console.error('删除失败!', error);
  }
};

const submitForm = async (form) => {
  form.sid = userStore.currentUser.sid;
  form.status_one = "0";
  form.status_two = "-1";

  // 提交表单数据
  try {
    if (file.value) {
        const currentTime = new Date().toISOString().replace(/[:.]/g, '-');
        form.link_name = file.value.name;
        form.link = `${userStore.currentUser.sid}-${currentTime}-${file.value.name}`;
    }
    // 调用 submitPaper 函数提交表单数据
    const response = await submitPaper(form);
    console.log('提交表单为：',form);
     if (response.data === 1) {
      ElMessage.success('提交成功, 请前往个人信息审核页面查看');
      // 处理成功后的逻辑，比如关闭弹窗等
      dialogFormVisible.value = false;
      const params = {'SID': userStore.currentUser.sid, 'table': "paper"};
      // 调用 select 接口获取数据
      const response2 = await select(params);
      console.log('Select 接口调用成功!', response2);

      // 处理接口返回的数据，格式化日期字段为年月日（仅当 date 字段非空时）
      const formattedData = response2.data.map(item => ({
        ...item,
        date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
        date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
        date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
        publication_date: item.publication_date ? format(new Date(item.publication_date), 'yyyy-MM-dd') : null,
        received_date: item.received_date ? format(new Date(item.received_date), 'yyyy-MM-dd') : null,
        submission_date: item.submission_date ? format(new Date(item.submission_date), 'yyyy-MM-dd') : null,
        type: typeMap[item.type],
        published_status: statusMap[item.published_status],
        author_level: authorLevelMap[item.author_level],
        ccf: CCFMap[item.ccf],
        my_partition: partitionMap[item.my_partition],
        inclusion: inclusionMap[item.inclusion],
        collaborative_one: collaborativeOneMap[item.collaborative_one],
        collaborative_two: collaborativeTwoMap[item.collaborative_two],
        award_flag: awardFlagMap[item.award_flag],
      }));
      // 更新 ContTableData
      PaperTableData.value = formattedData;
      // 上传证明文件
      if (file.value) {
        await uploadFile('credential', form.link, file.value);
        file.value = null; // 上传成功后清除文件
      }
    } else {
      ElMessage.error('提交失败!');
    }
  } catch (error) {
    console.error('提交失败!', error);
  }
};

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile;
  }
};

const handleDownload = async (link) => {
  const url = await fileUrl('credential', link);;
  window.open(url, '_blank');
};

</script>

<style scoped>

</style>
