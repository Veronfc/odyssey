<template>
	<div class="modal">
		<form @submit="onSubmit">
			<h1>Create a Lobby</h1>
			<fieldset>
				<label>Name</label>
				<input
					name="name"
					v-model="name" />
			</fieldset>
			<fieldset>
				<label>Private</label>
				<input
					name="isPrivate"
					v-model="isPrivate"
					type="checkbox" />
			</fieldset>
			<fieldset v-if="isPrivate">
				<label>Password</label>
				<input
					name="password"
					v-model="password" />
			</fieldset>
			<button>CREATE</button>
		</form>
	</div>
</template>

<script setup lang="ts">
	import { useField, useForm } from "vee-validate";
	import { CreateLobbySchema } from "../validation/lobby.schema";
	import { ref, watch } from "vue";
	import { treaty } from "@elysiajs/eden";
	import type { App } from "../../../server/src";

	const app = treaty<App>("localhost:8080", {
		fetch: { credentials: "include" }
	});

	const isPrivate = ref(false);
	const { handleSubmit } = useForm({
		validationSchema: CreateLobbySchema
	});

	const { value: name } = useField("name");
	const { value: password } = useField("password");

	const onSubmit = handleSubmit(
		async (values) => {
			if (isPrivate.value && !values.password) {
				return alert("Please enter a password for your private lobby");
			}

			const { data, error } = await app.lobby.create.post({
				name: values.name,
				password: values.password,
				isPrivate: isPrivate.value
			});

			if (error) {
				alert(error.value);
			}

			console.log(data);
		},
		(form) => {
			alert(
				`Name error: ${form.errors.name}\nPassword error: ${form.errors.password}`
			); // TODO add toast notification for displaying errors
		}
	);

	watch(isPrivate, () => {
		password.value = "";
	});
</script>

<style scoped>
	@import "../style.css";

	form {
		@apply flex flex-col gap-4;

		h1 {
			@apply font-title text-center text-2xl;
		}

		fieldset {
			@apply flex gap-2;

      label {
        @apply font-body;
      }

			input {
				@apply accent-accent font-body rounded border-2 px-2;
			}

			input[type="checkbox"] {
				@apply cursor-pointer;
			}
		}

		button {
			@apply bg-primary font-body tracking-widest font-bold cursor-pointer rounded border-2 border-black px-4 py-1 text-white duration-150;

			&:hover {
				@apply -translate-0.5 drop-shadow-[.125rem_.125rem_black];
			}
		}
	}
</style>
