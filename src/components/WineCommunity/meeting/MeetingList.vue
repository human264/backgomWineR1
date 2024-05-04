<template>
  <div>
    <div style="display: flex; justify-content: flex-end; margin: 10px;">
      <el-button type="info" @click="wineInfoDialogNew" style="width: 100px">와인 정보 입력</el-button>
      <el-button type="primary" style="width: 100px" @click="meetingDialogNew">모임 생성</el-button>
    </div>


    <el-card v-for="post in meetingTableList" :key="post.uuid" class="post-item">
      <div class="post-header">
        <h3>{{ post.subject }}</h3>
      </div>
      <p>{{ post.detail }}</p>

      <div class="comments-section">
        <h4>Wine 종류 :</h4>
        <ul>
          <li v-for="wine in post.wineName">
            <strong>{{ wine }} </strong>
          </li>
        </ul>
      </div>

      <div class="comments-section">
        <h4>모임 일 : {{ formatDate(post.meetingDate) }} </h4>
        <h4>모임 시간 : {{ formatTime(post.meetingTimeStart) }} - {{ formatTime(post.meetingTimeEnd) }} </h4>
      </div>

      <div class="comments-section">
        <h4>모임 장소 : {{ post.location }} </h4>
      </div>


      <div class="comments-section">
        <h4>참가 비용 : {{ post.jointedCost }} 원 </h4>
      </div>

      <div class="comments-section">
        <h4>참가 인원 : {{ post.joinCount }} / {{ post.jointedCost }}

          <el-button v-if="post.isCanJoin" type="primary" style="margin-left: 10px"
                     @click="joinInApi(post.uuid)">참석
          </el-button>
        </h4>
      </div>


    </el-card>

    <MeetingCreateDialog
        :dialog-visible="clubCreateDialogModel"
        @emit-cancel="meetingEmitCancel"
    />

    <WineInfoInputDialog
        :dialog-visible="wineInfoDialogVisible"
        @emit-cancel="wineEmitCancel"
    />

  </div>


  <div>

    <el-card v-for="post in posts" :key="post.id" class="post-item">
      <div class="post-header">
        <h3>{{ post.title }}</h3>
        <span>{{ formatDate(post.date) }}</span>

      </div>
      <p>{{ post.content }}</p>

      <div class="comments-section">
        <h4>Wine 종류 :</h4>
        <ul>
          <li v-for="wine in post.wineLists" :key="wine.id">
            <strong>{{ wine.wineName }} : </strong>
            {{ wine.winePoint }} / {{ wine.wineBody }} / {{ wine.wineTasty }}
          </li>
        </ul>
      </div>

      <div class="comments-section">
        <h4>모임 시간 : {{ formatDate(post.meetingTime) }} </h4>
      </div>

      <div class="comments-section">
        <h4>모임 장소 : {{ post.meetingLocation }} </h4>
      </div>


      <div class="comments-section">
        <h4>참가 비용 : {{ post.joinCost }} 원 </h4>
      </div>

      <div class="comments-section">
        <h4>참가 인원 : {{ post.joinMember }} / {{ post.maxJoinMember }}
          <el-button type="primary" style="margin-left: 10px">참석</el-button>
        </h4>
      </div>

      <div>
        <el-button type="text" @click="goToPost(post.id)">Read More</el-button>
      </div>

    </el-card>

    <MeetingCreateDialog
        :dialog-visible="clubCreateDialogModel"
        @emit-cancel="meetingEmitCancel"
        @close-dialog="handleDialogClose"
    />

    <WineInfoInputDialog
        :dialog-visible="wineInfoDialogVisible"
        @emit-cancel="wineEmitCancel"
    />

  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, onUpdated, ref} from 'vue';
import {useRouter} from 'vue-router';
import MeetingCreateDialog from "@/components/WineCommunity/meeting/MeetingCreateDialog.vue";
import {ClubMeetingCreate, MeetingTableDto} from "@/types/ClubInfo.ts";
import WineInfoInputDialog from "@/components/WineCommunity/meeting/WineInfoInputDialog.vue";
import {getTheMeetingList, meetingJoinIn} from "@/api/wineMeeting.ts";
import {useLogInStore} from "@/stores/logInStore.ts";
import apiClient from "@/api/login.ts";
import {ElNotification} from "element-plus";


const logInStore = useLogInStore();

const wineInfoDialogVisible = ref(false);

const wineInfoDialogNew = () => {
  wineInfoDialogVisible.value = true;
}


const clubCreateMeeting: ClubMeetingCreate = {
  uuid: "", // 필요에 따라 UUID를 지정
  subject: "", // 주제 지정
  detail: "", // 세부 내용 작성
  wineName: [""], // 와인 이름 배열
  meetingDate: new Date(),
  meetingTime: [new Date(), new Date()], // ISO 형식의 시간 지정
  location: "", // 위치 지정
  locatedPoint: "0, 0", // 위경도 형식의 좌표
  jointedCost: 0, // 참가 비용
  joinCount: 0, // 현재 참가자 수
  totalJoinCount: 0, // 총 참가자 수
  createdClub: "", // 클럽 이름
}


const meetingEmitCancel = () => {
  clubCreateDialogModel.value = false;
}

const wineEmitCancel = () => {
  wineInfoDialogVisible.value = false;
}

const router = useRouter();

const startAndEndDateModel = ref<[Date, Date]>([
  new Date(2016, 9, 10, 8, 40),
  new Date(2016, 9, 10, 9, 40),
])

const wineSelectionInitials = ref([])

const wineSelectionModel = ref([
  {
    value: 'Option1',
    label: 'Option11'
  },
  {
    value: 'Option13',
    label: 'Option112'
  }
])


const wineSelectionOptions = Array.from({length: 1000}).map((_, idx) => ({
  value: `Option${idx + 1}`,
  label: `${wineSelectionInitials.value[idx % 10]}${idx}`,
}))

const meetingModel = [
  {
    id: '',
    subject: '',
  }
]

const posts = [
  {
    id: 1,
    title: 'Post 1',
    content: 'This is the content of post 1.',
    date: new Date(),
    views: 123,
    wineLists: [
      {id: 1, wineName: 'Diablo', winePoint: '4.5', wineBody: 'FullBody', wineTasty: 'Sweet'},
      {id: 2, wineName: 'Monte', winePoint: '3.5', wineBody: 'FullBody', wineTasty: 'Sweet'}
    ],
    meetingTime: new Date(),
    meetingLocation: '충장로 일루이',
    joinCost: 3000,
    joinMember: 3,
    maxJoinMember: 5,
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'This is the content of post 2.',
    date: new Date(),
    views: 456,
    wineLists: [
      {id: 1, wineName: 'Diablo', winePoint: '4.5', wineBody: 'FullBody', wineTasty: 'Sweet'},
    ],
    meetingTime: new Date(),
    meetingLocation: '상무지구',
    joinCost: 3000,
    joinMember: 3,
    maxJoinMember: 5,
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const formatTime = (dateString) => {
  const date = new Date(dateString);

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

const goToPost = (postId: number) => {
  router.push({name: 'PostDetail', params: {postId}});
};

const clubCreateDialogModel = ref(false)


const meetingDialogNew = () => {
  clubCreateDialogModel.value = true;
}

const meetingTableList = ref<MeetingTableDto[]>([]);

const getTHeMeetingListApi = async () => {
  meetingTableList.value = await getTheMeetingList(logInStore.getTempUrl)
}

onMounted(async () => {
  await getTHeMeetingListApi();
})

onUpdated(async () => {
  await getTHeMeetingListApi();
})
const handleDialogClose = () => {
  clubCreateDialogModel.value = false;  // 다이얼로그 상태를 변경
}
const joinInApi = async (uuid: string) => {
  try {
    const response = await meetingJoinIn(uuid)
    console.log('Server response:', response.data);
    ElNotification({
      title: 'Success',
      message: '모임 참석에 성공하였습니다.',
      type: 'success'
    });
    meetingTableList.value.filter(item => item.uuid === uuid).forEach((item) => {
      item.isCanJoin = false;
    })

  } catch (error) {
    console.error('Error uploading files:', error);
    ElNotification({
      title: 'Error',
      message: error.response.data,
      type: 'error'
    });
  }


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
</style>
