<template>
  <div class="demo-image__error">
    <div class="block">
      <el-image>
        <template #error>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Picture as IconPicture } from '@element-plus/icons-vue'
</script>

<style scoped>
.demo-image__error .block {
  padding: 30px 0;
  text-align: center;
  display: block; /* 변경: inline-block에서 block으로 */
  width: 100%; /* 변경: 전체 너비 차지 */
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__error .el-image {
  padding: 0 5px;
  max-width: 100%; /* 변경: 최대 너비를 100%로 설정 */
  max-height: 200px;
  width: 100%; /* 이미 설정된 대로 */
  height: 200px; /* 이미 설정된 대로, 필요에 따라 조정 */
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* 이미 설정된 대로 */
  height: 100%; /* 변경: 컨테이너의 전체 높이 차지 */
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
  border-radius: 15px; /* 추가: 둥근 모서리 적용 */
}
</style>