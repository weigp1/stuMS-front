<template>
  <div>
    <h2>邮箱格式验证表单</h2>
    <form @submit.prevent="submitForm">
      <label for="email">邮箱：</label>
      <input type="email" id="email" v-model="email" required>
      <button type="submit">提交</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      error: ''
    };
  },
  methods: {
    async submitForm() {
      if (!this.email) {
        this.error = '邮箱不能为空。';
        return;
      }

      if (!this.isValidEmail(this.email)) {
        this.error = '邮箱格式无效。';
        return;
      }

      try {
        // 发送 POST 请求到后端 API
        const response = await axios.post('http://1.12.37.226/', {
          email: this.email
        });

        // 根据后端返回的响应处理逻辑
        console.log(response.data); // 假设后端返回成功信息
        alert('表单提交成功！');
        this.email = ''; // 提交成功后清空输入框
        this.error = ''; // 清空错误提示
      } catch (error) {
        console.error('提交失败：', error.message); // 打印错误信息
        alert('表单提交失败，请稍后重试。');
      }
    },
    isValidEmail(email) {
      // 使用正则表达式进行基本的邮箱格式验证
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }
};
</script>

