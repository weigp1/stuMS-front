<template>
  <el-row>
    <el-table
        :data="BookPublicationData"
        style="width: 100%; max-width: 68vw; min-width: 68vw;"
        max-height="55vh"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        stripe
        highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="65px"/>
      <el-table-column prop="title" label="专著名称"/>
      <el-table-column prop="author_level" label="第几作者"/>
      <el-table-column prop="team" label="该著作全部作者"/>
      <el-table-column prop="publisher" label="出版单位"/>
      <el-table-column prop="type" label="著作类别"/>
      <el-table-column prop="date" label="出版时间" sortable/>
      <el-table-column prop="isbn" label="ISBN"/>
      <el-table-column prop="link_name" label="证明材料文件名"/>
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
  <el-dialog v-model="dialogFormVisible" title="表单添加-专著出版" width="460">
    <el-form :model="form" label-width="90px" label-position="top" class="centered-form">

      <el-form-item label="专著名称">
        <el-input v-model="form.title" autocomplete="off" style="width: 100%" placeholder="请输入专著名称"/>
      </el-form-item>

      <el-form-item label="第几作者">
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

      <el-form-item label="该著作全部作者">
        <el-input v-model="form.team" autocomplete="off" style="width: 100%" placeholder="请填写该著作全部作者"/>
        <span style="font-size: 12px;">请按作者顺序依次列出全部作者姓名</span>
      </el-form-item>

      <el-form-item label="出版单位">
        <el-input v-model="form.publisher" autocomplete="off" style="width: 100%" placeholder="请输入出版单位"/>
      </el-form-item>

      <el-form-item label="著作类别">
        <el-select v-model="form.type" placeholder="请选择著作类别" style="width: 100%">
          <el-option label="研究型著作" :value="1"></el-option>
          <el-option label="教材" :value="2"></el-option>
          <el-option label="译著" :value="3"></el-option>
          <el-option label="编著" :value="4"></el-option>
          <el-option label="其他" :value="5"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="出版时间">
        <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="请选择出版时间"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="ISBN">
        <el-input v-model="form.isbn" autocomplete="off" style="width: 100%" placeholder="请输入ISBN"/>
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
import {Delete} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import {deleteByPID, select, submitPublication} from '../../api/api.js';
import {UserStore} from '../../stores/user.js';
import {fileUrl, uploadFile} from '../../api/resource.js';
import {format} from "date-fns";
import {ElMessage} from "element-plus";

const userStore = UserStore()

const typeMap = {
  1: "研究型著作",
  2: "教材",
  3: "译著",
  4: "编著",
  5: "其他"
};

const author_levelMap = {
  1: "通讯",
  2: "一作",
  3: "通讯+一作",
  4: "通讯+共同一作",
  5: "共同一作",
  6: "二作",
  7: "其他"
};



// 默认显示
const BookPublicationData = ref([
  // {
  //   title: '现代管理学',
  //   author_level: '一作',
  //   team: '张三, 李四, 王五',
  //   publisher: '北京大学出版社',
  //   type: '研究型著作',
  //   date: '2023-06-15',
  //   ISBN: '978-7-12345-678-9',
  //   link_name: '现代管理学出版证明',
  //   link: 'https://example.com/book1',
  //   remarks: '无'
  // },
  // // 更多数据...
]);

// const deleteRow = (index: number) => {
//   BookPublicationData.value.splice(index, 1);
// };

const dialogFormVisible = ref(false);

const form = reactive({
  author_level: "",
  comment: "",
  date: "",
  idx: "",
  isbn: "",
  link: "",
  link_name: "",
  pid: "",
  publisher: "",
  remarks: "",
  score: "",
  sid: "",
  status_one: "",
  status_two: "",
  team: "",
  title: "",
  type: ""
});

const file = ref<File | null>(null);

onMounted(async () => {
  try {
    // console.log("currentUser:", userStore.currentUser)
    const params = {'SID': userStore.currentUser.sid, 'table': "publication"};
    // 调用 select 接口获取数据
    const response = await select(params);
    console.log('Select 接口调用成功!', response);

    const filteredData = response.data.filter(item => item.status_one === 1);
    // 更新 ContTableData
    BookPublicationData.value = filteredData.map(item => ({
      ...item,
      date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
      date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
      date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
      type: typeMap[item.type],
      author_level: author_levelMap[item.author_level]
    }));

  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }
});

const deleteRow = async (index) => {
  try {
    const item = BookPublicationData.value[index];
    const params = {'PID': item.pid, 'SID': userStore.currentUser.sid, 'table': "publication"}
    const response = await deleteByPID(params); // 假设有 deleteSocialWork 方法并传入需要删除的数据的 ID
    console.log('删除成功!', response);
    BookPublicationData.value.splice(index, 1); // 删除成功后更新界面数据
  } catch (error) {
    console.error('删除失败!', error);
  }
};

const submitForm = async (form) => {
  form.sid = userStore.currentUser.sid;
  form.status_one = "0";
  form.status_two = "-1";
  // console.log(form);

  // 提交表单数据
  try {
    if (file.value) {
        const currentTime = new Date().toISOString().replace(/[:.]/g, '-');
        form.link_name = file.value.name;
        form.link = `${userStore.currentUser.sid}-${currentTime}-${file.value.name}`;
    }
    // 调用 submitPaper 函数提交表单数据
    const response = await submitPublication(form);
    console.log('提交表单为：',form);
    if (response.data === 1) {
      ElMessage.success('提交成功, 请前往个人信息审核页面查看');
      // 处理成功后的逻辑，比如关闭弹窗等
      dialogFormVisible.value = false;
      const params = {'SID': userStore.currentUser.sid, 'table': "publication"};
      // 调用 select 接口获取数据
      const response2 = await select(params);
      console.log('Select 接口调用成功!', response2);

      // 处理接口返回的数据，格式化日期字段为年月日（仅当 date 字段非空时）
      // 更新 ContTableData
      const filteredData = response2.data.filter(item => item.status_one === 1);
      // 更新 ContTableData
      BookPublicationData.value = filteredData.map(item => ({
        ...item,
        date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
        date_end: item.date_end ? format(new Date(item.date_end), 'yyyy-MM-dd') : null,
        date_start: item.date_start ? format(new Date(item.date_start), 'yyyy-MM-dd') : null,
        type: typeMap[item.type],
        author_level: author_levelMap[item.author_level]
      }));
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
  const url = await fileUrl('credential', link);
  window.open(url, '_blank');
};
</script>

<style scoped>

</style>
