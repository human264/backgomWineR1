<template>
  <div class="club-container">
    <div v-for="handle in fetchMyJoinedClubApi" :key="handle.id" class="club-card">
      <el-card style="max-width: 100%">
        <template #header>
          {{ handle.clubSubject }}
          <br/>
          <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value} points" />
          <br/>
          <el-button circle style="scale: 120%; font-size: 10px">{{ handle.clubMemberNo }}명</el-button>
          <el-button circle style="scale: 120%; font-size: 10px">{{ handle.theJungMoExists }}</el-button>
          <el-button circle style="scale: 120%; font-size: 10px">{{ handle.theBunGaeExists }}</el-button>
          <el-button circle style="scale: 120%; font-size: 10px">{{ handle.location }}</el-button>
        </template>
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
             style="width: 100%; cursor: pointer;" @click="onClickImage"/>
        <el-divider border-style="dotted"/>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { ClubInfo } from "@/types/ClubInfo.ts";
import { fetchMyJoinedClubs } from "@/api/wineMeeting.ts";

const router = useRouter();
const fetchMyJoinedClubApi = ref<ClubInfo[]>([]);
const value = ref(5);

onMounted(async () => {
  fetchMyJoinedClubApi.value = await fetchMyJoinedClubs();
});

// 이미지 클릭 이벤트 핸들러
function onClickImage() {
  const pathValue = 'yourPathValue'; // 이 값은 동적으로 결정되어야 함
  router.push(`/WineCommunity/${pathValue}`);
}

</script>

<style lang="scss" scoped>
.club-container {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
}

.club-card {
  flex: 0 0 18%; // 각 카드의 기본 크기 설정 (5개를 위해 조금 더 작게 설정하여 여백 확보)
  margin-right: 20px;
  margin-bottom: 20px; // 카드 간의 수직 간격
}
</style>