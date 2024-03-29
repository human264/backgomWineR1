<template>
  <div>
    <el-card style="max-width: 300px">
      <template #header> 백곰 와인
        <br/>
        <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
        />
        <br/>
        <el-button circle style="scale: 120%; font-size: 10px">100명</el-button>
        <el-button circle style="scale: 120%; font-size: 10px">정모</el-button>
        <el-button circle style="scale: 120%; font-size: 10px">번개</el-button>
        <el-button circle style="scale: 120%; font-size: 10px">지역</el-button>
      </template>

      <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          style="width: 100%; cursor: pointer;"
          @click="onClickImage"
      />
      <el-divider border-style="dotted" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {Search} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";


const value = ref(5)
const router = useRouter() // useRouter 훅을 사용하여 라우터 인스턴스를 가져옵니다.

// 이미지 클릭 이벤트 핸들러
function onClickImage() {
  const pathValue = 'yourPathValue' // 여기에 동적으로 결정할 path 값을 설정합니다.
  router.push(`/WineCommunity/${pathValue}`) // 프로그래매틱 네비게이션으로 경로 이동
}
</script>

<style lang="scss" scoped>

</style>