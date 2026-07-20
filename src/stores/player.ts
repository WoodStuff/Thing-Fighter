import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayerStore = defineStore('player', () => {
	const hpMax = ref(10);
	const hp = ref(10);
	const attack = ref(10);
	
	return {
		hpMax,
		hp,
		attack,
	};
});