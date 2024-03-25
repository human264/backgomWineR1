<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect">
    <el-menu-item index="0">
      <WineProfile></WineProfile>
    </el-menu-item>

    <div class="flex-grow"></div>
    <!-- 여기서 el-badge를 el-menu-item 바깥으로 옮기고, 스타일을 조정합니다 -->
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

import {ref} from 'vue'
import {defineComponent} from "vue";
import WineProfile from "@/components/Top/WineProfile.vue";

export default defineComponent({
  components: {WineProfile}
})


const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

export class WineHeader {
}
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