import { defineStore } from "pinia";
import { ref } from "vue";

const gold = ref(0);

const kills = ref(0);
const deaths = ref(0);

export const useStatsStore = defineStore('stats', () => ({
	gold,

	kills,
	deaths,
}));