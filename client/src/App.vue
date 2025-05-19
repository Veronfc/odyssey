<template>
	<component :is="currentPage" />
</template>

<script setup lang="ts">
	import { useRouter } from "./composables/useRouter";

	const {currentPage} = useRouter();
</script>

<style scoped></style>
