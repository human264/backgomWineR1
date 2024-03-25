<template>
  <div>
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <!-- #title 슬롯에 스타일을 직접 적용합니다 -->
              <span style="font-size: 15px;">
                <el-icon><message/></el-icon>피드
              </span>
            </template>
            <el-menu-item-group>
              <template #title>내 모임</template>
              <el-menu-item index="1-1">Option 1</el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">Option 3</el-menu-item>
            </el-menu-item-group>

          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
                      <span style="font-size: 15px;">
              <el-icon><icon-menu/></el-icon>
              모임
              </span>
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">내 모임</el-menu-item>
              <el-menu-item index="2-2">모임 만들기</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <setting/>
              </el-icon>
              Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* el-sub-menu 타이틀 폰트 크기 조정 */
.el-sub-menu .el-icon + span {
  font-size: 18px; /* 원하는 크기로 조정 */
}

/* el-menu-item-group 타이틀 폰트 크기 조정 */
.el-menu-item-group__title {
  font-size: 18px; /* 원하는 크기로 조정 */
}
</style>