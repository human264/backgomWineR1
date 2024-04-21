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
      <el-button type="primary">WineTastyNote</el-button>

      <div class="comments-section">
        <h4>댓글</h4>
        <ul>
          <li v-for="comment in post.comments" :key="comment.id">
           {{ comment.author }} : {{ comment.content }}
          </li>
        </ul>
      </div>



    </el-card>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useRouter} from 'vue-router';

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
        comments: [
          {id: 1, author: 'User1', content: 'Great post!'},
          {id: 2, author: 'User2', content: 'Thanks for the info.'}
        ]
      },
      {
        id: 2,
        title: 'Post 2',
        content: 'This is the content of post 2.',
        date: new Date(),
        views: 456,
        comments: [
          {id: 1, author: 'User3', content: 'Very interesting.'}
        ]
      },
    ];

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    const goToPost = (postId: number) => {
      router.push({name: 'PostDetail', params: {postId}});
    };

    return {posts, goToPost, formatDate};
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
