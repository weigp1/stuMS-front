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
          <input type="file" id="file-input"/>
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
import {downloadFile,uploadFile,getPresignedURL} from '../../api/resource.js'

const router = useRouter()
const route = useRoute()
const userStore = UserStore();

let input_account = ref('')
let input_password = ref('')

// 处理登录操作
const call_login = () => {
  
  // 从输入框中获取用户名和密码，构建用户对象
  let user = { 'SID': input_account.value, 'SPassword': input_password.value };
  
  // 调用Login函数进行登录操作
  Login(user).then(response => {
    const {code, data} = response;  // 从响应中解构出状态码和数据
    if (code == 200) {
      // 更新用户登录状态和存储用户信息
      userStore.login(user);
      // 存储JWT Token
      localStorage.setItem('jwtToken', response.token);
      router.push('/home');
    } 
    else if(code == 4004)
    {
      ElMessage.error('登录已过期，请重新登录！');
      userStore.logout();
      router.push('/home');
    }
    }).catch(error => {
        console.error('Error:', error);
    });
}

// // 上传示例
// const upload = () => {
//   const fileInput = document.getElementById('file-input');
//   try {
//     const bucketName = 'homepage';
//     const objectName = fileInput.files[0].name; // 获取选中的文件名作为对象名
//     const expiryTimeInSeconds = 60 * 60; // 设置过期时间为1小时
//     getPresignedURL(bucketName, objectName, expiryTimeInSeconds)
//       .then(presignedURL => {
//         console.log(presignedURL);
//         uploadFile(presignedURL, fileInput.files[0]); // 传递选中的文件对象
//       })
//       .catch(error => {
//         console.error('Error:', error.message);
//       });
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// };


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
  