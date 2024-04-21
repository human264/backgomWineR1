<template>
  <el-form v-if="!isLogined" ref="loginForm" class="login-form">
    <el-form-item label="Email" prop="email" style="margin-left: 25px">
      <el-input
          v-model="email"
          type="email"
          autocomplete="off"
          placeholder="이메일을 입력해주세요"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">

      <el-input
          v-model="password"
          style="width: 240px"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          show-password
      />

    </el-form-item>
    <div class="button-container">
      <el-form-item>
        <el-button type="primary" @click="handleLogin">로그인</el-button>
        <el-button type="info" @click="handleSignUp">회원가입</el-button>
      </el-form-item>
    </div>
    <div class="forgot-password">
      <el-form-item>
        <el-button type="text" @click="handleForgotPassword">비밀번호 찾기</el-button>
      </el-form-item>
    </div>

  </el-form>
  <div v-else>
    <!-- 로그인된 사용자 정보 표시 -->
    <p>Email: </p>
    <p>ID: </p>
    <!-- 추가 정보 필요 시 여기에 표시 -->
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, ref,} from 'vue';
import { ElForm, ElInput, ElButton, ElNotification } from 'element-plus';
import router from "@/router";
import {fetchUserImage, logInApi} from "@/api/login.ts";
import {LogInUserDto} from "@/api/dto/LogInUserDto";
import {useLogInStore} from '@/stores/logInStore';

export default defineComponent({
  components: {
    ElForm,
    ElInput,
    ElButton,
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const store = useLogInStore();
    const isLogined = computed(() => store.getLogInState);  // computed 속성 사용

    // 로그인 처리 함수
    const handleLogin = async () => {
      const logInUserDto: LogInUserDto = {
        email: email.value,
        password: password.value
      };

      try {
        const res = await logInApi(logInUserDto);
        store.updateLogInState(res.tokenDto.accessToken, res.tokenDto.refreshToken);
        store.setUserData({ email: email.value, id: res.id });

        ElNotification({
          title: 'Success',
          message: 'You have successfully logged in.',
          type: 'success',
        });

        await fetchAndUpdateUserImage();
        const redirectPath = localStorage.getItem('redirectPath') || '/';
        router.push(redirectPath);
        localStorage.removeItem('redirectPath');
      } catch (err) {
        console.error('Login error:', err);
        ElNotification({
          title: 'Error',
          message: 'Failed to log in.',
          type: 'error',
        });
      }
    };

    const fetchAndUpdateUserImage = async () => {
      try {
        const userImage = await fetchUserImage();
        store.setUserImage(userImage);

      } catch (error) {
        console.error('Error fetching the user image:', error);
      }
    };

    const handleSignUp = () => {
      console.log('Navigating to sign up page');
      router.push({name: 'SignIn'});
    };

    const handleForgotPassword = () => {
      console.log('Navigating to forgot password page');
      router.push({name: 'PasswordRecovery'});
    };

    return {
      isLogined,
      email,
      password,
      handleLogin,
      handleSignUp,
      handleForgotPassword,
    };
  },
});
</script>

<style scoped>
.login-form {
  width: 300px;
  margin: auto;
  padding-top: 50px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.forgot-password {
  display: flex;
  justify-content: right;
}
</style>