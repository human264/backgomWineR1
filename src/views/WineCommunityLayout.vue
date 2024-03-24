<template>
  <div class="common-layout" >
    <el-container style="height: 800px">
      <el-header>
        <CommunityHeader></CommunityHeader>
      </el-header>
      <el-main>
        <CommunityPictureHeaderCombine></CommunityPictureHeaderCombine>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import CommunityHeader from "@/components/WineCommunity/CommunityHeader.vue";
import CommunityPictureHeaderCombine from "@/components/WineCommunity/CommunityPictureHeaderCombine.vue";

</script>


<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>