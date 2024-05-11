<template>
  <div>
    <el-dialog
        v-model="props.dialogVisible"
        title="모임 생성"
        width="500"
        destroy-on-close
        draggable
        @close="$emit('emitCancel')"
        center
    >
      <el-form :model="clubCreateMeeting" label-width="auto" style="max-width: 600px">

        <el-form-item label="모임 제목" style="margin-left: 50px">
          <el-input v-model="clubCreateMeeting.subject" style="width: 240px" placeholder="모임 제목을 입력해주세요"/>
        </el-form-item>

        <el-form-item label="모임 내용" style="margin-left: 50px">
          <el-input v-model="clubCreateMeeting.detail" style="width: 240px" placeholder="모임 내용을 입력해주세요"/>
        </el-form-item>

        <el-form-item label="Wine" style="margin-left: 50px">
          <el-select
              v-model="value"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="Wine을 입력해주세요"
              :remote-method="remoteMethod"
              :loading="loading"
              style="width: 240px"

          >
            <el-option
                v-for="item in list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>


        <el-form-item label="모임 일" style="margin-left: 50px">
          <el-date-picker
              v-model="clubCreateMeeting.meetingDate"
              type="date"
              placeholder="모임 일을 입력해주세요"
              clearable
          />
        </el-form-item>


        <el-form-item label="모임 시간" style="margin-left: 50px">
          <div class="demo-range">
            <el-time-picker
                v-model="clubCreateMeeting.meetingTime"
                is-range
                range-separator="To"
                start-placeholder="Start time"
                end-placeholder="End time"
                style="width: 200px; "
            />
            <br/>
          </div>
        </el-form-item>


        <el-form-item label="모임 장소" style="margin-left: 50px;">
          <el-input v-model="clubCreateMeeting.location" style="width: 240px" placeholder="모임 장소를 입력하세요"/>
        </el-form-item>

        <el-form-item label="참가 비용" style="margin-left: 50px">
          <el-input v-model="clubCreateMeeting.jointedCost" style="width: 240px" placeholder="참가 비용을 입력하세요"/>
        </el-form-item>

        <el-form-item label="최대 참가 인원" style="margin-left: 50px">
          <el-input v-model="clubCreateMeeting.totalJoinCount" style="width: 240px" placeholder="최대 참석 인원을 입력하세요"/>
        </el-form-item>

      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="emitSubmit">
            생성
          </el-button>
          <el-button @click="$emit('emitCancel')">취소</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">

import {onMounted, ref, watch, defineProps, reactive} from "vue";
import {getTheWineNameList, makeTheNewMeeting} from "@/api/wineMeeting.ts";
import {ClubMeetingCreate} from "@/types/ClubInfo.ts";
import {useLogInStore} from "@/stores/logInStore.ts";

const logInStore = useLogInStore();
const emits = defineEmits(['emitCancel']);

const props = defineProps({
  dialogVisible: Boolean,
  meetingSubject: String,
  wineMeetingDetail: String,

  wineSelectionModel : [],
  wineSelectionOptionModel : [],

  wineMeetingTime : [Date, Date],
  wineMeetingLocation : String,
  wineMeetingCost: Number,
  wineMeetingJoinNo : Number

})


const clubCreateMeeting = ref<ClubMeetingCreate>({
  uuid: "", // 필요에 따라 UUID를 지정
  subject: "", // 주제 지정
  detail: "", // 세부 내용 작성
  wineName: [], // 와인 이름 배열
  meetingDate: new Date(),
  meetingTime: [new Date(), new Date()], // ISO 형식의 시간 지정
  location: "", // 위치 지정
  locatedPoint: "0, 0", // 위경도 형식의 좌표
  jointedCost: 0, // 참가 비용
  joinCount: 0, // 현재 참가자 수
  totalJoinCount: 0, // 총 참가자 수
  createdClub: "", // 클럽 이름
});


interface ListItem {
  value: string
  label: string
}

const list = ref<ListItem[]>([])
const value = ref<string[]>([])
const loading = ref(false)
const options = ref<ListItem[]>([])

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = list.value.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    options.value = []
  }
}

const emitSubmit = async () => {
  try {
    clubCreateMeeting.value.wineName = value.value
    await makeTheNewMeeting(clubCreateMeeting.value);
    emits('emitCancel');  // 다이얼로그 닫기 이벤트를 부모에게 전달
  } catch (error) {
    console.error("Error creating meeting:", error);
    // 에러 처리 로직, 예를 들어 사용자에게 에러 메시지를 보여줄 수 있습니다.
  }
}



onMounted(async () => {
  try {
    clubCreateMeeting.value.createdClub = logInStore.getTempUrl.toString()

    const wineNames: [] = await getTheWineNameList();
    list.value = wineNames.map(item => ({
      value: `${item}`,
      label: `${item}`,
    }));
  } catch (error) {
    console.error("Error loading wine names:", error);
  }
});

let timer: ReturnType<typeof setTimeout> | null = null; // 타이머를 관리하기 위한 변수
let firstCall = true; // 첫 호출을 관리하기 위한 플래그

watch(clubCreateMeeting.value, async (newValue, oldValue) => {
  if (firstCall) { // 첫 호출은 즉시 실행
    firstCall = false; // 다음 호출을 지연시키도록 플래그를 업데이트
    await loadWineNames();
    return;
  }

  if (timer) { // 기존 타이머가 있으면 취소
    clearTimeout(timer);
  }

  // 이후 호출은 3초 지연시켜 실행
  timer = setTimeout(async () => {
    await loadWineNames();
    timer = null; // 타이머 초기화
  }, 3000);

}, { immediate: true }); // 첫 호출은 즉시 실행되도록 설정



async function loadWineNames() {
  try {
    const wineNames: string[] = await getTheWineNameList(); // 와인 이름 목록을 얻는 API 호출
    list.value = wineNames.map(item => ({
      value: item, // 문자열 값 설정
      label: item, // 라벨을 동일하게 설정
    }));
  } catch (error) {
    console.error("Error loading wine names:", error);
  }
}


</script>

<style scoped>

</style>
