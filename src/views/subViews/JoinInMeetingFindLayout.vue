<template>
  <div class="club-container">
    <div v-for="handle in fetchMyJoinedClub" :key="handle.id" class="club-card">
      <el-card style="max-width: 100%">
        <template #header>
          {{ handle.clubsubject }}
          <br/>
          <el-rate v-model="handle.point" disabled show-score text-color="#ff9900" score-template="{value} points"/>
          <br/>
          <el-button circle style="scale: 120%; font-size: 10px">{{ handle.clubmemberno }}</el-button>
          <el-button circle style="scale: 120%; font-size: 10px">{{ handle.location }}</el-button>
          <el-button @click="joinInTheClub(handle.id.toString())"> 가 입</el-button>
        </template>
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
             style="width: 100%; cursor: pointer;" @click=""/>
        <el-divider border-style="dotted"/>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, onUpdated} from 'vue';
import {useRouter} from "vue-router";
import {findClubsToJoin, joinInTheClubApi} from "@/api/wineMeeting.ts";
import {DIClubInfo} from "@/types/DIClubInfo.ts";

const router = useRouter();
const fetchMyJoinedClub = ref<DIClubInfo[]>([]);
const value = ref(5);

const joinInTheClub = async (id: string) => {
  await joinInTheClubApi(id)
}

onUpdated(async () => {
  fetchMyJoinedClub.value = await findClubsToJoin();
})

onMounted(async () => {
  fetchMyJoinedClub.value = await findClubsToJoin();

});


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
