<template>
  <meta charset="charset=utf-8" />
  <div class="centered">

    <img src="../../assets/login-logo.png" alt="SYSU Logo" class="sysu-logo">

    <div v-if="!showLoginForm">
      <el-card class="login-box">
        <h1>用户登录</h1>
        <el-button class="account-login" @click="showLoginForm = true">账号登录</el-button>
      </el-card>
    </div>
    <div v-else>
      <el-card class="login-box">
        <el-input v-model="input_account" class="account" placeholder="账号" />
        <el-input v-model="input_password" class="password" type="password" placeholder="密码" />
        <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        <el-button class="login" @click="call_login()">登录</el-button>
        <span style="display: flex; justify-content: center; position: relative;">
          <el-button class="getPass" @click="router.push('/forgot-password');">忘记密码</el-button>
          <el-button class="help" @mouseover="showContactInfo" @mouseleave="hideContactInfo">需要帮助</el-button>
          <div v-if="showContact" class="contact-info">请联系: xxx-xxx-xxxx</div>
        </span>
      </el-card>
    </div>

    <div class="footer-text">
      用户单位：中山大学软件工程学院
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UserStore } from '../../stores/user';
import { AuthStore } from '../../stores/auth';
import { login } from '../../api/api.js';
import { ElMessage } from "element-plus";
import Cookies from 'js-cookie';

const router = useRouter();
const { query } = useRoute();

const userStore = UserStore();
const authStore = AuthStore();

let input_account = ref('');
let input_password = ref('');
let rememberMe = ref(false);
let showLoginForm = ref(false);
let showContact = ref(false);

async function call_login() {
  if (!input_account.value || !input_password.value) {
    ElMessage.info('请输入用户名和密码');
    return;
  }
  let account = { 'SID': input_account.value, 'password': input_password.value };

  try {
    let response = await login(account);
    const { code, data } = response;
    if (code === 200) {
      authStore.setToken(data);
      let sid = { 'SID': input_account.value };
      await userStore.login(sid);
      ElMessage.success('登录成功');

      if (rememberMe.value) {
        const cookieOptions = {
          expires: rememberMe.value ? 1 : null,
          sameSite: 'Strict',
        };
        Cookies.set('authToken', data, cookieOptions);
        Cookies.set('SID', input_account.value, cookieOptions);
      }

      if (query.redirect) {
        const path = query.redirect;
        Reflect.deleteProperty(query, 'redirect');
        router.push({ path, query });
      } else {
        router.push('/home');
      }
    } else if (code === 301) {
      ElMessage.error('登录已无效，请重新登录！');
      userStore.logout();
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function showContactInfo() {
  showContact.value = true;
}

function hideContactInfo() {
  showContact.value = false;
}

onMounted(async () => {
  const token = Cookies.get('authToken');
  const sid = Cookies.get('SID');
  if (token) {
    try {
      authStore.setToken(token);
      await userStore.login({ 'SID': sid })
      router.push('/home');
    } catch (error)
    {
      console.error('Error:', error.message);
      userStore.logout();
    };
  }
});
</script>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("../../assets/login.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.sysu-logo {
  position: absolute;
  top: 3vh;
  left: 10vh;
  width: 65vh; /* 调整图片大小和位置 */
}

.login-box {
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

.login-box h1 {
  text-align: center;
  width: 30vh;
  top: 15vh;
  color: black;
}

.account-login {
  display: flex;
  justify-content: center;
  background-color: #007bff;
  bottom: 18vh;
  color: white;
  border: none;
  height: 6vh;
  width: 30vh;
  margin-top: 50vh;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.account, .password {
  display: flex;
  justify-content: center;
  top: 15px;
  width: 35vh;
  height: 6vh;
  opacity: 1;
  margin-bottom: 3vh;
  font-size: 2vh;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35vh;
  height: 5.2vh;
  cursor: pointer;
  border-radius: 1vh;
  margin-bottom: 2vh;
  margin-top: 2vh;
  opacity: 1;
  border: none;
  background-color: #007bff;
  font-size: 2.5vh;
  color: aliceblue;
}

.getPass, .help {
  opacity: 1;
  border: none;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0;
  font-size: 2vh;
  color: #007bff;
  background-color: transparent;
}

.getPass {
  margin-right: 2vh;
}

.help {
  margin-left: 2vh;
}

.contact-info {
  position: absolute;
  top: 3vh;
  left: 16vh;
  width: 20vh;
  background-color: transparent;
  padding: 1vh;
  border-radius: 1vh;
  font-size: 1.8vh;
  color: #007bff;
}

.footer-text {
  position: absolute;
  bottom: 2vh; /* 调整文字位置 */
  text-align: center;
  width: 100%;
  font-size: 12px;
  color: #ffffff; /* 白色字体 */
}

</style>
