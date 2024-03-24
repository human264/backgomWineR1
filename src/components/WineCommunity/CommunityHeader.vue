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
    <div class="flex-grow" />
    <el-menu-item index="1">홈</el-menu-item>
    <el-menu-item index="2">게시판</el-menu-item>
    <el-menu-item index="3">사진첩</el-menu-item>
    <el-menu-item index="4">후기</el-menu-item>
    <el-menu-item index="5">채팅</el-menu-item>
    <el-menu-item index="6">Event 참석</el-menu-item>
    <el-menu-item index="7">Event 정보</el-menu-item>

  </el-menu>
</template>


<script lang="ts" >

import { ref } from 'vue'

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
</style>