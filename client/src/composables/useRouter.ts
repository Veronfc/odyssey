import { computed, ref } from "vue";
import Index from "../pages/index.vue";
import NotFound from "../pages/notFound.vue";
import Lobby from "../pages/lobby.vue";
import Match from "../pages/match.vue";

const routes = {
	"/": Index,
	"/lobby": Lobby,
	"/match": Match
};

const currentPath = ref(window.location.pathname);

window.addEventListener("popstate", () => {
	currentPath.value = window.location.pathname;
  console.log(currentPath.value)
});

function navigateTo(path: string) {
	if (path !== currentPath.value) {
		history.pushState({}, "", path);
		currentPath.value = path;
	}
}

const currentPage = computed(() => {
	return routes[currentPath.value as keyof typeof routes] || NotFound;
});

export const useRouter = () => {
	return {
		navigateTo,
		currentPage,
		currentPath
	};
};
