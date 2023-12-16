<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {useRoute} from "vue-router";

const newsItem = ref({});

const route = useRoute();

const formatDate = (time) => {  time = new Date(time * 1000).toLocaleDateString();
  return time}


onMounted(async () => {
  try {
    const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${route.params.id}.json`
    );
    newsItem.value = response.data;

    await newsComment(response.data.id);
    setInterval(async () => {
      await newsComment(response.data.id);
    }, 60000);

  } catch (error) {
    console.error(error);
  }
});

const NewsID = ref(null);
const comments = ref([]);
const commentCount = ref();

const newsComment = async (storyID) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/v0/item/${route.params.id}.json`);
    const commentPromises = response.data.kids.map(commentID => axios.get(`${import.meta.env.VITE_BASE_URL}/v0/item/${commentID}.json`));
    const commentResponses = await Promise.all(commentPromises);
    comments.value = commentResponses.map(response => response.data);
    NewsID.value = storyID;
    commentCount.value = commentResponses.length;
  }
  catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <div>
    <button @click="$router.push(`/`)">Назад</button>
    <div class="ask">
      <a>{{ newsItem.title }}</a>
      <p> Автор: {{newsItem.by}} | Дата добавления: {{formatDate(newsItem.time)}}</p>
      <a href="{{newsItem.url}}">Ссылка: {{newsItem.url}}</a>
    </div>
    <div>
      Comments:
      <button @click="">Перезагрузить</button>
      <p v-for="comment in comments" :key="comment.id" v-html="comment.text" class="comment"></p>
    </div>
  </div>
</template>

<style scoped>
.comment{
  border: 1px solid #423c63;
  display: flex;
  flex-direction: column;
}
</style>