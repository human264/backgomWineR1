<template>
  <div class="chat-container">
    <el-card class="box-card">
      <div class="text item" v-for="msg in messages" :key="msg.id">
        {{ msg.text }}
      </div>
    </el-card>
    <el-input v-model="newMessage" placeholder="메시지를 입력하세요..." class="input-with-select">
      <el-button slot="append" icon="el-icon-send" @click="sendMessage"></el-button>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Message {
  id: number;
  text: string;
}

const messages = ref<Message[]>([]);
const newMessage = ref<string>('');

const sendMessage = () => {
  if (newMessage.value.trim()) {
    const newId = messages.value.length > 0 ? messages.value[messages.value.length - 1].id + 1 : 1;
    messages.value.push({
      id: newId,
      text: newMessage.value
    });
    newMessage.value = '';
  }
};
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.box-card {
  margin-bottom: 20px;
  overflow-y: auto;
  max-height: 400px;
}
</style>