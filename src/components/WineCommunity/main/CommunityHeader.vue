<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">


    </el-menu-item>

    <div class="flex-grow"/>
    <el-menu-item index="home">홈</el-menu-item>
    <el-badge :value="12" class="item">
      <el-menu-item index="board">게시판</el-menu-item>
    </el-badge>
    <el-badge :value="12" class="item">
      <el-menu-item index="meeting">모임</el-menu-item>
    </el-badge>
    <el-badge :value="12" class="item">
      <el-menu-item index="picture">사진첩</el-menu-item>
    </el-badge>
    <el-badge :value="12" class="item">
      <el-menu-item index="wineAfter">후기</el-menu-item>
    </el-badge>
    <el-badge :value="12" class="item">
      <el-menu-item index="wineChat">채팅</el-menu-item>
    </el-badge>
    <el-badge :value="12" class="item">
      <el-menu-item index="event">Event</el-menu-item>
    </el-badge>

  </el-menu>
</template>


<script lang="ts">
import {ref, defineComponent} from 'vue';
import {useRouter} from 'vue-router';
import {useLogInStore} from "@/stores/logInStore.ts";

export default defineComponent({
  setup() {
    const router = useRouter();
    const activeIndex = ref('home'); // 초기 활성화된 메뉴 아이템
    const store = useLogInStore()
    const handleSelect = (key: string) => {
      // 예를 들어, 현재 communityName이 'exampleCommunity'라고 가정
      const communityName = store.getTempUrl;
      const path = `/WineCommunity/${communityName}/${key}`;
      router.push(path);
    };

    return {activeIndex, handleSelect};
  },
});
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
