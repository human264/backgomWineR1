<template>
  <div class="signup-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="이메일 주소:" required>
        <el-input v-model="form.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="비밀번호:" required>
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item label="비번 확인:" required>
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="핸드폰 번호:" required>
        <el-input v-model="form.phone" type="tel"></el-input>
      </el-form-item>
      <el-form-item label="사진 업로드:">
        <el-upload
            class="upload-demo"

        :accept="imageTypes"
        :on-preview="handlePictureCardPreview"
            style="margin: 5px"
        :on-remove="handleRemove"
        list-type="picture-card"
        v-model="form.photo">
        <i class="el-icon-plus"></i>
        </el-upload>


        <el-upload
            class="upload-demo"
            style="margin: 5px"
            :accept="imageTypes"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            list-type="picture-card"
            v-model="form.photo">
          <i class="el-icon-plus"></i>
        </el-upload>


        <el-upload
            class="upload-demo"
            style="margin: 5px"
            :accept="imageTypes"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            list-type="picture-card"
            v-model="form.photo">
          <i class="el-icon-plus"></i>
        </el-upload>


      </el-form-item>




      <el-form-item label="인증 키:" required>
        <el-input v-model="form.verificationKey" placeholder="이메일로 받은 인증 키를 입력하세요"></el-input>
        <div style="display: flex; margin-top: 10px; justify-content: flex-end;">
          <el-button type="primary" @click="submitForm">이메일 인증</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">가입하기</el-button>
        <el-button @click="resetForm">초기화</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogImageUrl">
      <img width="100%" :src="dialogImageUrl" alt="preview">
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElForm, ElButton, ElInput, ElUpload } from 'element-plus';

interface FormState {
  email: string;
  password: string;
  phone: string;
  photo: File | null;
  verificationKey: string;
}

export default defineComponent({
  components: {
    ElForm,
    ElButton,
    ElInput,
    ElUpload
  },
  setup() {
    const form = ref<FormState>({
      email: '',
      password: '',
      phone: '',
      photo: null,
      verificationKey: ''
    });
    const dialogImageUrl = ref<string | null>(null);
    const imageTypes = "image/png, image/jpeg";

    const handlePictureCardPreview = (file: { url: string }) => {
      dialogImageUrl.value = file.url;
    };

    const handleRemove = (file: File, fileList: File[]) => {
      console.log('remove', file, fileList);
    };

    const submitForm = () => {
      console.log('submit', form.value);
      // 폼 제출 로직 추가
    };

    const resetForm = () => {
      form.value = { email: '', password: '', phone: '', photo: null, verificationKey: '' };
    };

    return {
      form,
      dialogImageUrl,
      imageTypes,
      handlePictureCardPreview,
      handleRemove,
      submitForm,
      resetForm
    };
  }
});
</script>

<style scoped>
.signup-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
