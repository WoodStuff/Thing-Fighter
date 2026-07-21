import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatsStore = defineStore('stats', () => {
	const gold = ref(0);

	const kills = ref(0);
	const deaths = ref(0);

	return {
		gold,

		kills,
		deaths,
	};
});