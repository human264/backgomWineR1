<template>
  <div class="block text-center">
    <el-carousel height="200px" :autoplay="false"> <!-- 자동 슬라이드 비활성화 -->
      <el-carousel-item v-for="item in 7" :key="item">
        <CommunityPlanCard></CommunityPlanCard>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<script setup lang="ts">
import CommunityPlanCard from "@/components/WineCommunity/CommunityPlanCard.vue";
</script>