<template>
  <div>
    <div style="display: flex; justify-content: flex-end; margin: 10px;">
      <el-button type="primary" :icon="Edit" @click="openForWrite">후기 작성</el-button>
    </div>
    <el-card v-for="post in posts" :key="post.id" class="post-item">
      <div class="post-header">
        <h3>{{ post.title }}</h3>
        <span>{{ formatDate(post.date) }}</span>

      </div>
      <p>{{ post.content }}</p>
      <el-button type="primary">WineTastyNote</el-button>

      <div class="comments-section">
        <h4>댓글</h4>
        <ul>
          <li v-for="comment in post.comments" :key="comment.id">
            {{ comment.author }} : {{ comment.content }}
          </li>
        </ul>
      </div>
    </el-card>

    <WineAfterNote
        :dialog-form-visible="dialogFormVisible"
        @emit-cancel="afterEmitCancel"
    />


  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, reactive, ref, watch} from 'vue';
import {Delete, Edit, Plus, ZoomIn} from "@element-plus/icons-vue";
import {ElNotification, ElUpload, UploadFile, UploadProps, UploadUserFile} from "element-plus";
import apiClient from "@/api/login.ts";
import {JoinedMeetingList} from "@/types/AfterTalk.ts";
import {getTheWineAfterMeetingList} from "@/api/wineMeeting.ts";
import WineAfterNote from "@/components/WineCommunity/wineAfter/WineAfterNote.vue";
import MeetingCreateDialog from "@/components/WineCommunity/meeting/MeetingCreateDialog.vue";

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
const dialogFormVisible = ref(false)

const fileList = ref<UploadUserFile[]>([]);
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);
const disabledPictureUpload = ref(false);


const joinedWineList = ref<JoinedMeetingList[]>([]);
const joinedWineListClick = async () => {


  joinedWineList.value = await getTheWineAfterMeetingList()


}

const handleRemove = (file: UploadFile) => {
  fileList.value = fileList.value.filter(orgfile => orgfile.name !== file.name);
}
const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const openForWrite = () => {
  dialogFormVisible.value = true
}

const textarea = ref('')

const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]
const size = ref<'default' | 'large' | 'small'>('default')
const posts = [
  {
    id: 1,
    title: 'Post 1',
    content: 'This is the content of post 1.',
    date: new Date(),
    views: 123,
    comments: [
      {id: 1, author: 'User1', content: 'Great post!'},
      {id: 2, author: 'User2', content: 'Thanks for the info.'}
    ]
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'This is the content of post 2.',
    date: new Date(),
    views: 456,
    comments: [
      {id: 1, author: 'User3', content: 'Very interesting.'}
    ]
  },
];


const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};


const afterEmitCancel = () => {
  dialogFormVisible.value = false;
}




</script>

<style scoped>
.post-item {
  margin-bottom: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comments-section {
  margin-top: 20px;
}

.comments-section h4 {
  margin-bottom: 10px;
}


.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
