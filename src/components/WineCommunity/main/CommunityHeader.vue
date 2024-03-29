<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">


adsf    </el-menu-item>

    <div class="flex-grow" />
    <el-menu-item index="home">홈</el-menu-item>
    <el-menu-item index="board">게시판</el-menu-item>
    <el-menu-item index="3">모임</el-menu-item>
    <el-menu-item index="picture">사진첩</el-menu-item>
    <el-menu-item index="5">후기</el-menu-item>
    <el-menu-item index="6">채팅</el-menu-item>
    <el-menu-item index="7">Event 참석</el-menu-item>
    <el-menu-item index="8">Event 정보</el-menu-item>

  </el-menu>
</template>


<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const activeIndex = ref('home'); // 초기 활성화된 메뉴 아이템

    const handleSelect = (key: string) => {
      // 예를 들어, 현재 communityName이 'exampleCommunity'라고 가정
      const communityName = 'exampleCommunity';
      const path = `/WineCommunity/${communityName}/${key}`;
      router.push(path);
    };

    return { activeIndex, handleSelect };
  },
});
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>