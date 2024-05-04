<template>
  <div>
    <el-dialog
        v-model="props.dialogVisible"
        title="와인 정보 입력"
        width="500"
        destroy-on-close
        draggable
        center
        @close="$emit('emitCancel')"
    >
      <el-form :model="form" label-width="auto" style="max-width: 600px">

        <el-form-item label="와인 이름" style="margin-left: 50px">
          <el-input v-model="form.name" style="width: 240px"
                    placeholder="와인 이름을 입력해주세요"/>
        </el-form-item>

        <el-form-item label="와인 종류" style="margin-left: 50px">
          <el-select v-model="form.type" style="width: 240px"
                     placeholder="와인 종류를 선택해주세요">
            <el-option label="레드와인" value="레드와인"/>
            <el-option label="로제와인" value="로제와인"/>
            <el-option label="화이트와인" value="화이트와인"/>
            <el-option label="샴페인" value="삼페인"/>
            <el-option label="아이스와인" value="아이스와인"/>
          </el-select>
        </el-form-item>

        <el-form-item label="와인 지역" style="margin-left: 50px">
          <el-input v-model="form.region" style="width: 240px"
                    placeholder="와인 지역을 입력해주세요"/>
        </el-form-item>

        <el-form-item label="와이너리" style="margin-left: 50px">
          <el-input v-model="form.winery" style="width: 240px"
                    placeholder="와이너리를 입력해주세요"/>
        </el-form-item>

        <el-form-item label="빈티지" style="margin-left: 50px">
          <el-input v-model="form.vintage" style="width: 240px"
                    placeholder="와인 수확년도를 입력해주세요"/>
        </el-form-item>

        <el-form-item label="당도" style="margin-left: 50px">
          <el-rate
              v-model="form.sweetness"
              clearable
              allow-half
              :texts="['전혀 달지 않다', '조금 달다', '보통', '보통 보다 달다', '매우 달다']"
              show-text
          />
        </el-form-item>

        <el-form-item label="바디" style="margin-left: 50px">
          <el-rate
              v-model="form.body"
              clearable
              allow-half
              :texts="['라이트바디', '라이트 미드바디 사이', '미드', '미드 풀바디 사이', '풀바디']"
              show-text
          />
        </el-form-item>

        <el-form-item label="농도" style="margin-left: 50px">
          <el-rate
              v-model="form.density"
              clearable
              allow-half
          />
        </el-form-item>


        <el-form-item label="신맛" style="margin-left: 50px">
          <el-rate
              v-model="form.acidity"
              clearable
              allow-half
          />
        </el-form-item>

        <el-form-item label="탄닌" style="margin-left: 50px">
          <el-rate
              v-model="form.tannins"
              clearable
              allow-half
          />
        </el-form-item>

        <el-form-item label="향" style="margin-left: 50px">
          <el-input v-model="form.anoma"
                    style="width: 240px"
                    placeholder="모임 내용을 입력해주세요"/>
        </el-form-item>


      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="onSubmitToApi">
            입력
          </el-button>
          <el-button @click="$emit('emitCancel')">취소</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">

import {onMounted, ref, watch, defineProps, reactive} from "vue";
import {
  getTheWineAfterMeetingList,
  getTheWineNameList,
  inputTheWineInfo,
  makeTheNewMeeting
} from "@/api/wineMeeting.ts";
import {ClubMeetingCreate, WineInfo} from "@/types/ClubInfo.ts";
import {useLogInStore} from "@/stores/logInStore.ts";

const form = ref<WineInfo>({
  name: "",
  type:"",
  region: "",
  winery: "",
  vintage: "",
  sweetness: 0.0,
  acidity: 0.0,
  alcohol: 0.0,
  body: 0.0,
  density: 0.0,
  tannins: 0.0,
  anoma: ""
})

const onSubmitToApi = async () => {

  await inputTheWineInfo(form.value)
  return 0;
}
const logInStore = useLogInStore();

const props = defineProps({
  dialogVisible: Boolean,
})


watch(dialogFormVisible, async (newVal, oldVal) => {
  if (dialogFormVisible.value == true) {
    joinedWineList.value = await getTheWineAfterMeetingList()
  }
})



</script>

<style scoped>

</style>
