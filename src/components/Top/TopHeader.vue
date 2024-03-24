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

    <div class="flex-grow"/>
    <el-badge :value="12" class="item">
    <el-menu-item index="1">공지사항</el-menu-item>
    </el-badge>
    <el-menu-item index="2">모임알림</el-menu-item>
    <el-menu-item index="3">Shopping 알림</el-menu-item>
    <el-menu-item index="4">Event 알림</el-menu-item>


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
  margin-top: 10px;
  margin-right: 40px;
}

.el-dropdown {
  margin-top: 1.1rem;
}

</style>