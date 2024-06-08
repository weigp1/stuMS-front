<template>
  <meta charset="charset=utf-8"/>
    <div class="bg-img">
      <div>
        <el-card class="card">
          <el-input v-model="input_account" class="account" placeholder="账号"/>
          <el-input v-model="input_password" class="password" type="password" placeholder="密码"/>
          <el-button class="login" @click="call_login()">
          登录
          </el-button>
          <el-button class="getPass">
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
import {login, getuser} from '../../api/api.js'
import {downloadFile,uploadFile} from '../../api/resource.js'
import {ElMessage} from "element-plus";

const router = useRouter()
const route = useRoute()
const userStore = UserStore();

let input_account = ref('')
let input_password = ref('')

// 处理登录操作
const call_login = () => {
  
  // 从输入框中获取用户名和密码
  let account = { 'SID': input_account.value, 'SPassword': input_password.value };

  let approved = false
  
  // 调用Login函数进行登录操作
  login(account).then(response => {
    const {code, data} = response;
    if (code === 200) {
      localStorage.setItem('jwtToken', response.token);
      approved = true;
    } 
    else if(code === 4004)
    {
      ElMessage.error('登录已无效，请重新登录！');
      userStore.logout();
      router.push('/home');
    }
    }).catch(error => {
        console.error('Error:', error.message);
    });
    if(approved)
    {
      account = { 'SID': input_account.value};
      // 获取用户信息
      getuser(account).then(response => {
        userStore.login(response)
      }).catch(error => {
        console.error('Error:', error.message);
      });
    }

}

// // 上传示例
// const upload = () => {
//   const fileInput = document.getElementById('file-input');
//   try {
//     const bucketName = 'homepage';
//     const objectName = fileInput.files[0].name; // 获取选中的文件名作为对象名
//     uploadFile(bucketName, objectName, fileInput.files[0]); // 传递选中的文件对象
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// };

// // 下载示例
// const download = () => {
//   const bucketName = 'homepage';
//   const objectName = 'front.txt';
//   downloadFile(bucketName, objectName);
// };

</script>

<style scoped>
.bg-img{
  position: fixed;
  height: 100%;
  width: 100%;
  background-size:100% 100%;
}

.login{
  position: absolute;
  left: 59px;
  top: 148px;
  width: 280px;
  height: 52px;
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
  height: 38px;
  opacity: 1;
}

.getPass{
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
  