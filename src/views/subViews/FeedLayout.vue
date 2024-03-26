<template>
  <div class="infinite-list-wrapper .list-item" style="overflow: auto; height: 700px;
margin-right: 10px; padding-right: 20px; padding-left: 10px; margin-bottom: 20px">
    <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
      <li v-for="i in count" :key="i">

        <el-card class="centered-card">
          <template #header> 3/22 와인 정모 </template>
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 5" :key="item">
              <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-card>

        </li>
    </ul>
    <p v-if="loading">Loading...</p>
    <p v-if="noMore">No more</p>
  </div>
</template>

<script lang="ts" setup>

import { computed, ref } from 'vue'

const count = ref(10)
const loading = ref(false)
const noMore = computed(() => count.value >= 20)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
  loading.value = true
  setTimeout(() => {
    count.value += 2
    loading.value = false
  }, 2000)
}
</script>

<style>
.infinite-list-wrapper {
  height: 300px;
  text-align: center;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-bottom: 20px; /* 아래쪽으로 20px 여백 추가 */
  width: 100%; /* 가로 전체를 사용하도록 설정 */
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.infinite-list-wrapper .list-item {
  margin-top: 10px;
}

/* Webkit 브라우저를 위한 스크롤바 스타일 */
.infinite-list-wrapper::-webkit-scrollbar {
  width: 8px; /* 스크롤바의 너비 */
}

.infinite-list-wrapper::-webkit-scrollbar-track {
  background: var(--el-color-primary-light-9); /* 스크롤바 트랙 색상 */
}

.infinite-list-wrapper::-webkit-scrollbar-thumb {
  background: var(--el-color-primary); /* 스크롤바 썸(핸들) 색상 */
  border-radius: 4px; /* 스크롤바 썸의 둥근 모서리 */
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.centered-card {
  margin: 0 auto; /* 가운데 정렬 */
  margin-bottom: 20px; /* 아래쪽 여백 추가 */
  max-width: 500px; /* 최대 너비 설정 */
}
</style>