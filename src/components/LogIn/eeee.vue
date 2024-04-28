



<template>
  <div class="signup-container">
    <el-form ref="form" v-model="form" label-width="100px">
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


    </el-form>
    <!--    <el-dialog :visible.sync="dialogImageUrl">-->
    <!--      <img width="100%" :src="dialogImageUrl" alt="preview">-->
    <!--    </el-dialog>-->
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import {ElForm, ElButton, ElInput, ElUpload} from 'element-plus';

interface FormState {
  email: string;
  password: string;
  phone: string;

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
    const form = reactive<FormState>({
      email: '',
      password: '',
      phone: '',

      verificationKey: ''
    });

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
