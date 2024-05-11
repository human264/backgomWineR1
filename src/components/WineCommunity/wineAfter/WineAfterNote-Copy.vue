<template>
  <div>
    <el-dialog
        :visible="dialogFormVisible"
        title="모임 후기 작성"
        width="800"
        @close="handleClose"
        center
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
                  <el-select v-model="joinedWineMeetingListValue" placeholder="참여 모임 선택">
                    <el-option
                        v-for="item in joinedWineMeetingList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
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
                  <el-rate v-model="afterTalkForm.totalPoint" clearable />
                </el-form-item>

                <el-form-item label="사진 업로드" :label-width="formLabelWidth">
                  <el-upload
                      v-model:file-list="fileList"
                      accept="image/*"
                      list-type="picture-card"
                      :auto-upload="false"
                      :disabled="disabledPictureUpload"
                  >
                    <el-icon>
                      <Plus />
                    </el-icon>

                    <template #file="{ file }">
                      <div>
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                        <span class="el-upload-list__item-actions">
                          <span class="el-upload-list__item-preview" @click="handlePreview(file)">
                            <el-icon><ZoomIn /></el-icon>
                          </span>
                          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                            <el-icon><Delete /></el-icon>
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
                  <el-select v-model="joinedWineListValue" placeholder="와인 이름 선택" style="width: 250px">
                    <el-option
                        v-for="item in joinedWineList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
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
                  <el-form-item label="타닌" :label-width="formLabelWidth">
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
                    <el-option label="스파클링 와인" value="스파클링 와인" />
                    <el-option label="화이트 와인" value="화이트 와인" />
                    <el-option label="레드 와인" value="레드 와인" />
                    <el-option label="로제 와인" value="로제 와인" />
                    <el-option label="디저트 와인" value="디저트 와인" />
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
          <el-button type="primary" :icon="Edit" @click="onSubmit">
            작성
          </el-button>
          <el-button @click="$emit('emitCancel')">취소</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Plus, ZoomIn } from "@element-plus/icons-vue";
import { ElNotification, ElUpload, UploadFile, UploadProps, UploadUserFile } from "element-plus";
import { onMounted, reactive, ref, watch } from "vue";
import apiClient from "@/api/login.ts";
import { getTheWineAfterMeetingList, getTheWineAfterTastyNoteWineName } from "@/api/wineMeeting.ts";

const props = defineProps(['dialogFormVisible']);
const emits = defineEmits(['emitCancel', 'update:dialogFormVisible']);
const disabled = ref(false);
const disabledPictureUpload = ref(false);
const fileList = ref<UploadUserFile[]>([]);

const shortcuts = [
  { text: 'Today', value: new Date() },
  { text: 'Yesterday', value: () => new Date(Date.now() - 3600 * 1000 * 24) },
  { text: 'A week ago', value: () => new Date(Date.now() - 3600 * 1000 * 24 * 7) }
];

const handleRemove = (file: UploadFile) => {
  fileList.value = fileList.value.filter(orgfile => orgfile.uid !== file.uid);
};

const disabledDate = (time: Date) => time.getTime() > Date.now();

const afterTalkForm = reactive({
  meeting: [],
  afterTalk: '',
  totalPoint: 0.0,
  meetingPhoto: [],
  wineName: '',
  wineRegion: '',
  wineFactory: '',
  wineVintage: '',
  wineVariety: '',
  inputDate: null as Date | null,
  sweetness: 0.0,
  acidity: 0.0,
  body: 0.0,
  tannins: 0.0,
  alcohol: 0.0,
  totalWinePoint: 0.0,
  wineNumber: '',
  wineColor: '',
  wineFruitSmell: '',
  wineFlowerSmell: '',
  wineSpacy: 0.0,
  wineHerb: '',
  wineOak: 0.0,
  other: '',
  detailNote: ''
});

const handlePreview: UploadProps['onPreview'] = (file) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

watch(
    () => [afterTalkForm.sweetness, afterTalkForm.acidity, afterTalkForm.body, afterTalkForm.alcohol, afterTalkForm.tannins],
    () => {
      const tempTotalWinePoint = afterTalkForm.sweetness + afterTalkForm.acidity + afterTalkForm.body + afterTalkForm.alcohol + afterTalkForm.tannins;
      afterTalkForm.totalWinePoint = tempTotalWinePoint === 0.0 ? 0.0 : parseFloat((tempTotalWinePoint / 5).toFixed(1));
    }
);

interface WineMeeting {
  value: string;
  label: string;
}

const joinedWineMeetingListValue = ref('');
const joinedWineMeetingList = ref<WineMeeting[]>([]);
const joinedWineListValue = ref('');
const joinedWineList = ref<WineMeeting[]>([]);

const size = ref<'default' | 'large' | 'small'>('default');
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const formLabelWidth = '150px';

const formatDate = (date: Date) => date.toISOString().split('T')[0];

const onSubmit = async () => {
  const formData = new FormData();
  formData.append('meeting', joinedWineMeetingListValue.value);
  formData.append('afterTalk', afterTalkForm.afterTalk);
  formData.append('totalPoint', afterTalkForm.totalPoint.toString());
  formData.append('wineName', joinedWineListValue.value);
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

  fileList.value.forEach(file => {
    if (file.raw) {
      formData.append('meetingPhoto', file.raw);
    }
  });

  try {
    const response = await apiClient.post('/WineCommunity/review/wineAfterTalk', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('Server response:', response.data);
    ElNotification({
      title: 'Success',
      message: '와인 평가가 등록되었습니다.',
      type: 'success'
    });
    emits('update:dialogFormVisible', false); // 다이얼로그 닫기
  } catch (error) {
    console.error('Error uploading data:', error);
    ElNotification({
      title: 'Error',
      message: '와인 평가 등록에 실패하였습니다.',
      type: 'error'
    });
  }
};

const handleClose = () => {
  emits('update:dialogFormVisible', false);
};

onMounted(async () => {
  try {
    const result = await getTheWineAfterMeetingList();
    if (result && Array.isArray(result)) {
      joinedWineMeetingList.value = result;
      console.log('Loaded wine meeting list:', joinedWineMeetingList.value); // 데이터 확인을 위한 로그 출력
    }
  } catch (error) {
    console.error('Failed to load wine meeting list:', error);
  }
});

watch(joinedWineMeetingListValue, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    try {
      joinedWineListValue.value = '';
      const result = await getTheWineAfterTastyNoteWineName(newVal);
      if (result && Array.isArray(result)) {
        joinedWineList.value = result;
        console.log('Loaded wine list for selected meeting:', joinedWineList.value); // 데이터 확인을 위한 로그 출력
      }
    } catch (error) {
      console.error('Failed to load wine list:', error);
    }
  }
});
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
