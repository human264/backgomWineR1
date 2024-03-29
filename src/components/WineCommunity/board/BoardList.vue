<template>
  <div>
    <el-card v-for="post in posts" :key="post.id" class="post-item">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      <el-button type="text" @click="goToPost(post.id)">Read More</el-button>
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
      { id: 1, title: 'Post 1', content: 'This is the content of post 1.' },
      { id: 2, title: 'Post 2', content: 'This is the content of post 2.' },
    ];

    const goToPost = (postId: number) => {
      router.push({ name: 'PostDetail', params: { postId } });
    };

    return { posts, goToPost };
  },
});
</script>

<style scoped>
.post-item {
  margin-bottom: 20px;
}
</style>
