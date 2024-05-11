<template>
  <div>
    <div style="display: flex; justify-content: flex-end; margin: 10px;">
      <el-button type="primary" :icon="Edit" @click="openForWrite">후기 작성</el-button>
    </div>
    <el-card v-for="post in wineAfterList" :key="post.uuid" class="post-item">
      <div class="post-header">
        <h3>{{ post.afterSubject }} - {{ post.email }}</h3>
        <span>{{ formatDate(post.createDate) }}</span>

      </div>
      <h4>{{ post.afterTalk }}</h4>

      <h4> 모임장소 : {{ post.location }}</h4>

      <div class="demo-image__preview">
        <h4> 모임 사진 </h4>
        <el-image
            style="width: 200px; height: 200px"
            :src="post.url"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="post.srcList"
            :initial-index="4"
            :key="post.uuid"
            fit="cover"
        />
      </div>
      <div>
        <el-button @click="downloadAndDisplayImages(post.meetingUuid, post.uuid)">다운로드 이미지 보기</el-button>

        <div v-if="images.length > 0">
          <img v-for="(image, index) in images" :key="index" :src="image" style="max-width: 100%; margin: 10px;">
        </div>

      </div>

      <el-form-item label="와인 총 별점">
        <el-rate
            v-model="post.totalWinePoint"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
        />
      </el-form-item>

      <el-form-item label="모임 총 별점">
        <el-rate
            v-model="post.meetingPoint"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
        />
      </el-form-item>


      <h4> 작 성 일 : {{ post.createDate }}</h4>

      <el-button type="primary">WineTastyNote</el-button>


    </el-card>


    <WineAfterNote
        :dialogFormVisible="dialogFormVisibleModel"
        @wine-after-talk-dialog-close="wineAfterTalkDialog"
    />


  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {Edit} from "@element-plus/icons-vue";
import {UploadFile, UploadUserFile} from "element-plus";
import {JoinedMeetingList} from "@/types/AfterTalk.ts";
import {fetchWineAfterImages, getTheWineAfterList, getTheWineAfterMeetingList} from "@/api/wineMeeting.ts";
import WineAfterNote from "@/components/WineCommunity/wineAfter/WineAfterNote.vue";
import {useLogInStore} from "@/stores/logInStore.ts";
import {AfterTalkListDto} from "@/types/ClubInfo.ts";
import JSZip from "jszip";

const logInStore = useLogInStore();
const wineAfterList = ref<AfterTalkListDto[]>()


const url = ref('');  // 단일 대표 이미지 URL을 초기화
const srcList = ref<string[]>([]);  // 이미지 URL 리스트를 초기화

onMounted(async () => {
  wineAfterList.value = await getTheWineAfterList(logInStore.getTempUrl.toString())
})

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

const wineAfterTalkDialog = () => {
  dialogFormVisibleModel.value = false
}

const dialogFormVisibleModel = ref<Boolean>(false)

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

const openForWrite = () => {
  dialogFormVisibleModel.value = true
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


const formatDate = (date: any) => {
  if (!(date instanceof Date)) {
    // 유효하지 않은 날짜의 경우 빈 문자열 반환
    return '';
  }

  // 유효한 Date 객체에 대해서만 toISOString 사용
  return date.toISOString().split('T')[0];
};


const afterEmitCancel = () => {
  dialogFormVisibleModel.value = false;
}

const images = ref([])

const downloadAndDisplayImages = async (meetingUuid: string, uuid: string) => {
  try {
    const response = await fetchWineAfterImages(meetingUuid, uuid);
    const zipData = await response.data.arrayBuffer();
    const zip = await JSZip.loadAsync(zipData);

    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const imagePromises: Promise<string>[] = [];

    zip.forEach((relativePath, file) => {
      if (allowedExtensions.some(ext => file.name.endsWith(ext))) {
        const imagePromise = file.async('blob').then(blob => URL.createObjectURL(blob));
        imagePromises.push(imagePromise);
      }
    });

    const imageUrls = await Promise.all(imagePromises);
    if (imageUrls.length > 0) {
      // `wineAfterList`에서 해당 uuid를 가진 항목을 찾음
      const findWineAfter = wineAfterList.value?.find(it => it.uuid === uuid);
      if (findWineAfter) {
        findWineAfter.url = imageUrls[0]; // 대표 이미지로 첫 번째 이미지 설정
        findWineAfter.srcList = imageUrls; // 전체 이미지 리스트 설정
      }
    }
  } catch (error) {
    console.error("Error displaying images:", error);
  }
};

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
