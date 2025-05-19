<template>
  <div class="modal">
    <button @click="getToken">Play as Guest</button>
    {{ username }}
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { treaty } from '@elysiajs/eden';
  import type {App} from '../../../server/src'

  const app = treaty<App>('localhost:8080')

  const username = ref('')

  const getToken = async () => {
    const {data} = await app.player.guest.get()
    username.value = data as string
  }
</script>

<style scoped>
  button {
    @apply cursor-pointer border-2 rounded py-1 px-2;
  }
</style>