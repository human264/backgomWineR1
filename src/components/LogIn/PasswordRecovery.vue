<template>
  <div class="password-recovery-container">
    <el-form ref="form" :model="form" label-width="120px" @submit.prevent="onSubmit">
      <el-form-item label="이메일 주소:" required :rules="[{ required: true, message: '이메일 주소를 입력하세요', trigger: 'blur' }]">
        <el-input v-model="form.email" type="email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendVerificationCode">인증 번호 보내기</el-button>
      </el-form-item>
      <el-form-item label="인증 번호:" required :rules="[{ required: true, message: '인증 번호를 입력하세요', trigger: 'blur' }]">
        <el-input v-model="form.verificationCode" type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="verifyCode">인증 번호 확인</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from "vue";
import {ElButton, ElForm, ElFormItem, ElInput} from "element-plus";

interface FormState {
  email: string;
  verificationCode: string;
}

export default defineComponent({
  components: {
    ElForm,
    ElButton,
    ElInput,
    ElFormItem
  },
  setup() {
    const form = ref<FormState>({
      email: '',
      verificationCode: ''
    });

    const sendVerificationCode = () => {
      console.log('Sending verification code to:', form.value.email);
      // 실제로 이메일로 인증 번호를 보내는 API 호출
    };

    const verifyCode = () => {
      console.log('Verifying code:', form.value.verificationCode);
      // 인증 번호 검증 로직 API 호출
    };

    const onSubmit = () => {
      console.log('Form submitted:', form.value);
      // 폼 제출 로직 추가
    };

    return {
      form,
      onSubmit,
      sendVerificationCode,
      verifyCode
    };
  }
});
</script>

<style scoped>
.password-recovery-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
}
</style>
