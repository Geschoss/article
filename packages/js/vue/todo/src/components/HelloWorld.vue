<template>
  <div class="hello">
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <h1>{{ likes }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      likes: 0,
    };
  },
  methods: {
    increment() {
      this.likes++;
    },
    decrement() {
      this.likes--;
    },
  },
});
</script>

<style scoped></style>
