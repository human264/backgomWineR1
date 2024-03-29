<template>
  <div>
    <el-card>
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <el-button icon="el-icon-thumb" @click="toggleLike">{{ likeCount }}</el-button>
      <!-- 답글 입력 -->
      <el-input v-model="newComment" placeholder="Write a comment..."></el-input>
      <el-button type="primary" @click="addComment">Submit</el-button>
      <!-- 답글 목록 -->
      <div v-for="comment in comments" :key="comment.id">
        <el-card>
          <p>{{ comment.content }}</p>
          <el-button icon="el-icon-thumb" @click="toggleLikeComment(comment)">{{ comment.likes }}</el-button>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const post = ref({
      id: 1,
      title: 'Sample Post',
      content: 'This is a sample post with some details.',
    });
    const comments = ref([
      { id: 1, content: 'This is a comment.', likes: 0 },
      // 추가 답글...
    ]);
    const newComment = ref('');

    const likeCount = ref(0);

    const addComment = () => {
      comments.value.push({
        id: comments.value.length + 1,
        content: newComment.value,
        likes: 0,
      });
      newComment.value = '';
    };

    const toggleLike = () => {
      likeCount.value += 1;
    };

    const toggleLikeComment = (comment: any) => {
      comment.likes += 1;
    };

    return { post, comments, newComment, addComment, likeCount, toggleLike, toggleLikeComment };
  },
});
</script>
