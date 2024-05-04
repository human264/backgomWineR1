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
              <el-menu-item index="2-3" @click="makeTheClub">모임 만들기</el-menu-item>
              <el-menu-item index="2-4" >정모 일정</el-menu-item>
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
      title="모임 생성"
      width="500"
      destroy-on-close
      center
  >
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="와인 모임 이름">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="모임 지역">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="연령대">
        <el-col :span="11">
          <el-input v-model="form.name" style="padding-right: 20px" />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox value="Online activities" name="type">
            Online activities
          </el-checkbox>
          <el-checkbox value="Promotion activities" name="type">
            Promotion activities
          </el-checkbox>
          <el-checkbox value="Offline activities" name="type">
            Offline activities
          </el-checkbox>
          <el-checkbox value="Simple brand exposure" name="type">
            Simple brand exposure
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio value="Sponsor">Sponsor</el-radio>
          <el-radio value="Venue">Venue</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">

import { useRouter } from 'vue-router';
import {Message, Setting} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import apiClient from "@/api/login.ts";
import { useLogInStore } from '@/stores/logInStore.ts';

  const router = useRouter();

  const logInStore = useLogInStore();

  const centerDialogVisible = ref(false);

const makeTheClub = () => {
  if (logInStore.isLogIn == true) {
    centerDialogVisible.value = true;
  }
}


const centerDialogVisibleFun = () => {

  router.push({name: 'WineCommunityToJoin'});

}

const navigateToWineCommunity = () => {
  router.push({name: 'WineCommunity'});
};

const navigateToFeedAll = () => {
  router.push({name: 'FeedLayout'});
};


// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}


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
