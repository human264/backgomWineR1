<template>
  <el-card style="max-width: 600px; margin: auto; height: 180px">
    <template #header>
      <slot name="header">Default Title</slot>
    </template>
    <slot></slot>
  </el-card>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>