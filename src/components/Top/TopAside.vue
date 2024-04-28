<template>
  <div>
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '2']">
          <el-sub-menu index="1">
            <template #title>
              <!-- #title 슬롯에 스타일을 직접 적용합니다 -->
              <span style="font-size: 15px;">
                <el-icon><message/></el-icon>피드
              </span>
            </template>
            <el-menu-item-group>
              <el-menu-item @click="navigateToFeedAll">전 체</el-menu-item>
              <el-menu-item index="1-2">내 모임 피드</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="2">
            <template #title>
              <!-- #title 슬롯에 스타일을 직접 적용합니다 -->
              <span style="font-size: 15px;">
                <el-icon><message/></el-icon>모임
              </span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="centerDialogVisibleFun">모임 가입</el-menu-item>
              <el-menu-item index="2-2" @click="navigateToWineCommunity">내 모임</el-menu-item>
              <el-menu-item index="2-3">모임 만들기</el-menu-item>
              <el-menu-item index="2-4">정모 일정</el-menu-item>
              <el-menu-item index="2-5">친구 초대</el-menu-item>
              <el-menu-item index="2-6">신규 모임</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <setting/>
              </el-icon>
              저장 피드
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

          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <setting/>
              </el-icon>
              이벤트
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="4-1">Option 1</el-menu-item>
              <el-menu-item index="4-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="4-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="4-4">
              <template #title>Option 4</template>
              <el-menu-item index="4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <setting/>
              </el-icon> 쇼핑
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="4-1">Option 1</el-menu-item>
              <el-menu-item index="4-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="4-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="4-4">
              <template #title>Option 4</template>
              <el-menu-item index="4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <setting/>
              </el-icon> 친구
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="4-1">Option 1</el-menu-item>
              <el-menu-item index="4-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="4-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="4-4">
              <template #title>Option 4</template>
              <el-menu-item index="4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <setting/>
              </el-icon> Wine Festival
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="4-1">Option 1</el-menu-item>
              <el-menu-item index="4-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="4-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="4-4">
              <template #title>Option 4</template>
              <el-menu-item index="4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>

        </el-menu>
      </el-scrollbar>
    </el-aside>
  </div>


  <el-dialog
      v-model="centerDialogVisible"
      title="Notice"
      width="500"
      destroy-on-close
      center
  >
    <span>
      Notice: before dialog gets opened for the first time this node and the one
      bellow will not be rendered
    </span>
    <div>
      <strong>Extra content (Not rendered)</strong>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>








</template>

<script setup lang="ts">

import { useRouter } from 'vue-router';
import {Message, Setting} from "@element-plus/icons-vue";
import {ref} from "vue";
import apiClient from "@/api/login.ts";
import { useLogInStore } from '@/stores/logInStore.ts';

  const router = useRouter();

  const logInStore = useLogInStore();

  const centerDialogVisible = ref(false);

  const centerDialogVisibleFun = () => {
    if(logInStore.isLogIn == true) {
      console.log("로그???")
      centerDialogVisible.value = true;
    }
  }

  const navigateToWineCommunity = () => {
    router.push({ name: 'WineCommunity' });
  };

const navigateToFeedAll = () => {
  router.push({ name: 'FeedLayout' });
};




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