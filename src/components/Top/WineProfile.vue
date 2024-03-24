<template>
  <el-row class="demo-avatar demo-basic">
    <el-col :span="12">
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="50" :src="circleUrl"/>
        </div>
      </div>
    </el-col>
  </el-row>

</template>
<script lang="ts" setup>
import {reactive, toRefs} from 'vue'

const state = reactive({
  circleUrl:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
      'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})

const {circleUrl, squareUrl, sizeList} = toRefs(state)
</script>


<style scoped>
.demo-basic {
  text-align: center;
}

.demo-basic .sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; /* demo-basic--circle 아래 간격 추가 */
}

.demo-basic .block:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.demo-basic .block {
  flex: 1;
}

.demo-basic .el-col:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}



.buttons-vertical {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 버튼 사이 간격 */
}

.buttons-vertical .el-button {
  width: 100%; /* 모든 버튼을 부모 컨테이너의 너비에 맞춤 */
}

</style>