<template>
  <div>
    <div style="display: flex; justify-content: flex-end; margin: 10px;">
      <el-button type="info" style="width: 100px"  @click="wineInfoDialogNew" >와인 정보 입력</el-button>
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
        <h4>모임 일 : {{ formatDate(post.meetingDate.toString()) }} </h4>
        <h4>모임 시간 : {{ formatTime(post.meetingTimeStart.toString()) }} - {{ formatTime(post.meetingTimeEnd.toString()) }} </h4>
      </div>

      <div class="comments-section">
        <h4>모임 장소 : {{ post.location }} </h4>
      </div>


      <div class="comments-section">
        <h4>참가 비용 : {{ post.jointedCost }} 원 </h4>
      </div>

      <div class="comments-section">
        <h4>참가 인원 : {{ post.joinCount }} / {{ post.totalJoinCount }}

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
        :dialog-wine-visible="wineInfoDialogVisibleModel"
        @wineInfoEmit="wineEmitCancel"
    />
  </div>

</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, onUpdated, ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import MeetingCreateDialog from "@/components/WineCommunity/meeting/MeetingCreateDialog.vue";
import {ClubMeetingCreate, MeetingTableDto} from "@/types/ClubInfo.ts";
import WineInfoInputDialog from "@/components/WineCommunity/meeting/WineInfoInputDialog.vue";
import {getTheMeetingList, meetingJoinIn} from "@/api/wineMeeting.ts";
import {useLogInStore} from "@/stores/logInStore.ts";
import apiClient from "@/api/login.ts";
import {ElNotification} from "element-plus";


const logInStore = useLogInStore();

const wineInfoDialogVisibleModel = ref(false);
const clubCreateDialogModel = ref(false);

const meetingDialogNew = () => {
  clubCreateDialogModel.value = true;
}
const meetingEmitCancel = () => {
  clubCreateDialogModel.value = false;
}

const wineInfoDialogNew = () => {
  wineInfoDialogVisibleModel.value = true;
}

const wineEmitCancel = () => {
  wineInfoDialogVisibleModel.value = false;
}

const startAndEndDateModel = ref<[Date, Date]>([
  new Date(2016, 9, 10, 8, 40),
  new Date(2016, 9, 10, 9, 40),
])

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};


const meetingTableList = ref<MeetingTableDto[]>([]);

const getTHeMeetingListApi = async () => {
  meetingTableList.value = await getTheMeetingList(logInStore.getTempUrl)
}

onMounted(async () => {
  await getTHeMeetingListApi();
})


const joinInApi = async (uuid: string) => {
  try {
    // 모임 참석 API 호출
    const response = await meetingJoinIn(uuid);
    console.log('Server response:', response.data);

    // 성공 알림 표시
    ElNotification({
      title: 'Success',
      message: '모임 참석에 성공하였습니다.',
      type: 'success'
    });

    // 해당 항목의 참석 가능 상태 업데이트
    meetingTableList.value.filter(item => item.uuid === uuid).forEach((item) => {
      item.isCanJoin = false;
    });
  } catch (error) {
    // 오류 메시지 제공
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    console.error('Error uploading files:', errorMessage);

    // 오류 알림 표시
    ElNotification({
      title: 'Error',
      message: errorMessage,
      type: 'error'
    });
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
</style>
