<template>
  <meta charset="charset=utf-8"/>
  <div class="centered">
    <div>
      <el-card class="card">
        <el-input v-model="input_account" class="account" placeholder="账号"/>
        <el-input v-model="input_password" class="password" type="password" placeholder="密码"/>
        <el-button class="login" @click="call_login()">
          登录
        </el-button>
        <span style="display: flex; justify-content: center; position: relative;">
          <el-button class="getPass" @click="router.push('/forgot-password');">
            忘记密码
          </el-button>
          <el-button class="help" @mouseover="showContactInfo" @mouseleave="hideContactInfo">
            需要帮助
          </el-button>
          <div v-if="showContact" class="contact-info">
            请联系: xxx-xxx-xxxx
          </div>
        </span>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { UserStore } from '../../stores/user'
import { AuthStore } from '../../stores/auth'
import { login } from '../../api/api.js'
import { ElMessage } from "element-plus"

const router = useRouter()
const { query } = useRoute()

const userStore = UserStore()
const authStore = AuthStore()

let input_account = ref('')
let input_password = ref('')

let showContact = ref(false)

// 处理登录操作
async function call_login() {
  if (!input_account.value || !input_password.value) {
    ElMessage.info('请输入用户名和密码')
    return
  }
  let account = { 'SID': input_account.value, 'password': input_password.value }
  
  try {
    let response = await login(account)
    const { code, data } = response
    if (code === 200) {
      authStore.setToken(response.data)
      let sid = { 'SID': input_account.value }
      await userStore.login(sid)
      ElMessage.success('登录成功')
      if (query.redirect) {
        const path = query.redirect
        Reflect.deleteProperty(query, 'redirect')
        router.push({ path, query })
      } else {
        router.push('/home')
      }
    } else if (code === 301) {
      ElMessage.error('登录已无效，请重新登录！')
      userStore.logout()
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

function showContactInfo() {
  showContact.value = true
}

function hideContactInfo() {
  showContact.value = false
}


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

.account, .password {
  display: flex;
  justify-content: center;
  width: 35vh;
  height: 5vh;
  opacity: 1;
  margin-bottom: 2vh;
  font-size: 2vh;
}

.login {
  display: flex;
  justify-content: center;
  width: 35vh;
  height: 5.2vh;
  border-radius: 1vh;
  margin-bottom: 2vh;
  opacity: 1;
  border: none;
  background-color: rgba(12, 64, 196, 0.58);
  font-size: 2.5vh;
  color: aliceblue;
}

.button-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2vh;
}

.getPass, .help {
  opacity: 1;
  border: none;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0;
  font-size: 2vh;
  color: rgba(35, 101, 255, 0.6);
}

.getPass {
  margin-right: 1vh;
}

.help {
  margin-left: 1vh;
}

.contact-info {
  position: absolute;
  top: 4vh;
  left: 16vh;
  width: 20vh;
  background-color: white;
  padding: 1vh;
  border-radius: 1vh;
  font-size: 1.8vh;
  color: rgba(35, 101, 255, 0.6);
}
</style>
