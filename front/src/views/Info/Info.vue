<template>
  <el-row>
    <TopBar></TopBar>
    <div class="centered">

      <el-col span="2">
        <div class="left">
          <el-tabs class="demo-tabs" v-model="activeName" :tab-position="tabPosition" @tab-click="handleClick" router>
            <el-tab-pane label="基本信息" name="first"></el-tab-pane>
            <el-tab-pane label="联系信息" name="second"></el-tab-pane>
            <el-tab-pane label="成绩信息" name="third"></el-tab-pane>
            <el-tab-pane label="思想道德" name="fourth"></el-tab-pane>
            <el-tab-pane label="志愿活动" name="fifth"></el-tab-pane>
            <el-tab-pane label="社会工作" name="sixth"></el-tab-pane>
            <el-tab-pane label="比赛获奖" name="seventh"></el-tab-pane>
            <el-tab-pane label="论文发表" name="eighth"></el-tab-pane>
            <el-tab-pane label="专利发明" name="ninth"></el-tab-pane>
            <el-tab-pane label="软件著作" name="tenth"></el-tab-pane>
            <el-tab-pane label="专著出版" name="eleventh"></el-tab-pane>
            <el-tab-pane label="赴外交流" name="twelfth"></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>

      <el-col span="22">

<!--        基本信息-->
        <div class="right" v-if="showFirst">
          <el-form
              :label-position="'top'"
              :model="ruleForm"
              :rules="rules"
              :size="formSize"
              :inline="true"
              ref="ruleFormRef"
              style="max-width: 60vw"
              label-width="auto"
              class="demo-ruleForm"
              status-icon
          >

            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名" prop="name" style="margin: 0 auto; width: 90%;">
                  <el-input v-model="ruleForm.name" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="学生类别" prop="type" style="margin: 0 auto; width: 90%;">
                  <el-select v-model="ruleForm.type" placeholder="">
                    <el-option label="境内生" value="1" />
                    <el-option label="港澳台生" value="2" />
                    <el-option label="国际生" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="性别" prop="gender" style="margin: 0 auto; width: 90%;">
                  <el-radio-group v-model="ruleForm.gender">
                    <el-radio border value="1" name="gender">男</el-radio>
                    <el-radio border value="2" name="gender">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="学号" prop="SID" style="margin: 0 auto; width: 90%;">
                  <el-input v-model="ruleForm.SID" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="身份证号" prop="identity" style="margin: 0 auto; width: 90%;">
                  <el-input v-model="ruleForm.identity" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="出生年月" prop="birthday" style="margin: 0 auto; width: 90%;">
                      <el-date-picker
                          v-model="ruleForm.birthday"
                          type="date"
                          label="date"
                          placeholder=""
                          style="width: 100%"
                      />
                    </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="培养层次" prop="level" style="margin: 0 auto; width: 90%;">
                  <el-select v-model="ruleForm.level" placeholder="">
                    <el-option label="本科生" value="1" />
                    <el-option label="硕士研究生" value="2" />
                    <el-option label="博士研究生" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="政治面貌" prop="outlook" style="margin: 0 auto; width: 90%;">
                  <el-select v-model="ruleForm.outlook" placeholder="">
                    <el-option label="群众" value="1" />
                    <el-option label="共青团员" value="2" />
                    <el-option label="中共预备党员" value="3" />
                    <el-option label="中共党员" value="4" />
                  </el-select>
                </el-form-item>
              </el-col>

              <!--    这里需要显示省市信息，需要导包-->
              <el-col :span="8">
                <el-form-item label="籍贯" prop="user_native" style="margin: 0 auto; width: 90%;">
                  <el-input v-model="ruleForm.user_native" />
                </el-form-item>
              </el-col>

              <el-col :span="8" style="margin: 0 auto; width: 90%;">
                <el-form-item>
                  <el-button style="margin:0 auto;" type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
                  <el-button style="margin:0 auto;" @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>

<!--        联系信息-->
        <div class="right" v-if="showSecond">
          <el-form
              :label-position="'top'"
              :model="ruleForm"
              :rules="rules"
              :size="formSize"
              :inline="true"
              ref="ruleFormRef"
              style="max-width: 60vw"
              label-width="auto"
              class="demo-ruleForm"
              status-icon
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="宿舍" prop="dorm" style="margin: 0 auto; width: 90%;">
                  <el-input v-model="ruleForm.dorm" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="联系电话" prop="tel" style="margin: 0 auto; width: 90%;">
                  <el-input v-model="ruleForm.tel" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="微信账号" prop="wechat" style="margin: 0 auto; width: 90%;">
                  <el-input v-model="ruleForm.wechat" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="联系邮箱" prop="email" style="margin: 0 auto; width: 90%;">
                  <el-input v-model="ruleForm.email" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="家庭地址" prop="address" style="margin: 0 auto; width: 90%;">
                  <el-input v-model="ruleForm.address" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="紧急联系人姓名" prop="emergency_name" style="margin: 0 auto; width: 90%;">
                  <el-input v-model="ruleForm.emergency_name" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="紧急联系人电话" prop="emergency_tel" style="margin: 0 auto; width: 90%;">
                  <el-input v-model="ruleForm.emergency_tel" />
                </el-form-item>
              </el-col>

              <!--              填充-->
              <el-col :span="8"></el-col>
              <el-col :span="8"></el-col>

              <el-col :span="8" style="margin: 0 auto; width: 90%;">
                <el-form-item>
                  <el-button style="margin:0 auto;" type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
                  <el-button style="margin:0 auto;" @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

<!--         成绩信息-->
        <div class="right" v-if="showThird">
          <Score/>
        </div>

<!--         思想道德-->
        <div class="right" v-if="showFourth">
          <Mora/>
        </div>

<!--        志愿服务-->
        <div class="right" v-if="showFifth">
          <Volunteer/>
        </div>

<!--         社会工作-->
        <div class="right" v-if="showSixth">
          <Work/>
        </div>

<!--         比赛获奖-->
        <div class="right" v-if="showSeventh">
          <Contest/>
        </div>

<!--         论文发表-->
        <div class="right" v-if="showEighth">
          <Paper/>
        </div>

<!--        专利-->
        <div class="right" v-if="showNinth">
          <Patent/>
        </div>

        <div class="right" v-if="showTenth">
          <CopyRight/>
        </div>

        <div class="right" v-if="showEleventh">
          <Publication/>
        </div>

        <div class="right" v-if="showTwelfth">
          <Exchange/>
        </div>

<!--         专利发明-->
<!--        <div class="right" v-if="showNinth">-->
<!--          <Patent/>-->
<!--        </div>-->

<!--          删除弹窗-->
<!--          <el-dialog v-model="deleteVisible" width="20vw">-->
<!--            <span>确认删除？该操作不可逆！</span>-->
<!--            <template #footer #default="scope">-->
<!--              <div class="dialog-footer">-->
<!--                <el-button @click="deleteVisible = false">取消</el-button>-->
<!--                <el-button-->
<!--                    type="primary"-->
<!--                    @click="deleteVisible = false"-->
<!--                    @click.prevent="deleteRow(scope.$index)">-->
<!--                  确认删除-->
<!--                </el-button>-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-dialog>-->

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

      </el-col>
    </div>
  </el-row>
</template>

<script lang="ts" setup>

import Mora from "./Mora.vue";
import Score from "./Score.vue";
import Volunteer from "./Volunteer.vue";
import Work from "./Work.vue";
import Contest from "./Contest.vue";
import Paper from "./Paper.vue";
// import Patent from "./Patent.vue"

import axios from "axios";
import {reactive, ref, onMounted, computed} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const route = useRoute()

interface RuleForm {
  SID: string
  name: string
  type: string
  gender: string
  birthday: string
  identity: string
  level: string
  outlook: string
  dorm: string
  tel: string
  wechat: string
  email: string
  address: string
  user_native: string
  emergency_name: string
  emergency_tel: string
  personal: number
  overall: number
}

const formSize = ref<ComponentSize>('large')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  SID: '',
  name: '',
  type: '',
  gender: '',
  birthday: '',
  identity: '',
  level: '',
  outlook: '',
  dorm: '',
  tel: '',
  wechat: '',
  email: '',
  address: '',
  user_native: '',
  emergency_name: '',
  emergency_tel: '',
  personal: 0,
  overall: 0,
})

const typeMap = {
  1: "境内生",
  2: "港澳台生",
  3: "国际生"
};

const levelMap = {
  1: "本科生",
  2: "硕士研究生",
  3: "博士研究生"
};

const outlookMap = {
  1: "群众",
  2: "共青团员",
  3: "中共预备党员",
  4: "党员"
};

const genderMap = {
  1: "男",
  2: "女"
};

const userStore = UserStore();


const rules = reactive<FormRules<RuleForm>>({
  SID: [
    { required: true, message: '请输入你的学号', trigger: 'blur' },
    { min: 8, max: 8, message: '学号应为8位', trigger: 'blur' },
  ],

  name: [
    { required: true, message: '请输入你的姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '姓名长度应在2-15之间', trigger: 'blur' },
  ],

  type: [
    {required: true, message: '请选择你的学生类别', trigger: 'blur',},
  ],

  gender: [
    {required: true, message: '请选择你的性别', trigger: 'blur',},
  ],

  birthday: [
    {type: 'date', required: true, message: '请选择你的出生日期', trigger: 'blur'},
  ],

  identity: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { min: 18, max: 18, message: '身份证号应为18位', trigger: 'blur' },
  ],

  level: [
    {required: true, message: '请选择培养层次', trigger: 'blur'},
  ],

  outlook: [
    {required: true, message: '请选择政治面貌', trigger: 'blur'},
  ],

  dorm: [
    {required: true, message: '请输入宿舍号', trigger: 'blur'},
  ],

  tel: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位的电话号码', trigger: 'blur' },
  ],

  wechat: [
    {required: true, message: '请输入微信账号', trigger: 'blur'},
  ],

  email: [
    {required: true, message: '请输入邮箱账号', trigger: 'blur'},
    {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'},
  ],

  address: [
    {required: true, message: '请输入家庭详细地址', trigger: 'blur'},
  ],

  user_native: [
    {required: true, message: '请输入籍贯', trigger: 'blur'},
  ],

  emergency_name: [
    {required: true, message: '请输入紧急联系人姓名', trigger: 'blur'},
  ],

  emergency_tel: [
    { required: true, message: '请输入紧急联系人电话', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位的电话号码', trigger: 'blur' },
  ],
})

/* 提交表单 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const response = await axios.post('/api/submit', ruleForm)
        console.log('submit success!', response)
      } catch (error) {
        console.error('submit error!', error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

/* 重置表单 */
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

/* 根据学号获得数据 */
const fetchData = async (sid) => {
  try {
    const response = await axios.get(`/api/student/${sid}`)
    Object.assign(ruleForm, response.data)
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
}

// onMounted(() => {
//   const sid = (route.query.sid || '') as string
//   if (sid) {
//     ruleForm.SID = sid
//     fetchData(sid)
//   }
// })

onMounted(async () => {
  try {
    // // console.log("currentUser:", userStore.currentUser)
    // const params = {'SID': userStore.currentUser.sid, 'table': "user_info"};
    // // 调用 select 接口获取数据
    // const response = await select(params);
    // console.log('Select 接口调用成功!', response);
    //
    // // 处理接口返回的数据，格式化日期字段为年月日（仅当 date 字段非空时）
    // const formattedData = response.data.map(item => ({
    //   ...item,
    //   // date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
    //   type: typeMap[item.type],
    //   level: levelMap[item.level],
    //   outlook: outlookMap[item.outlook],
    //   gender: genderMap[item.gender],
    // }));
    //
    // // 更新 ContTableData
    // ruleForm.SID = formattedData[0].SID;
    // ruleForm.name = formattedData[0].name;
    // ruleForm.type = formattedData[0].type;
    // ruleForm.gender = formattedData[0].gender;
    // ruleForm.birthday = formattedData[0].date;
    // ruleForm.identity = formattedData[0].identity;
    // ruleForm.level = formattedData[0].level;
    // ruleForm.outlook = formattedData[0].outlook;
    // ruleForm.dorm = formattedData[0].dorm;
    // ruleForm.phone = formattedData[0].phone;
    // ruleForm.wechat = formattedData[0].wechat;
    // ruleForm.mail = formattedData[0].mail;
    // ruleForm.address = formattedData[0].address;
    // ruleForm.place = formattedData[0].place;
    // ruleForm.emergency_name = formattedData[0].emergency_name;
    // ruleForm.emergency_tel = formattedData[0].emergency_tel;
    const userInfo = userStore.currentUser;
    console.log("userInfo:", userInfo);
    ruleForm.SID = userInfo.sid;
    ruleForm.name = userInfo.name;
    ruleForm.type = typeMap[userInfo.type];
    ruleForm.gender = userInfo.gender;
    if (userInfo.gender === 1) {
      ruleForm.gender = "1";
    } else if (userInfo.gender === 2) {
      ruleForm.gender = "2";
    }

    ruleForm.birthday = userInfo.birthday;
    ruleForm.identity = userInfo.identity;
    ruleForm.level = levelMap[userInfo.level];
    ruleForm.outlook = outlookMap[userInfo.outlook];
    ruleForm.dorm = userInfo.dorm;
    ruleForm.tel = userInfo.tel;
    ruleForm.wechat = userInfo.wechat;
    ruleForm.email = userInfo.email;
    ruleForm.address = userInfo.address;
    ruleForm.user_native = userInfo.user_native;
    ruleForm.emergency_name = userInfo.emergency_name;
    ruleForm.emergency_tel = userInfo.emergency_tel;
    ruleForm.overall = userInfo.overall;
    ruleForm.personal = userInfo.personal;
  } catch (error) {
    console.error('Select 接口调用失败!', error);
  }
});

// 计数选项s
// const options = Array.from({ length: 1001 }, (_, idx) => ({
//   value: `${idx + 2000}`,
//   label: `${idx + 2000}`,
// })).slice(0, 1001);

import type { TabsInstance } from 'element-plus'
import Patent from "./Patent.vue";
import CopyRight from "./CopyRight.vue";
import Publication from "./Publication.vue";
import Exchange from "./Exchange.vue";
import {select} from '../../api/api.js';
import {format} from "date-fns";
import {UserStore} from '../../stores/user.js'
import TopBar from "../../components/TopBar.vue";
const tabPosition = ref<TabsInstance['tabPosition']>('left')

const activeName = ref('first')
const showFirst  = ref(true)
const showSecond = ref(false)
const showThird = ref(false)
const showFourth = ref(false)
const showFifth = ref(false)
const showSixth = ref(false)
const showSeventh = ref(false)
const showEighth = ref(false)
const showNinth = ref(false)
const showTenth = ref(false)
const showEleventh = ref(false)
const showTwelfth = ref(false)


const handleClick = (tab, event) => {
  console.log(tab, event)

  if (tab.paneName === 'first') {
    showFirst.value = true
    router.push({ query: { category: '1' } });
  } else {
    showFirst.value = false
  }

  if (tab.paneName === 'second') {
    showSecond.value = true
    router.push({ query: { category: '2' } });
  } else {
    showSecond.value = false
  }

  if (tab.paneName === 'third') {
    showThird.value = true
    router.push({ query: { category: '3' } });
  } else {
    showThird.value = false
  }

  if (tab.paneName === 'fourth') {
    showFourth.value = true
    router.push({ query: { category: '4' } });
  } else {
    showFourth.value = false
  }

  if (tab.paneName === 'fifth') {
    showFifth.value = true
    router.push({ query: { category: '5' } });
  } else {
    showFifth.value = false
  }

  if (tab.paneName === 'sixth') {
    showSixth.value = true
    router.push({ query: { category: '6' } });
  } else {
    showSixth.value = false
  }

  if (tab.paneName === 'seventh') {
    showSeventh.value = true
    router.push({ query: { category: '7' } });
  } else {
    showSeventh.value = false
  }

  if (tab.paneName === 'eighth') {
    showEighth.value = true
    router.push({ query: { category: '8' } });
  } else {
    showEighth.value = false
  }

  if (tab.paneName === 'ninth') {
    showNinth.value = true
    router.push({ query: { category: '9' } });
  } else {
    showNinth.value = false
  }

  if (tab.paneName === 'tenth') {
    showTenth.value = true
    router.push({ query: { category: '10' } });
  } else {
    showTenth.value = false
  }

  if (tab.paneName === 'eleventh') {
    showEleventh.value = true
    router.push({ query: { category: '11' } });
  } else {
    showEleventh.value = false
  }

  if (tab.paneName === 'twelfth') {
    showTwelfth.value = true
    router.push({ query: { category: '12' } });
  } else {
    showTwelfth.value = false
  }

}

</script>


<style scoped>
  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 150vw;
    background-image: url("../../assets/background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }

  :deep(.el-tabs__item) {
    /* 修改为您想要的文字大小 */
    font-size: 20px!important;
    font-weight: 600;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  :deep(.el-tabs__nav-wrap::after) {
    /* 去掉下划线 */
    position: static !important;
  }

  .left{
    display: flex;
    justify-content: center;

    top: 5vh;
    width: 15vw;
    height:70vh;
    left: -2vw;

    padding-top: 0;

    border-radius: 20px;
    background-color: white;
  }

  .right {
    display: flex;
    justify-content: center;

    top : 5vh;
    width: 70vw;
    height: 70vh;
    right: -2vw;

    padding-top: 5vh;
    padding-left: 1vh;
    padding-right: 1vh;

    border-radius: 20px;
    background-color: white;
  }

</style>
