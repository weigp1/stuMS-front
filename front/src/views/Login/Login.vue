<template>
  <meta charset="charset=utf-8"/>
    <div class="bgimg">
      <div>
        <el-card class="card">
          <el-input v-model="input_account" class="account" placeholder="账号"/>
          <el-input v-model="input_password" class="password" type="password" placeholder="密码"/>
          <el-button class="login" @click="call_login()">
          登录
          </el-button>
          <el-button class="getpass">
          忘记密码
          </el-button>
          <el-button class="help">
          需要帮助
          </el-button>
        </el-card>
      </div>
    </div>

</template>
  
<script  setup>
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {UserStore} from '../../stores/UserStore.js'
import {Login, Test_Login} from '../../api/api.js'
import {downloadFile,uploadFile} from '../../api/resource.js'

const router = useRouter()
const route = useRoute()
const userStore = UserStore();

let input_account = ref('')
let input_password = ref('')
let fileInput = ref(null);

// 处理登录操作
const call_login = () => {
  
  // 从输入框中获取用户名和密码，构建用户对象
  let user = { 'SID': input_account.value, 'SPassword': input_password.value };
  
  // 调用Login函数进行登录操作，使用Promise处理异步操作
  Test_Login(user).then(response => { // 登录成功的情况
      // 在UserStore中更新用户登录状态和存储用户信息
      userStore.login(user);
      // 将返回的JWT Token存储到localStorage中
      localStorage.setItem('jwtToken', response.token);
      // 导航到'/home'页面
      router.push('/home');
    }).catch(error => { // 登录失败的情况
      if(error==401) { // 如果返回状态码为401，表示未授权
        // 在UserStore中更新用户登录状态和清空用户信息
        userStore.logout();
        // 导航到'/home'页面
        router.push('/home');
      } else { // 其他错误情况
        console.error('Error:', error); // 打印错误信息到控制台
      }
    });
}

const handleFileUpload = () =>{
  // downloadFile('http://43.136.61.147:9000/homepage/front.txt','front.txt');
  const file = fileInput.value.files[0];
  const filename = file.name;
  uploadFile(url,file);
}
</script>

<style scoped>
.bgimg{
  position: fixed;
  height: 100%;
  width: 100%;
  background-size:100% 100%;
}

.login{
  position: absolute;
  left: 59px;
  top: 147.59px;
  width: 280px;
  height: 52.03px;
  border-radius: 10px;
  opacity: 1;
  border: none;
  background-color: rgba(12, 64, 196, 0.58);
  font-size: 18px;
  color: aliceblue;
}

.account{
  position: absolute;
  left: 59px;
  top: 31px;
  width: 280px;
  height: 38px;
  opacity: 1;
}

.password{
  position: absolute;
  left: 59px;
  top: 86px;
  width: 281px;
  height: 38.22px;
  opacity: 1;
}

.getpass{
  position: absolute;
  left: 45px;
  top: 224px;
  width: 90px;
  height: 28px;
  opacity: 1;
  border: none;
  font-family: DM Sans;
  font-weight: bold;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0;
  font-size: 15px;
  color: rgba(35, 101, 255, 0.6)
}

.help{
  position: absolute;
  left: 240px;
  top: 224px;
  width: 90px;
  height: 28px;
  opacity: 1;
  border: none;
  font-family: DM Sans;
  font-weight: bold;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0;
  font-size: 15px;
  color: rgba(35, 101, 255, 0.6);
}

.card{
  position: absolute;
  left: 904px;
  top: 253px;
  width: 399px;
  height: 275px;
  opacity: 1;
  color: aliceblue;
}
</style>
  