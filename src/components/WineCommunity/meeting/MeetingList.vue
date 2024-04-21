<template>
  <div>
    <div style="display: flex; justify-content: flex-end; margin: 10px;">
      <el-button type="primary">Primary</el-button>
    </div>
    <el-card v-for="post in posts" :key="post.id" class="post-item">
      <div class="post-header">
        <h3>{{ post.title }}</h3>
        <span>{{ formatDate(post.date) }}</span>

      </div>
      <p>{{ post.content }}</p>

      <div class="comments-section">
        <h4>Wine 종류 :</h4>
        <ul>
          <li v-for="wine in post.wineLists" :key="wine.id">
            <strong>{{ wine.wineName }} : </strong>
            {{ wine.winePoint }} / {{ wine.wineBody }}  / {{ wine.wineTasty }}
          </li>
        </ul>
      </div>

      <div class="comments-section">
        <h4>모임 시간 : {{ formatDate(post.meetingTime) }} </h4>
      </div>

      <div class="comments-section">
        <h4>모임 장소 : {{ post.meetingLocation }} </h4>
      </div>


      <div class="comments-section">
        <h4>참가 비용 : {{ post.joinCost }} 원 </h4>
      </div>

      <div class="comments-section">
        <h4>참가 인원 : {{ post.joinMember }} / {{ post.maxJoinMember }} <el-button type="primary" style="margin-left: 10px">참석</el-button></h4>
      </div>

      <div>
        <el-button type="text" @click="goToPost(post.id)">Read More</el-button>
      </div>

    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const posts = [
      {
        id: 1,
        title: 'Post 1',
        content: 'This is the content of post 1.',
        date: new Date(),
        views: 123,
        wineLists: [
          { id: 1, wineName: 'Diablo', winePoint: '4.5', wineBody: 'FullBody', wineTasty: 'Sweet' },
          { id: 2, wineName: 'Monte', winePoint: '3.5', wineBody: 'FullBody', wineTasty: 'Sweet' }
        ],
        meetingTime: new Date(),
        meetingLocation: '충장로 일루이',
        joinCost: 3000,
        joinMember : 3,
        maxJoinMember : 5,
      },
      {
        id: 2,
        title: 'Post 2',
        content: 'This is the content of post 2.',
        date: new Date(),
        views: 456,
        wineLists: [
          { id: 1, wineName: 'Diablo', winePoint: '4.5', wineBody: 'FullBody', wineTasty: 'Sweet' },
        ],
        meetingTime: new Date(),
        meetingLocation: '상무지구',
        joinCost: 3000,
        joinMember : 3,
        maxJoinMember : 5,
      },
    ];

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    const goToPost = (postId: number) => {
      router.push({ name: 'PostDetail', params: { postId } });
    };

    return { posts, goToPost, formatDate };
  },
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
</style>
