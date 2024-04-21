<template>
  <el-space direction="vertical" alignment="flex-start">
    <el-button @click="setLoading">Click me to reload</el-button>
    <el-skeleton style="width: 100%" :loading="loading" animated>
      <template #template>
        <!-- 스켈레톤 템플릿 -->
      </template>
      <template #default>
        <el-row :gutter="20">
          <el-col :span="4" v-for="item in lists" :key="item.name">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.imgUrl" class="image" style="width: 100%;" />
              <div style="padding: 14px;">
                <span>{{ item.name }}</span>
                <div class="bottom card-header">
                  <div class="time">{{ currentDate }}</div>
                  <el-button text class="button">Operation button</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
  </el-space>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

interface ListItem {
  imgUrl: string
  name: string
}

const loading = ref(true)
const lists = ref<ListItem[]>([])
const currentDate = new Date().toDateString()

const setLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

onMounted(() => {
  loading.value = false
  lists.value = [
    {
      imgUrl:
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      name: 'Deer',
    },
    {
      imgUrl:
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      name: 'Horse',
    },
    {
      imgUrl:
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      name: 'Mountain Lion',
    },
    {
      imgUrl:
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      name: 'Mountain Lion',
    },
    {
      imgUrl:
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      name: 'Mountain Lion',
    },
    {
      imgUrl:
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      name: 'Mountain Lion',
    },
    {
      imgUrl:
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      name: 'Mountain Lion',
    },
  ]
})
</script>

<style scoped>
.image {
  width: 100%; /* 이미지를 컨테이너의 폭에 맞춤 */
  height: auto; /* 이미지의 높이를 자동으로 조정 */
}
</style>