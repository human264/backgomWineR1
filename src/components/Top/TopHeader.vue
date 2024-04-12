<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect">
    <el-menu-item index="0">
      <WineProfile @click="toLogIn"></WineProfile>
    </el-menu-item>

    <div class="flex-grow"></div>
    <!-- el-badge를 el-menu-item 바깥으로 옮기고, 스타일을 조정합니다 -->
    <el-badge :value="12" class="item">
      <el-menu-item index="1">공지사항</el-menu-item>
    </el-badge>
    <el-badge :value="12" class="item">
      <el-menu-item index="2">모임알림</el-menu-item>
    </el-badge>
    <el-badge :value="12" class="item">
      <el-menu-item index="3">Shopping 알림</el-menu-item>
    </el-badge>
    <el-badge :value="12" class="item">
      <el-menu-item index="4">Event 알림</el-menu-item>
    </el-badge>

  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import WineProfile from "@/components/Top/WineProfile.vue";

export default defineComponent({
  components: { WineProfile },
  setup() {
    const router = useRouter();
    const activeIndex = ref('1');

    const toLogIn = () => {
      router.push({ name: 'LogIn' });
    };

    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };

    // 모든 정의한 변수와 함수를 반환합니다.
    return { activeIndex, toLogIn, handleSelect };
  },
});
</script>
<style>
.flex-grow {
  flex-grow: 1;
}

.item {
  margin-top: 0; /* 필요에 따라 조정 */
  /* 마진 값 조정 */
}

/* 추가적으로 필요한 스타일이 있으면 여기에 추가 */
</style>