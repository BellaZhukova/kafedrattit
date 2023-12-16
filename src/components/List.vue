<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {router} from "@/router/index.js";

const newsItems = ref([]);

const formatDate = (time) => {  time = new Date(time * 1000).toLocaleDateString();
  return time}

const News = onMounted(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/v0/topstories.json`);
      const newStories = response.data.slice(0, 100);
      const newsPromises = newStories.map(async (storyID) => {
          return await axios.get(`${import.meta.env.VITE_BASE_URL}/v0/item/${storyID}.json`);
          }
      );

      const newsData = await Promise.all(newsPromises);

      newsItems.value = newsData.map(response => response.data);
    } catch (error) {
      console.error(error);
    }
  })
setInterval(async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/v0/topstories.json`);
    const newStories = response.data.slice(0, 100);
    const newsPromises = newStories.map(async (storyID) => {
          return await axios.get(`${import.meta.env.VITE_BASE_URL}/v0/item/${storyID}.json`);
        }
    );

    const newsData = await Promise.all(newsPromises);

    newsItems.value = newsData.map(response => response.data);
  } catch (error) {
    console.error(error);
  }
}, 60000);

const comments = ref([])
const newsComments = async (storyID) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/v0/item/${storyID}.json`)
  const comment = await response.json()
  // Assuming the comments are stored in the "kids" property of the article
  comments.value = comment.kids
}

const showComments = (article) => {
  News.value = article
  newsComments(article.id)
}

</script>

<template>
  <div>
    <h1 class="news_title">News</h1>
    <button @click="News">Перезагрузить страницу новостей</button>
    <div v-for="newsItem in newsItems" :key="newsItem.id" class="news" >
      <p @click="$router.push(`/news/${newsItem.id}`)">{{newsItem.title}}</p>
      <p>{{newsItem.by}} | {{formatDate(newsItem.time)}}</p>
      <p>{{newsItem.score}}</p>
    </div>
  </div>
</template>

<style scoped>
.news{
  border: 1px solid #423c63;
  display: flex;
  flex-direction: column;
}
.news_title{

}
</style>
