<template>
  <div>
    <el-dialog
        v-model="props.dialogFormVisible"
        title="모임 후기 작성" width="800"
        @close="$emit('emitCancel')"
    >

      <div style="width: 100%; height: 480px">
        <el-tabs type="border-card" class="demo-tabs">
          <el-tab-pane>
            <template #label>

        <span class="custom-tabs-label">
          <el-icon></el-icon>
          <span>후기</span>
        </span>
            </template>
            <el-scrollbar height="400px">
              <el-form :model="afterTalkForm">
                <el-form-item label="모임" :label-width="formLabelWidth">
                  <el-select v-model="afterTalkForm.meeting" placeholder="참여 모임 선택">

                    <el-option v-for="meeting in afterTalkForm.meeting"
                               :key="meeting.uuid" :label="meeting.subject" :value="meeting.uuid"/>

                  </el-select>
                </el-form-item>

                <el-form-item label="후기" :label-width="formLabelWidth">
                  <el-input
                      v-model="afterTalkForm.afterTalk"
                      style="width: 100%"
                      :rows="4"
                      type="textarea"
                      placeholder="후기를 입력해주세요"
                  />
                </el-form-item>


                <el-form-item label="별점" :label-width="formLabelWidth">
                  <el-rate v-model="afterTalkForm.totalPoint" clearable/>
                </el-form-item>

                <el-form-item label="사진 업로드" :label-width="formLabelWidth">
                  <el-upload
                      v-model:file-list="afterTalkForm.meetingPhoto"
                      accept="image/*"
                      list-type="picture-card" :auto-upload="false"
                      :disabled="disabledPictureUpload"
                  >
                    <el-icon>
                      <Plus/>
                    </el-icon>

                    <template #file="{ file }">
                      <div>
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
                        <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-preview"
              @click="handlePreview(file)"
          >
            <el-icon><zoom-in/></el-icon>
          </span>

          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><Delete/></el-icon>
          </span>
        </span>
                      </div>
                    </template>
                  </el-upload>
                </el-form-item>

              </el-form>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="TastyNote">
            <div>
              <el-scrollbar height="400px">

                <el-form-item label="와인 이름" :label-width="formLabelWidth">
                  <el-select v-model="afterTalkForm.wineName" placeholder="와인 이름 선택" style="width: 250px">
                    <el-option label="Zone No.1" value="shanghai"/>
                    <el-option label="Zone No.2" value="beijing"/>

                  </el-select>
                </el-form-item>

                <el-form-item label="와인 지역" :label-width="formLabelWidth">
                  <el-input
                      v-model="afterTalkForm.wineRegion"
                      style="width: 240px"
                      placeholder="와인 지역을 입력해주세요"
                      clearable
                  />
                </el-form-item>

                <el-form-item label="와인 공장" :label-width="formLabelWidth">
                  <el-input
                      v-model="afterTalkForm.wineFactory"
                      style="width: 240px"
                      placeholder="와인 공장을 입력해주세요"
                      clearable
                  />
                </el-form-item>

                <el-form-item label="Vintage" :label-width="formLabelWidth">
                  <el-date-picker
                      v-model="afterTalkForm.wineVintage"
                      type="year"
                      placeholder="포도 수확 년도를 입력해주세요"
                  />
                </el-form-item>

                <el-form-item label="Variety" :label-width="formLabelWidth">
                  <el-input
                      v-model="afterTalkForm.wineVariety"
                      style="width: 240px"
                      placeholder="포도의 품종을 입력해주세요"
                      clearable
                  />
                </el-form-item>

                <el-form-item label="Date" :label-width="formLabelWidth">
                  <div class="block">
                    <el-date-picker
                        v-model="afterTalkForm.inputDate"
                        type="date"
                        placeholder="모임 일자를 입력해주세요"
                        :disabled-date="disabledDate"
                        :shortcuts="shortcuts"
                        :size="size"
                    />
                  </div>
                </el-form-item>

                <el-form-item>
                  <el-form-item label="당도" :label-width="formLabelWidth">
                    <el-rate
                        v-model="afterTalkForm.sweetness"
                        clearable
                        allow-half
                        :texts="['전혀 달지 않음', '조금 단맛', '보통', '중간 이상 단맛', '아주 달다!!']"
                        show-text
                    />
                  </el-form-item>

                  <el-form-item label="산도" :label-width="formLabelWidth">
                    <el-rate
                        v-model="afterTalkForm.acidity"
                        clearable
                        allow-half
                        :texts="['신맛 없음', '조금 신맛', '보통', '중간 이상 신맛', '아이셔!!!!']"
                        show-text
                    />
                  </el-form-item>
                </el-form-item>

                <el-form-item>
                  <el-form-item label="바디" :label-width="formLabelWidth">
                    <el-rate
                        v-model="afterTalkForm.body"
                        clearable
                        allow-half
                        :texts="['아주 가벼움', '가벼운', '보통', '보통 보다 조금 더', '무거움']"
                        show-text
                    />
                  </el-form-item>

                  <el-form-item label="알콜" :label-width="formLabelWidth">
                    <el-rate
                        v-model="afterTalkForm.alcohol"
                        clearable
                        allow-half
                        :texts="['전혀 느껴지지 않음', '조금 느껴짐', '보통', '보통 보다 조금 더', '심함']"
                        show-text
                    />
                  </el-form-item>
                </el-form-item>

                <el-form-item>
                  <el-form-item label="타닌"
                                :label-width="formLabelWidth"
                  >
                    <el-rate
                        v-model="afterTalkForm.tannins"
                        clearable
                        allow-half
                        :texts="['전혀 느껴지지 않음', '조금 느껴짐', '보통', '보통 보다 조금 더', '심함']"
                        show-text
                    />


                  </el-form-item>

                  <el-form-item label="와인 총 별점" :label-width="formLabelWidth">
                    <el-rate
                        v-model="afterTalkForm.totalWinePoint"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value} points"
                    />
                  </el-form-item>

                </el-form-item>

                <el-form-item label="와인 Numbering" :label-width="formLabelWidth">
                  <el-input
                      v-model="afterTalkForm.wineNumber"
                      style="width: 240px"
                      placeholder="와인 일년번호 입력해주세요"
                      clearable
                  />
                </el-form-item>

                <el-form-item label="와인 색" :label-width="formLabelWidth">
                  <el-select v-model="afterTalkForm.wineColor" placeholder="와인 색 선택 바랍니다." style="width: 250px">
                    <el-option label="스파클링 와인" value="스파클링 와인"/>
                    <el-option label="화이트 와인" value="화이트 와인"/>
                    <el-option label="레드 와인" value="레드 와인"/>
                    <el-option label="로제 와인" value="로제 와인"/>
                    <el-option label="디저트 와인" value="디저트 와인"/>
                  </el-select>
                </el-form-item>
              </el-scrollbar>
            </div>

          </el-tab-pane>
          <el-tab-pane label="AromaNote">

            <div>
              <el-scrollbar height="400px">

                <el-form-item label="과일향" :label-width="formLabelWidth">
                  <el-input
                      v-model="afterTalkForm.wineFruitSmell"
                      style="width: 240px"
                      placeholder="어떤 과일향이 느껴지시나요?"
                      clearable
                  />
                </el-form-item>

                <el-form-item label="꽃향" :label-width="formLabelWidth">
                  <el-input
                      v-model="afterTalkForm.wineFlowerSmell"
                      style="width: 240px"
                      placeholder="어떤 꽃향이 느껴주시나요?"
                      clearable
                  />
                </el-form-item>

                <el-form-item label="스파이스" :label-width="formLabelWidth">
                  <el-rate
                      v-model="afterTalkForm.wineSpacy"
                      clearable
                      allow-half
                      :texts="['전혀 느껴지지 않음', '조금 매운맛 느껴짐', '보통', '보통 보다 매콤', '매콤 그 잡채']"
                      show-text
                  />
                </el-form-item>

                <el-form-item label="허브" :label-width="formLabelWidth">
                  <el-input
                      v-model="afterTalkForm.wineHerb"
                      style="width: 240px"
                      placeholder="느껴지는 허브향을 입력해주세요"
                      clearable
                  />
                </el-form-item>

                <el-form-item label="오크" :label-width="formLabelWidth">
                  <el-rate
                      v-model="afterTalkForm.wineOak"
                      clearable
                      allow-half
                      :texts="['전혀 느껴지지 않음', '조금 느껴짐', '보통', '보통 보다 더 느껴짐', '오크 향 풀로 느껴짐']"
                      show-text
                  />
                </el-form-item>

                <el-form-item label="기타" :label-width="formLabelWidth">
                  <el-input
                      v-model="afterTalkForm.other"
                      style="width: 240px"
                      placeholder="기타 느껴지는 향을 입력해주세요"
                      clearable
                  />
                </el-form-item>


                <el-form-item label="Detail Note" :label-width="formLabelWidth">
                  <el-input
                      v-model="afterTalkForm.detailNote"
                      style="width: 240px"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      type="textarea"
                      placeholder="추가 입력사항"
                  />
                </el-form-item>


              </el-scrollbar>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>


      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" :icon="Edit" @click="dialogFormVisible = false">
            작성
          </el-button>
          <el-button @click="$emit('emitCancel')">취소</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">

import {Delete, Edit, Plus, ZoomIn} from "@element-plus/icons-vue";
import {ElNotification, ElUpload} from "element-plus";
import {onMounted, onUpdated, reactive, watch} from "vue";
import apiClient from "@/api/login.ts";
import {getTheWineAfterMeetingList} from "@/api/wineMeeting.ts";

const props = defineProps(['dialogFormVisible'])
const emits = defineEmits(['dialogFormVisible'])

const afterTalkForm = reactive({
  meeting: [],           // List<String> in Java
  afterTalk: '',         // String in Java
  totalPoint: 0.0,       // Double in Java
  meetingPhoto: [],      // MultipartFile[] in Java, 파일은 자바스크립트 File 객체 배열로 처리
  wineName: '',         // List<String> in Java
  wineRegion: '',        // String in Java
  wineFactory: '',       // String in Java
  wineVintage: '',
  wineVariety: '',       // String in Java
  inputDate: null as Date | null,
  sweetness: 0.0,        // Double in Java
  acidity: 0.0,          // Double in Java
  body: 0.0,             // Double in Java
  tannins: 0.0,          // Double in Java
  alcohol: 0.0,          // Double in Java
  totalWinePoint: 0.0,   // Double in Java
  wineNumber: '',        // String in Java
  wineColor: '',         // String in Java
  wineFruitSmell: '',    // String in Java
  wineFlowerSmell: '',   // String in Java
  wineSpacy: 0.0,        // Double in Java
  wineHerb: '',          // String in Java
  wineOak: 0.0,          // Double in Java
  other: '',             // String in Java
  detailNote: ''         // String in Java
})


watch(afterTalkForm, (newVal, oldVal) => {
  const tempTotalWinePoint = afterTalkForm.sweetness + afterTalkForm.acidity + afterTalkForm.body + afterTalkForm.alcohol + afterTalkForm.tannins
  afterTalkForm.totalWinePoint = (tempTotalWinePoint == 0.0 ? 0.0 : (tempTotalWinePoint / 5).toFixed(1))
})

const value = ref('')
const options = [
  {
    label: 'Popular cities',
    options: [
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Beijing',
        label: 'Beijing',
      },
    ],
  },
  {
    label: 'City name',
    options: [
      {
        value: 'Chengdu',
        label: 'Chengdu',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
      {
        value: 'Dalian',
        label: 'Dalian',
      },
    ],
  },
]

const formLabelWidth = '150px'


const onSubmit = async () => {
  const formData = new FormData();

  // Array를 처리하는 방식에 주목하세요. 각 meeting 요소를 개별적으로 추가합니다.
  afterTalkForm.meeting.forEach(meetingItem => {
    formData.append('meeting', meetingItem);
  });
  formData.append('afterTalk', afterTalkForm.afterTalk);
  formData.append('totalPoint', afterTalkForm.totalPoint.toString());
  formData.append('wineName', afterTalkForm.wineName);
  formData.append('wineRegion', afterTalkForm.wineRegion);
  formData.append('wineFactory', afterTalkForm.wineFactory);
  formData.append('wineVintage', afterTalkForm.wineVintage);
  formData.append('wineVariety', afterTalkForm.wineVariety);
  formData.append('inputDate', afterTalkForm.inputDate ? formatDate(afterTalkForm.inputDate) : '');
  formData.append('sweetness', afterTalkForm.sweetness.toString());
  formData.append('acidity', afterTalkForm.acidity.toString());
  formData.append('body', afterTalkForm.body.toString());
  formData.append('tannins', afterTalkForm.tannins.toString());
  formData.append('alcohol', afterTalkForm.alcohol.toString());
  formData.append('totalWinePoint', afterTalkForm.totalWinePoint.toString());
  formData.append('wineNumber', afterTalkForm.wineNumber);
  formData.append('wineColor', afterTalkForm.wineColor);
  formData.append('wineFruitSmell', afterTalkForm.wineFruitSmell);
  formData.append('wineFlowerSmell', afterTalkForm.wineFlowerSmell);
  formData.append('wineSpacy', afterTalkForm.wineSpacy.toString());
  formData.append('wineHerb', afterTalkForm.wineHerb);
  formData.append('wineOak', afterTalkForm.wineOak.toString());
  formData.append('other', afterTalkForm.other);
  formData.append('detailNote', afterTalkForm.detailNote);

  afterTalkForm.meetingPhoto.forEach(file => {
    formData.append('meetingPhoto', file);
  });

  try {
    const response = await apiClient.post('/WineCommunity/wineReview', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });
    console.log('Server response:', response.data);
    ElNotification({
      title: 'Success',
      message: '와인 평가가 등록되었습니다.',
      type: 'success'
    });
  } catch (error) {
    console.error('Error uploading data:', error);
    ElNotification({
      title: 'Error',
      message: '와인 평가 등록에 실패하였습니다.',
      type: 'error'
    });
  }
}


onMounted(async () => {
  afterTalkForm.meeting = await getTheWineAfterMeetingList()
})

watch(afterTalkForm.meeting, (newVal, oldVal) => {

  console.log(newVal, oldVal);
  console.log(newVal, oldVal);
  console.log(newVal, oldVal);
  console.log(newVal, oldVal);
})




</script>


<style scoped>
.post-item {
  margin-bottom: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comments-section {
  margin-top: 20px;
}

.comments-section h4 {
  margin-bottom: 10px;
}


.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
