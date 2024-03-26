<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <wine-header></wine-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <top-aside></top-aside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import wineHeader from "@/components/Top/TopHeader.vue"
import TopAside from "@/components/Top/TopAside.vue";



</script>