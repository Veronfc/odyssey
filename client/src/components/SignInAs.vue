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
  import { useRouter } from '../composables/useRouter';

  const app = treaty<App>('localhost:8080')
  const {navigateTo} = useRouter()

  const username = ref('')

  const getToken = async () => {
    const {data, error} = await app.player.guest.get()

    //TODO add toast notification for errors
    if (error) {
      alert(error)
      return
    }

    //TODO store in pinia
    username.value = data as string

    navigateTo('/lobby')
  }
</script>

<style scoped>
@import '../style.css';

  button {
    @apply cursor-pointer border-2 border-black rounded bg-primary text-white py-1 px-4 duration-150 font-body;

    &:hover {
      @apply -translate-0.5 drop-shadow-[.125rem_.125rem_black];
    }
  }
</style>