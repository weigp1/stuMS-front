<template>
  <TopBar></TopBar>
  <div class="centered">
  <el-form
      :label-position="'top'"
      :model="ruleForm"
      :rules="rules"
      :size="formSize"
      :inline="true"
      ref="ruleFormRef"
      style="max-width: 80vw"
      label-width="auto"
      class="demo-ruleForm"
      status-icon
  >

    <el-col :span="6">
      <el-form-item label="姓名" prop="SName">
        <el-input v-model="ruleForm.SName" />
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="学生类别" prop="SCategory">
        <el-select v-model="ruleForm.SCategory" placeholder="">
          <el-option label="境内生" value="0" />
          <el-option label="港澳台生" value="1" />
          <el-option label="国际生" value="2" />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="性别" prop="SGender">
        <el-radio-group v-model="ruleForm.SGender">
          <el-radio border value="0" name="SGender">男</el-radio>
          <el-radio border value="1" name="SGender">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="学号" prop="SID">
        <el-input v-model="ruleForm.SID" />
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="身份证号" prop="SIDNum">
        <el-input v-model="ruleForm.SIDNum" />
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="出生年月" prop="SYear">
            <el-date-picker
                v-model="ruleForm.SYear"
                type="date"
                label="date"
                placeholder=""
                style="width: 100%"
            />
          </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="培养层次" prop="SLevel">
        <el-select v-model="ruleForm.SLevel" placeholder="">
          <el-option label="本科生" value="0" />
          <el-option label="硕士研究生" value="1" />
          <el-option label="博士研究生" value="2" />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="政治面貌" prop="SOutlook">
        <el-select v-model="ruleForm.SOutlook" placeholder="">
          <el-option label="群众" value="0" />
          <el-option label="共青团员" value="1" />
          <el-option label="中共预备党员" value="2" />
          <el-option label="中共党员" value="3" />
        </el-select>
      </el-form-item>
    </el-col>

    <!--    这里需要显示省市信息，需要导包-->
    <el-col :span="6">
      <el-form-item label="籍贯" prop="SPlace">
        <el-input v-model="ruleForm.SPlace" />
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="宿舍" prop="SDorm">
        <el-input v-model="ruleForm.SDorm" />
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="联系电话" prop="SPhone">
        <el-input v-model="ruleForm.SPhone" />
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="微信账号" prop="SWechat">
        <el-input v-model="ruleForm.SWechat" />
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="联系邮箱" prop="SMail">
        <el-input v-model="ruleForm.SMail" />
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="家庭地址" prop="SHome">
        <el-input v-model="ruleForm.SHome" />
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="紧急联系人姓名" prop="CName">
        <el-input v-model="ruleForm.CName" />
      </el-form-item>
    </el-col>

    <el-col :span="6">
      <el-form-item label="紧急联系人电话" prop="CPhone">
        <el-input v-model="ruleForm.CPhone" />
      </el-form-item>
    </el-col>

<!--    计数选项-->
<!--    <el-form-item label="Activity count" prop="count">-->
<!--      <el-select-v2-->
<!--          v-model="ruleForm.count"-->
<!--          placeholder="Activity count"-->
<!--          :options="options"-->
<!--      />-->
<!--    </el-form-item>-->

<!--    按钮-->
<!--    <el-form-item label="Instant delivery" prop="delivery">-->
<!--      <el-switch v-model="ruleForm.delivery" />-->
<!--    </el-form-item>-->

<!--    长文本-->
<!--    <el-form-item label="Activity form" prop="desc">-->
<!--      <el-input v-model="ruleForm.desc" type="textarea" />-->
<!--    </el-form-item>-->

    <el-col :span="6" :offset="9">
      <el-form-item>
        <el-button style="margin:0 auto;" type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        <el-button style="margin:0 auto;" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-col>

  </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopBar from "../../components/TopBar.vue";
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const route = useRoute()

interface RuleForm {
  SID: string
  SName: string
  SCategory: string
  SGender: string
  SYear: string
  SIDNum: string
  SLevel: string
  SOutlook: string
  SDorm: string
  SPhone: string
  SWechat: string
  SMail: string
  SHome: string
  SPlace: string
  CName: string
  CPhone: string
}

const formSize = ref<ComponentSize>('large')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  SID: '',
  SName: '',
  SCategory: '',
  SGender: '',
  SYear: '',
  SIDNum: '',
  SLevel: '',
  SOutlook: '',
  SDorm: '',
  SPhone: '',
  SWechat: '',
  SMail: '',
  SHome: '',
  SPlace: '',
  CName: '',
  CPhone: '',
})


const rules = reactive<FormRules<RuleForm>>({
  SID: [
    { required: true, message: '请输入你的学号', trigger: 'blur' },
    { min: 8, max: 8, message: '学号应为8位', trigger: 'blur' },
  ],

  SName: [
    { required: true, message: '请输入你的姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '姓名长度应在2-15之间', trigger: 'blur' },
  ],

  SCategory: [
    {required: true, message: '请选择你的学生类别', trigger: 'blur',},
  ],

  SGender: [
    {required: true, message: '请选择你的性别', trigger: 'blur',},
  ],

  SYear: [
    {type: 'date', required: true, message: '请选择你的出生日期', trigger: 'blur'},
  ],

  SIDNum: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { min: 18, max: 18, message: '身份证号应为18位', trigger: 'blur' },
  ],

  SLevel: [
    {required: true, message: '请选择培养层次', trigger: 'blur'},
  ],

  SOutlook: [
    {required: true, message: '请选择政治面貌', trigger: 'blur'},
  ],

  SDorm: [
    {required: true, message: '请输入宿舍号', trigger: 'blur'},
  ],

  SPhone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位的电话号码', trigger: 'blur' },
  ],

  SWechat: [
    {required: true, message: '请输入微信账号', trigger: 'blur'},
  ],

  SMail: [
    {required: true, message: '请输入邮箱账号', trigger: 'blur'},
    {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'},
  ],

  SHome: [
    {required: true, message: '请输入家庭详细地址', trigger: 'blur'},
  ],

  SPlace: [
    {required: true, message: '请输入籍贯', trigger: 'blur'},
  ],

  CName: [
    {required: true, message: '请输入紧急联系人姓名', trigger: 'blur'},
  ],

  CPhone: [
    { required: true, message: '请输入紧急联系人电话', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位的电话号码', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 计数选项
// const options = Array.from({ length: 1001 }, (_, idx) => ({
//   value: `${idx + 2000}`,
//   label: `${idx + 2000}`,
// })).slice(0, 1001);

</script>


<style scoped>
  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("../../assets/background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>