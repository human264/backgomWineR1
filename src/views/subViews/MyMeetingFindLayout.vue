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
          style="width: 100%"
      />
      <el-divider border-style="dotted" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {Search} from "@element-plus/icons-vue";

const value = ref(5)
</script>

<style lang="scss" scoped>

</style>