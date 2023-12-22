<template>
  <button @click="onlyPreview"></button>
  <MdEditor v-model="text" theme="vuepress" />
  <MdPreview :modelValue="text" previewTheme="cyanosis" />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor, MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
// import '@/style/drake-vue.css'
const show = ref(true);
const text = ref('Hello Editor!');
</script>

<style scoped>
  h1 {
    color: red
  }
</style>