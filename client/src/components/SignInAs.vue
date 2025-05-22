<template>
	<div class="modal">
		<!--TODO add button component-->
    <span class="title">Welcome!</span>
		<button @click="createGuest">PLAY AS GUEST</button>
		<button>SIGN IN</button>
		<button>SIGN UP</button>
		{{ username }}
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { treaty } from "@elysiajs/eden";
	import type { App } from "../../../server/src";
	import { useRouter } from "../composables/useRouter";

	const app = treaty<App>("localhost:8080", {
		fetch: { credentials: "include" }
	});
	const { navigateTo } = useRouter();

	const username = ref("");

	const createGuest = async () => {
		const { data, error } = await app.player.guest.get();

		//TODO add toast notification for errors
		if (error) {
			return alert(error);
		}

		//TODO store in pinia
		console.log(data);

		navigateTo("/lobby");
	};
</script>

<style scoped>
	@import "../style.css";

  .title {
    @apply font-title text-center text-2xl;
  }

	button {
		@apply bg-primary font-body font-bold tracking-widest cursor-pointer rounded border-2 border-black px-4 py-1 text-white duration-150;

		&:hover {
			@apply -translate-0.5 drop-shadow-[.125rem_.125rem_black];
		}
	}
</style>
