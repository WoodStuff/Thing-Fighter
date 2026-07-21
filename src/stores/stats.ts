import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatsStore = defineStore('stats', () => {
	const kills = ref(0);
	const deaths = ref(0);

	return {
		kills,
		deaths,
	};
});