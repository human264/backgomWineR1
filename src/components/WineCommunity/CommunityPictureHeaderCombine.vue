<template>
  <div class="page-container">
    <el-container>
      <el-header class="el-header">
        <CommunityPictureHeader></CommunityPictureHeader>
      </el-header>
      <el-main class="el-main">
        <div>
          <CommunityMain></CommunityMain>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">;
import CommunityMain from "@/components/WineCommunity/CommunityMain.vue";
import CommunityPictureHeader from "@/components/WineCommunity/CommunityPictureHeader.vue";

</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
}

.el-header {
  margin-top: -20px;
  height: 100px; /* 또는 실제 헤더 높이에 맞게 조정 */
}

.el-main {
  margin-top: 130px; /* 헤더 높이와 동일하게 설정 */
}
</style>