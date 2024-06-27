<template>
  <meta charset="utf-8"/>
  <div class="centered">
    <div>
      <el-card class="card">
        <el-input v-model="input_account" class="account" placeholder="请输入您的账号"/>
        <el-input v-model="input_email" class="email" placeholder="请输入您的邮箱"/>
        
        <div class="verification-container">
          <el-input v-model="input_verification_code" class="verification-code" placeholder="请输入验证码"/>
          <el-button class="verify" @click="SendVerificationCode">
            获取验证码
          </el-button>
        </div>

        <el-input v-model="input_new_password" class="new-password" type="password" placeholder="请输入新密码"/>
        <el-button class="reset" @click="ResetPassword">
          重置密码
        </el-button>

        <el-button class="back" @click="router.push('/login');">
          返回登录
        </el-button>

      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendVerificationCode, confirmVerificationCode, resetPassword } from '../../api/api.js'
import { ElMessage } from "element-plus"

const router = useRouter()

let input_account = ref('')
let input_email = ref('')
let input_verification_code = ref('')
let input_new_password = ref('')

async function SendVerificationCode() {
  if (!input_account.value || !input_email.value) {
    ElMessage.info('请输入您的账号和邮箱')
    return
  }
  let requestData = { 
    'SID': input_account.value,
    'toEmail': input_email.value,
  }
  try {
    let response = await sendVerificationCode(requestData)
    const { code, data } = response
    if (code === 200) {
      ElMessage.success('验证码已发送，请检查您的邮箱')
    } else {
      ElMessage.error(data || '发送验证码失败，请重试')
    }
  } catch (error) {
    console.error('Error:', error.message)
    ElMessage.error('发送验证码失败，请重试')
  }
}

async function ResetPassword() {
  if (!input_verification_code.value || !input_new_password.value) {
    ElMessage.info('请输入完整信息')
    return
  }
  try {
    let confirminfo = { 
      'SID': input_account.value,
      'password': input_new_password.value
    }
    let response = await confirmVerificationCode(confirminfo)
    const { code,data } = response
    if (code === 200) {
      let resetinfo = { 
        'toEmail': input_email.value, 
        'userCode': input_verification_code.value 
      }
      let response = await resetPassword(resetinfo)
      const { code,data } = response
      if (code === 200) {
        ElMessage.success('密码重置成功，请重新登录')
        router.push('/login')
      }
      else{
        ElMessage.error(data || '密码重置失败，请重试')
      }
    } else {
      ElMessage.error(data || '验证错误，请重试')
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}
</script>

<style scoped>
.centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("../../assets/login.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  height: 45vh;
  width: 45vh;
  padding: 5vh;
  border-radius: 10px;
}

.account, .email, .new-password {
  display: flex;
  justify-content: center;
  width: 35vh;
  height: 5vh;
  opacity: 1;
  margin-bottom: 3vh;
  font-size: 2vh;
}

.verification-container {
  display: flex;
  position: relative;
  width: 35vh;
  margin-bottom: 3vh;
}

.verification-code {
  flex: 1;
  height: 5vh;
  font-size: 2vh;
}

.verify {
  position: absolute;
  right: 0;
  top: 0;
  height: 5vh;
  border-radius: 0 1vh 1vh 0;
  background-color: rgb(102, 132, 213);
  font-size: 2vh;
  color: aliceblue;
}

.reset {
  display: flex;
  justify-content: center;
  width: 35vh;
  height: 5.2vh;
  border-radius: 1vh;
  margin-bottom: 1vh;
  opacity: 1;
  border: none;
  background-color: rgba(12, 64, 196, 0.6);
  font-size: 2.5vh;
  color: aliceblue;
}

.back {
  top: 1vh;
  left: 22vh;
  opacity: 1;
  border: none;
  font-weight: bold;
  font-size: 2vh;
  color: #007bff;
  background-color: transparent;
}

</style>
