<template>
    <meta charset="charset=utf-8"/>
    <div class="centered">
      <el-button class="back" @click="router.push('/login');">
        返回登录
      </el-button>
      <div>
        <el-card class="card">
          <el-input v-model="input_email" class="email" placeholder="请输入您的邮箱"/>
          <el-button class="verify" @click="SendVerificationCode">
            获取验证码
          </el-button>
          <el-input v-model="input_verification_code" class="verification-code" placeholder="请输入验证码"/>
          <el-input v-model="input_new_password" class="new-password" type="password" placeholder="请输入新密码"/>
          <el-button class="reset" @click="ResetPassword">
            重置密码
          </el-button>
        </el-card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { sendVerificationCode, resetPassword } from '../../api/api.js'
  import { ElMessage } from "element-plus"
  
  const router = useRouter()
  
  let input_email = ref('')
  let input_verification_code = ref('')
  let input_new_password = ref('')
  
  let showContact = ref(false)
  
  async function SendVerificationCode() {
    if (!input_email.value) {
      ElMessage.info('请输入您的邮箱')
      return
    }
    let email = { 'Email': input_email.value}
    try {
      let response = await sendVerificationCode(email)
      const { code, message } = response
      if (code === 200) {
        ElMessage.success('验证码已发送，请检查您的邮箱')
      } else {
        ElMessage.error(message || '发送验证码失败，请重试')
      }
    } catch (error) {
      console.error('Error:', error.message)
      ElMessage.error('发送验证码失败，请重试')
    }
  }
  
  async function ResetPassword() {
    if (!input_email.value || !input_verification_code.value || !input_new_password.value) {
      ElMessage.info('请输入完整信息')
      return
    }
    let resetinfo= { 'Email': input_email.value, 'verificationCode': input_verification_code.value, 'newPassword': input_new_password.value}
    try {
      let response = await resetPassword(resetinfo)
      const { code, message } = response
      if (code === 200) {
        ElMessage.success('密码重置成功')
        router.push('/login')
      } else {
        ElMessage.error(message || '重置密码失败，请重试')
      }
    } catch (error) {
      console.error('Error:', error.message)
      ElMessage.error('重置密码失败，请重试')
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
    background-image: url("../../assets/background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  .back {
    position: absolute;
    top: 2vh;
    left: 2vh;
    font-size: 2vh;
    color: rgba(35, 101, 255, 0.6);
  }
  
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50vh;
    padding: 2vh;
    opacity: 1;
    color: aliceblue;
    border-radius: 2vh;
  }
  
  .email, .verification-code, .new-password {
    display: flex;
    justify-content: center;
    width: 35vh;
    height: 5vh;
    opacity: 1;
    margin-bottom: 2vh;
    font-size: 2vh;
  }
  
  .verify, .reset {
    display: flex;
    justify-content: center;
    width: 35vh;
    height: 5.2vh;
    border-radius: 1vh;
    margin-bottom: 4vh;
    opacity: 1;
    border: none;
    background-color: rgba(12, 64, 196, 0.58);
    font-size: 2.5vh;
    color: aliceblue;
  }
  
  </style>
  