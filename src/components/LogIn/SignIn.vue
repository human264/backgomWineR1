<template>
  <div class="signup-container">
    <el-form v-model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="이메일 주소:" required>
        <el-input v-model="form.email" type="email"></el-input>
      </el-form-item>

      <el-form-item label="비밀번호:" required>
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item label="비번 확인:" required :error="passwordError">
        <el-input v-model="passwordConfirm" type="password"></el-input>
      </el-form-item>

      <el-form-item label="핸드폰 번호:" required>
        <el-input v-model="form.phoneNumber" type="tel"></el-input>
      </el-form-item>

      <el-form-item label="사진 업로드:">
        <el-upload
            v-model:file-list="fileList"
            accept="image/*"
            list-type="picture-card" :auto-upload="false">
          <el-icon>
            <Plus/>
          </el-icon>

          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
              <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-preview"
              @click="handlePreview(file)"
          >
            <el-icon><zoom-in/></el-icon>
          </span>

          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><Delete/></el-icon>
          </span>
        </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image"/>
      </el-dialog>

      <el-form-item label="인증 키:" required>
        <el-input v-model="form.emailApprovalKey" placeholder="이메일로 받은 인증 키를 입력하세요"></el-input>
        <div style="display: flex; margin-top: 10px; justify-content: flex-end;">
          <el-button type="primary" @click="submitForm">이메일 인증</el-button>
        </div>
      </el-form-item>
    </el-form>


    <br/>
    <div class="button-group">
      <el-button type="primary" @click="onSubmit">가입하기3</el-button>
      <el-button @click="resetForm">초기화</el-button>
    </div>

    <el-dialog :visible.sync="dialogImageUrl">
      <img width="100%" :src="dialogImageUrl" alt="preview">
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, reactive} from 'vue';
import {ElButton, ElInput, ElNotification, ElUpload, UploadProps, UploadUserFile} from "element-plus";
import type {UploadFile} from 'element-plus'
import {Delete, Plus, ZoomIn} from "@element-plus/icons-vue";
import {JoinInDto} from "@/types/JoinInDto.ts";
import apiClient, {joinInApi} from "@/api/login.ts";


const form = reactive<JoinInDto>({
  email: '',
  password: '',
  phoneNumber: '',
  emailApprovalKey: '',
  files: []
});

const fileList = ref<UploadUserFile[]>([])

const passwordConfirm = ref('');
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)


const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleRemove = (file: UploadFile) => {
  fileList.value = fileList.value.filter(orgfile => orgfile.name !== file.name);
}

const passwordError = computed(() => form.password && passwordConfirm.value && form.password !== passwordConfirm.value ? 'Passwords do not match' : '');

const submitForm = () => {
  if (form.emailApprovalKey.trim() === '') {
    ElNotification({
      title: 'Verification required',
      message: 'Please enter your verification key.',
      type: 'warning'
    });
    return;
  }
  console.log('Verification Key submitted:', form.emailApprovalKey);
};

const resetForm = () => {
  form.email = '';
  form.password = '';
  passwordConfirm.value = '';
  form.phoneNumber = '';
  form.emailApprovalKey = '';
};


const onSubmit = async () => {
  const formData = new FormData();
  formData.append('email', form.email);
  formData.append('password', form.password);
  formData.append('phoneNumber', form.phoneNumber);
  formData.append('emailApprovalKey', form.emailApprovalKey);

  fileList.value.forEach(file => {
    if (file.raw) {
      formData.append('files', file.raw);
    }
  });

  try {
    const response = await apiClient.post('/auth/joinIn', formData, {headers: {'Content-Type': 'multipart/form-data'}});
    console.log('Server response:', response.data);
    ElNotification({
      title: 'Success',
      message: '회원 가입 되었습니다.',
      type: 'success'
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    ElNotification({
      title: 'Error',
      message: '회원 가입에 실패하였습니다.',
      type: 'error'
    });
  }
}


</script>


<style scoped>
.signup-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.button-group {
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
}

.el-upload-list__item {
  transition: none !important;
}

</style>

